# frozen_string_literal: true

require 'signet/oauth_2/client'

module Google
  module Auth
    class << self

      def auth_url
        client.authorization_uri
      end

      def verify_auth_code(code)
        client.code = code
        client.fetch_access_token!
      end

      private

      def client
        @client ||= Signet::OAuth2::Client.new(
          :authorization_uri => 'https://accounts.google.com/o/oauth2/auth',
          :token_credential_uri => 'https://oauth2.googleapis.com/token',
          :client_id => ENV['GOOGLE_CLIENT_ID'],
          :client_secret => ENV['GOOGLE_CLIENT_SECRET'],
          :scope => 'email profile',
          :redirect_uri => ENV['APP_AUTH_REDIRECT_URI'],
        )
      end
    end
  end
end
