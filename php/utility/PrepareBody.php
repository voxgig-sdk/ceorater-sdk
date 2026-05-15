<?php
declare(strict_types=1);

// Ceorater SDK utility: prepare_body

class CeoraterPrepareBody
{
    public static function call(CeoraterContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
