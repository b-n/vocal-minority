# frozen_string_literal: true

# setup bundle loader
load "vendor/bundle/bundler/setup.rb"
$LOAD_PATH.unshift(File.expand_path("lib", __dir__))
$LOAD_PATH.unshift(File.expand_path("app", __dir__))

require 'lib'
require 'app'

# route the requests
def auth_auth(event:, context:)
  if Services::Auth.validate_JWT(token: event['authorizationToken'])
    p 'authorised' 
  end
  unauthorized
end

def auth_token(event:, context:)
  Controllers::Auth::Token.new.get(event: event, context: context)
end

def auth_urls(event:, context:)
  Controllers::Auth::Urls.new.get(event: event, context: context)
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
