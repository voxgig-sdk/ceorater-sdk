<?php
declare(strict_types=1);

// Ceorater SDK utility: feature_add

class CeoraterFeatureAdd
{
    public static function call(CeoraterContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
