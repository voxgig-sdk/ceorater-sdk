# Ceorater SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CeoraterFeatures
  def self.make_feature(name)
    case name
    when "base"
      CeoraterBaseFeature.new
    when "ratelimit"
      CeoraterRatelimitFeature.new
    when "retry"
      CeoraterRetryFeature.new
    when "test"
      CeoraterTestFeature.new
    when "timeout"
      CeoraterTimeoutFeature.new
    else
      CeoraterBaseFeature.new
    end
  end
end
