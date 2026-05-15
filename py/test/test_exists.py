# ProjectName SDK exists test

import pytest
from ceorater_sdk import CeoraterSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CeoraterSDK.test(None, None)
        assert testsdk is not None
