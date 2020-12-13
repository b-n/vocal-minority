# frozen_string_literal: true

require 'jwt'

module Auth
  module JWT
    JWT_ALGORITHM = 'HS256'
    JWT_ISS = 'vocal-minority-server'

    class << self
      def validate(token)
        payload, header = ::JWT.decode token, ENV['JWT_SECRET'], true, {
          iss: JWT_ISS,
          verify_iss: true,
          algorithm: JWT_ALGORITHM
        }
        payload
      end

      def generate(payload, options = {})
        exp = options.fetch(:exp, Time.now.to_i + 3600)
        jwt_payload = {
          exp: exp,
          iss: JWT_ISS,
        }.merge(payload)
        ::JWT.encode jwt_payload, ENV['JWT_SECRET'], JWT_ALGORITHM
      end
    end
  end
end
