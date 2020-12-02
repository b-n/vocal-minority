# frozen_string_literal: true

require 'jwt'

module Auth
  class JWT
    class << self
      def validate(token:)
        true
      end
    end
  end
end
