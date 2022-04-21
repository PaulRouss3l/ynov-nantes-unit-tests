<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_something()
    {
        $this->assertEquals(1337, 1337);
    }
    
    public function test_if_return_type_is_array()
    {
        $testData = flatten([1, 2, [5,4,7], 4] );
        $this->assertIsArray(
            $testData,
            "assert variable is array or not"
        );
    }

    public function test_if_array_is_only_composed_of_int()
    {
        $testData = flatten([1, 2]);
        $found = true;
        foreach( $testData as $obj ) {
            if( !is_int($obj)) {
                $found = false;
            }
        }

        $this->assertTrue( $found, "assert contains only int or not" );
    }

    public function test_if_array_is_not_only_composed_of_int()
    {
        $testData = flatten([1, 2, 'Bonjour', 3]);
        $this->AssertNotContainsOnly('integer', $testData);
    }
}