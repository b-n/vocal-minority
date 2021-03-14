# frozen_string_literal: true

require "logger"

class Log
  class << self
    def info(*args)
      logger.info(args)
    end

    private

    def logger
      @logger ||= Logger.new("log/#{ENV["STAGE"]}.log")
    end
  end
end
