<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test__null()
    {
        $this->assertEquals(1337, 1337);
    }
}