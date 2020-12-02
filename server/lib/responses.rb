# frozen_string_literal: true

def success(payload: nil)
  {
    statusCode: 200,
    body: payload
  }
end

def unauthorized
  {
    statusCode: 403
  }
end
