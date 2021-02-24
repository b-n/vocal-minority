# frozen_string_literal: true

def success(payload: nil)
  {
    statusCode: 200,
    body: payload,
    headers: {
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Allow-Credentials'=> true,
    }
  }
end

def unauthorized
  {
    statusCode: 403
  }
end

def bad_input(error)
  {
    statusCode: 400,
    body: { error: error }.to_json
  }
end
