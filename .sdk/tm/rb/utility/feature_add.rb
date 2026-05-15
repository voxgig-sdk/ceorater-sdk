# Ceorater SDK utility: feature_add
module CeoraterUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
