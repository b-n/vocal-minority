# frozen_string_literal: true

require 'signet/oauth_2/client'

module Google
  class Auth
    TOKENINFO_URI = 'https://oauth2.googleapis.com/tokeninfo'

    def auth_url
      client.authorization_uri
    end

    def valid_auth_code?(code)
      client.code = code
      response = client.fetch_access_token!
      !client.access_token.nil?
    rescue Signet::AuthorizationError => e
      false
    end

    def user_id
      client.decoded_id_token[:sub]
    end

    private

    def client
      @client ||= Signet::OAuth2::Client.new(
        :authorization_uri => 'https://accounts.google.com/o/oauth2/auth',
        :token_credential_uri => 'https://oauth2.googleapis.com/token',
        :client_id => ENV['GOOGLE_CLIENT_ID'],
        :client_secret => ENV['GOOGLE_CLIENT_SECRET'],
        :scope => 'email profile',
        :state => 'google',
        :redirect_uri => ENV['AUTH_REDIRECT_URI'],
      )
    end
  end
end
