<?php
declare(strict_types=1);

// Ceorater SDK utility: result_headers

class CeoraterResultHeaders
{
    public static function call(CeoraterContext $ctx): ?CeoraterResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
