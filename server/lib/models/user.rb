# frozen_string_literal: true

require 'securerandom'

class User
  include ::Jaysun

  attr_accessor :id, :authorizer_id
  json_fields :id, :authorizer_id

  def save
    @id = SecureRandom.uuid if @id.nil?
    true
  end

  class << self 
    def find(id)
      result = Dynamo.query({
        table_name: ENV['DB_TABLE_USERS'],
        key_condition_expression: 'id = :v1',
        expression_attribute_values: {
          ':v1' => id
        }
      })

      create_user_from_item result.items[0]
    end

    def find_by_authorizer(authorizer:, id:)
      result = Dynamo.query({
        table_name: ENV['DB_TABLE_USERS'],
        index_name: 'authorizerId',
        key_condition_expression: 'authorizerId = :v1',
        expression_attribute_values: {
          ':v1' => "#{authorizer}-#{id}"
        }
      })

      create_user_from_item result.items[0]
    end

    private

    def create_user_from_item(payload)
      return nil unless payload

      User.new.tap do |u|
        u.id = payload['id']
        u.authorizer_id = payload['authorizer_id']
      end
    end
  end
end
