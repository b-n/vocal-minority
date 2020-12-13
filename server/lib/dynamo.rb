# frozen_string_literal: true

require 'aws-sdk-dynamodb'

class Dynamo
  class << self
    DEBUG = false

    def query(params)
      Log.info(params) if DEBUG
      client.query params
    end

    def put_item(params)
      Log.info(params) if DEBUG
      client.put_item params
    end

    private

    def client
      @client ||= ::Aws::DynamoDB::Client.new(default_options)
    end

    def default_options
      return offline_options if ENV['IS_OFFLINE']
      {}
    end

    def offline_options
      {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        access_key_id: 'DEFAULT_ACCESS_KEY',
        secret_access_key: 'DEFAULT_SECRET'
      }
    end
  end
end
