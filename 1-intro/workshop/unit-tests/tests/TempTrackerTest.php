<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {

    /*
     * Test cases for the insert function
     */
    public function test_insert() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(12);
        $this->assertEquals([12], $tempTracker->get_temps());
    }

    public function test_not_int_insert() {
        $tempTracker = new TempTracker();

        $this->expectException(TypeError::class);
        $tempTracker->insert([15]);
    }

    public function test_over_100_insert() {
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);
        $tempTracker->insert(115);
    }

    public function test_under_0_insert() {
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);
        $tempTracker->insert(-5);
    }

    /*
     * Test case for the minimum value
     */
    public function test_get_min() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(12);
        $tempTracker->insert(10);
        $tempTracker->insert(15);
        $tempTracker->insert(6);

        $this->assertEquals(6, $tempTracker->get_min());
    }

    /*
     * Test case for the maximum value
     */
    public function test_get_max() {
        $tempTracker = new TempTracker();

        $tempTracker->insert(12);
        $tempTracker->insert(10);
        $tempTracker->insert(15);
        $tempTracker->insert(6);

        $this->assertEquals(15, $tempTracker->get_max());
    }

}