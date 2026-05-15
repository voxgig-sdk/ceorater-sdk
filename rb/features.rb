# Ceorater SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CeoraterFeatures
  def self.make_feature(name)
    case name
    when "base"
      CeoraterBaseFeature.new
    when "test"
      CeoraterTestFeature.new
    else
      CeoraterBaseFeature.new
    end
  end
end
