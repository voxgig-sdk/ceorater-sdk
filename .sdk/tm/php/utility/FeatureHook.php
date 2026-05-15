<?php
declare(strict_types=1);

// Ceorater SDK utility: feature_hook

class CeoraterFeatureHook
{
    public static function call(CeoraterContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
