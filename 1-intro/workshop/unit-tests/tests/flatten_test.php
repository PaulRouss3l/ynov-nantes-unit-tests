<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_empty_array()
    {
        $this->assertEmpty(flatten([]));
    }

    public function test_arg_type_variable()
    {
        $this->assertContainsOnly('integer', flatten([56,23, [26]]));
        $this->assertContainsOnly('integer', flatten([56,-23, [26]]));
    }
    
    public function test_type_entry()
    {
        $this->assertIsArray(flatten([5]));
        $this->assertIsArray(flatten([5, 56, [3]]));
    }

    public function test_single_value()
    {
        $this->assertEquals(flatten([[5]]), [5], "Should be [5]");
        $this->assertEquals(flatten([10]), [10], "Should be [10]");
        $this->assertEquals(flatten([[-15]]), [-15], "Should be [-15]");
    }

    public function test_multiples_values()
    {
        $this->assertEquals(flatten([45, 56, [5]]), [45,56,5], "Should be [45,56,5]");
        $this->assertEquals(flatten([[5,-8,6]]), [5,-8,6], "Should be [5,-8,6]");
    }

    public function test_multiples_array()
    {
        $this->assertEquals(flatten([45, 56, [5], [1,[3]]]), [45,56,5,1,3], "Should be [45,56,5,1,3]");
        $this->assertEquals(flatten([[5,6,8],[9,3]]), [5,6,8,9,3], "Should be [5,6,8,9,3]");
    }
}