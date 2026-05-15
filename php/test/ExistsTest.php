<?php
declare(strict_types=1);

// Ceorater SDK exists test

require_once __DIR__ . '/../ceorater_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CeoraterSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
