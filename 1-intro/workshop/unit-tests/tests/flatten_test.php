<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test__null()
    {
        $this->assertEquals(flatten([]), []);
        $this->assertEquals(flatten([[[]]]), []);
    }

    public function test__value()
    {
        $this->assertEquals(flatten([-3]), [-3]);
    }

    public function test__nested()
    {
        $this->assertEquals(flatten([1, [2], [3, [4]], 5]), [1, 2, 3, 4, 5]);
    }
}