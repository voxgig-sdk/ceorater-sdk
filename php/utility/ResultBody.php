<?php
declare(strict_types=1);

// Ceorater SDK utility: result_body

class CeoraterResultBody
{
    public static function call(CeoraterContext $ctx): ?CeoraterResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
