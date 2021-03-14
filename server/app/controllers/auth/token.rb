module Controllers
  module Auth
    class Token < ApplicationController
      def get(event:, context:)
        parameters = event["queryStringParameters"]
        code = parameters.fetch("code", nil)
        state = parameters.fetch("state", nil)
        token = parameters.fetch("token", nil)
        grant_type = parameters.fetch("grant_type", nil)

        return bad_input "invalid grant_type" if grant_type.nil?

        case grant_type.to_sym
        when :authorization_code
          authorization_code(code, state)
        when :refresh_token
          refresh_token(token)
        else
          bad_input "invalid grant_type `#{grant_type}`"
        end
      end

      private

      def authorization_code(code, state)
        return bad_input "requires code and state, received #{code} #{state}" if code.nil? || state.nil?

        authorizer = Factories::Auth.generate(state)
        return bad_input "invalid code #{code}" unless authorizer.valid_auth_code? code

        user = User.find_or_create_by_authorizer_id(authorizer.user_id, state)

        success payload: generate_tokens(user).to_json
      end

      def refresh_token(token)
        return bad_input "requires `token`" if token.nil?

        details = verify_token(token)
        user = User.find(details["user_id"])

        return bad_input "invalid refresh_token" if user.nil?
        return bad_input "invalid refresh_token" unless user.valid_refresh_token?(token)

        success payload: generate_tokens(user).to_json
      end

      def verify_token(token)
        Services::Auth.validate_jwt(token)
      end

      def generate_tokens(user)
        expires_in = 45
        exp = Time.now.utc.to_i + expires_in
        access_token = Services::Auth.generate_jwt({user_id: user.id}, {exp: exp})
        refresh_token = Services::Auth.generate_jwt({user_id: user.id}, {exp: Time.now.utc.to_i + 86400 * 365})
        user.refresh_token = refresh_token
        user.save

        {
          access_token: access_token,
          token_type: "Bearer",
          expires_in: expires_in,
          refresh_token: refresh_token
        }
      end
    end
  end
end
