# Ceorater SDK exists test

require "minitest/autorun"
require_relative "../Ceorater_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CeoraterSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
