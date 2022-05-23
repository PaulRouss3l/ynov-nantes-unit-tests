<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    // flatten function test
    // Give int : expected Type Error return
    public function test_flatten_wrong_input()
    {
        $this->expectException(TypeError::class);
        flatten(1);
    }

    // check if function is alright
    public function test_flatten()
    {
        $this->assertSame(flatten([[1,2,3], [4], [5]]), [1,2,3,4,5]);
        $this->assertSame(flatten([
            [0 => 'coucou', 1 => 'oui'], [3 => 'non']]),
            ['coucou', 'oui', 'non']);
        $this->assertCount(5, flatten([[1,2,3], [4], [5]]));
    }

    public function test_flatten_return() {
        $this->assertIsArray(flatten([[1,2], [4]]));
    }
}