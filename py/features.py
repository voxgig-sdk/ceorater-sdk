# Ceorater SDK feature factory

from feature.base_feature import CeoraterBaseFeature
from feature.test_feature import CeoraterTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CeoraterBaseFeature(),
        "test": lambda: CeoraterTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
