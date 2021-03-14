module AWS
  autoload(:Dynamo, "aws/dynamo")
  autoload(:IAMPolicyGenerator, " aws/iam_policy_generator")
  module Lambda
    autoload(:Responses, "aws/lambda/responses")
  end
end
