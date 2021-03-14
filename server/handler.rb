# frozen_string_literal: true

# setup bundle loader
load "vendor/bundle/bundler/setup.rb"
$LOAD_PATH.unshift(File.expand_path("lib", __dir__))
$LOAD_PATH.unshift(File.expand_path("app", __dir__))

require "lib"
require "app"

# route the requests
def auth_auth(event:, _context:)
  return "authorised" if Services::Auth.validate_JWT(token: event["authorizationToken"])

  unauthorized
end

def auth_token(event:, context:)
  Controllers::Auth::Token.new.get(event: event, context: context)
end

def auth_urls(event:, context:)
  Controllers::Auth::Urls.new.get(event: event, context: context)
end

def tweet_get(*)
  default_response
end

def tweet_post(*)
  default_response
end

def tweet_pool_refresh(*)
  default_response
end

def debug(*)
  client = Twitter::API::Client.new
  {
    statusCode: 200,
    body: {message: client.test.to_json}.to_json
  }
end

def default_response
  {
    statusCode: 200,
    body: {message: "lorem ipsum"}.to_json
  }
end
