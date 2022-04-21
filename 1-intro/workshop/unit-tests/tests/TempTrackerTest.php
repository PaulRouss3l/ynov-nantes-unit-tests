<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_something() {
        $this->assertEquals(42, 42);
    }

    public function test_get_min() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(105);
        $tempTracker->insert(8);
        $tempTracker->insert(76);
        $tempTracker->insert(32);
        $tempTracker->insert(3);
        $tempTracker->insert(98);

        $this->assertEquals(3, $tempTracker->get_min());
    }

    public function test_get_ax() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(105);
        $tempTracker->insert(8);
        $tempTracker->insert(76);
        $tempTracker->insert(32);
        $tempTracker->insert(3);
        $tempTracker->insert(98);

        $this->assertEquals(105, $tempTracker->get_max());
    }

    public function test_get_mean() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(0);
        $tempTracker->insert(100);
        $tempTracker->insert(50);

        $expectedMean = 50;

        $this->assertEquals($expectedMean, $tempTracker->get_mean());
    }
}
