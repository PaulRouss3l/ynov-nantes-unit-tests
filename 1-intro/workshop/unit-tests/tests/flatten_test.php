<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_basic_array()
    {
        $this->assertEquals([1,2,3], flatten([1,2,3]));
    }

    public function test_two_array()
    {
        $this->assertEquals([1,2,3,4], flatten([[1,2,[3]],4]));
    }

    public function test_empty_array()
    {
        $this->assertEquals([], flatten([]));
    }
}