# frozen_string_literal: true

module Requests
  module Auth
    class Token
      def self.process(event:, context:)
        parameters = event['queryStringParameters']
        code = parameters.fetch('code', nil)
        state = parameters.fetch('state', nil)

        authorizer = Factory::Auth.generate(state)

        Log.info(authorizer.verify_auth_code(code))

        success payload: User.find('123').to_json
      end
    end
  end
end
