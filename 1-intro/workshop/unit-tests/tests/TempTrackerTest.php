<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    // insert function test
    // insert string : expected TypeError
    public function test_insert_string() {
        $tempTracker = new TempTracker();

        $this->expectException(TypeError::class);
        $tempTracker->insert('string data');
    }

    // insert lower value : expected ValueError
    public function test_insert_lower_value() {
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);
        $tempTracker->insert(-1);
    }

    // insert max value : expected ValueError
    public function test_insert_highter_value() {
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);
        $tempTracker->insert(200);
    }

    // insert function test
    public function test_insert() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(20);
        $tempTracker->insert(15);
        $tempTracker->insert(15);

        $this->assertCount(3, $tempTracker->get_temps());
    }

    // get_min function test
    public function test_get_min() {
        $tempTracker = new TempTracker();
        // Check for init value
        $this->assertEquals($tempTracker->get_min(), -1);

        // Insert to set new lower value
        $tempTracker->insert(2);
        $tempTracker->insert(6);
        $tempTracker->insert(1);

        // Check new lower value
        $this->assertEquals($tempTracker->get_min(), 1);
    }

    // get_max function test
    public function test_get_max() {
        $tempTracker = new TempTracker();
        // Check for init value
        $this->assertEquals($tempTracker->get_max(), -1);

        //Insert to set new max value
        $tempTracker->insert(2);
        $tempTracker->insert(6);
        $tempTracker->insert(1);

        // Check new max value
        $this->assertEquals($tempTracker->get_max(), 6);
    }
}