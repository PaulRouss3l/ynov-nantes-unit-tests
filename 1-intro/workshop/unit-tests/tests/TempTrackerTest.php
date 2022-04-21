<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_something() {
        $this->assertEquals(42, 42);
    }

    public function test_is_value_added() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45);
        $temps = (array)$tempTracker->get_temps();
        $this->assertTrue(count($temps) > 0, "Tester que l'ajout a fonctionné");
    }

    public function test_max_and_lower_value() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45);
        $tempTracker->insert(4);
        $tempTracker->insert(0);
        $tempTracker->insert(70);

        $this->assertTrue($tempTracker->get_max() === 70 && $tempTracker->get_min() === 0);
    }
    
    public function test_mean() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45);
        $tempTracker->insert(4);
        $tempTracker->insert(0);
        $tempTracker->insert(70);
        $mean = (45 + 0 + 4 + 70) / 4;

        $this->assertTrue($tempTracker->get_mean() === $mean);
    }

}