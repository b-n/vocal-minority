# frozen_string_literal: true

require 'digest/sha1'

class User
  include ::Jaysun

  attr_accessor :id, :created_at, :refresh_token
  json_fields :id, :created_at

  def initialize(options = {})
    @id = options.fetch('id', nil)
    @created_at = options.fetch('created_at', Time.now.to_i)
    @refresh_token = options.fetch('refresh_token', '')
  end

  def save
    result = Dynamo.put_item({
      item: dynamo_item,
      table_name: ENV['DB_TABLE_USERS']
    })
    self
  end

  def valid_refresh_token?(token)
    token == @refresh_token
  end

  private

  def dynamo_item
    {
      id: @id,
      created_at: @created_at,
      refresh_token: @refresh_token
    }
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
      return nil if result.count == 0
      ::User.new(result.items[0])
    end

    def find_or_create_by_authorizer_id(authorizer, id)
      user = find_by_authorizer_id(authorizer, id) 
      return user unless user.nil?

      id = authorizer_hash(authorizer, id)
      User.new(id: id).save
    end

    def find_by_authorizer_id(authorizer, id)
      find(authorizer_hash(authorizer, id))
    end

    private

    def authorizer_hash(authorizer, id)
      Digest::SHA1.hexdigest("#{authorizer}-#{id}")
    end
  end
end
