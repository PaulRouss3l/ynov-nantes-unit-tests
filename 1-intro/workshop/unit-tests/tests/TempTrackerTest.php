<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_something() {
        $this->assertEquals(42, 42);
    }

    public function test_array_is_empty() {
        $tempTracker = new TempTracker();
        $this->assertEmpty($tempTracker->get_temps());
    }
    
    public function test_array_matches_value_inserted() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45);
        $this->assertContains(45, $tempTracker->get_temps());
    }
    
    public function test_limit_temps() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45,23,9,18,102);
        $this->assertEquals(-10, $tempTracker->get_min());
        $this->assertEquals(210, $tempTracker->get_max());
    }
}