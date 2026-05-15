# Ceorater SDK utility: make_context

from core.context import CeoraterContext


def make_context_util(ctxmap, basectx):
    return CeoraterContext(ctxmap, basectx)
