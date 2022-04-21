<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function testInsertNotInt()
    {
        $tempTracker = new TempTracker();

        $this->expectException(TypeError::class);

        $tempTracker->insert("some string");
    }

    public function testTemperatureHasInvalidValue()
    {
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);

        $tempTracker->insert(-20);
        $tempTracker->insert(500);
    }

    public function testTrackerContainsNoTemperature()
    {
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);

        $tempTracker->get_mean();
    }

    public function testMeanTemperature()
    {
        $tempTracker = new TempTracker();

        $tempTracker->insert(25);
        $tempTracker->insert(75);
        $this->assertTrue($tempTracker->get_mean() === 50, 'Mean temperature is 50 fahreinheit');
    }
}