module Controllers
  autoload(:ApplicationController, "controllers/application_controller")
  autoload(:Auth, "controllers/auth")
  autoload(:Tweet, "controllers/tweet")
end

module Services
  autoload(:Auth, "services/auth")
end

module Factories
  autoload(:Auth, "factories/auth")
end

# load each model directly
require "models/tweet"
require "models/user"
