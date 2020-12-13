# frozen_string_literal: true

# setup bundle loader
load "vendor/bundle/bundler/setup.rb"
$LOAD_PATH.unshift(File.expand_path("lib", __dir__))

require 'vocal_minority'
require './lib/responses'

# route the requests
def auth_auth(event:, context:)
  if Auth::JWT.validate(token: event['authorizationToken'])

  end
  unauthorized
end

def auth_token(event:, context:)
  Requests::Auth::Token.new.process(event: event, context: context)
end

def auth_urls(event:, context:)
  success payload: { google: Google::Auth.new.auth_url }.to_json
end

def tweet_get(event:, context:)
  default_response
end

def tweet_post(event:, context:)
  default_response
end

def tweet_pool_refresh(event:, context:)
  default_response
end

def default_response
  {
    statusCode: 200,
    body: { message: 'lorem ipsum' }.to_json
  }
end
