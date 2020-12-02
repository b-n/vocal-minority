module Auth
  autoload(:JWT, 'auth/jwt')
  autoload(:IAMPolicy, 'auth/iam_policy.rb')
end

# models
autoload(:Tweet, 'models/tweet')
autoload(:User, 'models/user')

# other libs
autoload(:Google, 'google/google')

# helpers
autoload(:Dynamo, 'dynamo')
autoload(:Log, 'log')
autoload(:Jaysun, 'jaysun')

# requests
autoload(:Requests, 'requests/requests')

#factories
module Factory
  autoload(:Auth, 'factories/auth')
end
