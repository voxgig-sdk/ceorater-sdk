# Ceorater SDK feature factory

from ceorater_sdk.feature.base_feature import CeoraterBaseFeature
from ceorater_sdk.feature.ratelimit_feature import CeoraterRatelimitFeature
from ceorater_sdk.feature.retry_feature import CeoraterRetryFeature
from ceorater_sdk.feature.test_feature import CeoraterTestFeature
from ceorater_sdk.feature.timeout_feature import CeoraterTimeoutFeature


_FEATURES = {
    "base": lambda: CeoraterBaseFeature(),
    "ratelimit": lambda: CeoraterRatelimitFeature(),
    "retry": lambda: CeoraterRetryFeature(),
    "test": lambda: CeoraterTestFeature(),
    "timeout": lambda: CeoraterTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
