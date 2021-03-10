# frozen_string_literal: true

module Factories
  module Auth
    def self.generate(authorizer)
      Object.const_get("::#{authorizer.capitalize}::Auth").new
    end
  end
end
