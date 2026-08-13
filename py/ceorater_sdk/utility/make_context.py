# Ceorater SDK utility: make_context

from ceorater_sdk.core.context import CeoraterContext


def make_context_util(ctxmap, basectx):
    return CeoraterContext(ctxmap, basectx)
