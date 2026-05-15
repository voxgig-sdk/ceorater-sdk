<?php
declare(strict_types=1);

// Ceorater SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CeoraterFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CeoraterBaseFeature();
            case "test":
                return new CeoraterTestFeature();
            default:
                return new CeoraterBaseFeature();
        }
    }
}
