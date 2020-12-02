# frozen_string_literal: true

module Factory
  module Auth
    def self.generate(authorizer)
      Object.const_get("::#{authorizer.capitalize}::Auth")
    end
  end
end
