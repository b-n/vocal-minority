module Controllers
  module Auth
    class Urls < LambdaHandler
      def get(event:, context:) 
        success payload: { google: Google::Auth.new.auth_url }.to_json
      end
    end
  end
end
