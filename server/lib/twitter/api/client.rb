require "twitter"

module Twitter
  module API
    class Client
      def initialize
        @client = Twitter::REST::Client.new
        @client.bearer_token = ENV["TWITTER_BEARER_TOKEN"]
      end

      def test
        @client.configuration
      end
    end
  end
end
