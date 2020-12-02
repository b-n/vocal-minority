# frozen_string_literal: true

module Jaysun
  def self.included(klass)
    klass.define_singleton_method 'json_fields' do |*args|
      klass.define_method 'to_json' do
        Hash[args.collect { |field| [
          field.to_s,
          self.instance_variable_get("@#{field}")
        ] } ].to_json
      end
    end
  end
end
