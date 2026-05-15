<?php
declare(strict_types=1);

// Ceorater SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CeoraterMakeContext
{
    public static function call(array $ctxmap, ?CeoraterContext $basectx): CeoraterContext
    {
        return new CeoraterContext($ctxmap, $basectx);
    }
}
