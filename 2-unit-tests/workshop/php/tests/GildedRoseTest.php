<?php

declare(strict_types=1);

namespace Tests;

use GildedRose\GildedRose;
use GildedRose\Item;
use PHPUnit\Framework\TestCase;

class GildedRoseTest extends TestCase
{
    private $items; 

    protected function setUp(): void
    {
        $this->items = [
            new Item('sword', 10, 0), 
            new Item('knife', 5, 3), 
            new Item('Aged Brie', 100, 48),
            new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20),
            new Item('Sulfuras, Hand of Ragnaros', 100, 80),
            new Item('bow', 1, 21),
            new Item('Conjured', 1, 21)
        ];
    }    

    public function testNameInsertItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();

        $this->assertSame('sword', $this->items[0]->name);
        $this->assertSame('knife', $this->items[1]->name);
        $this->assertSame('Aged Brie', $this->items[2]->name);
        $this->assertSame('Backstage passes to a TAFKAL80ETC concert', $this->items[3]->name);
        $this->assertSame('Sulfuras, Hand of Ragnaros', $this->items[4]->name);
        $this->assertSame('bow', $this->items[5]->name);
        $this->assertSame('Conjured', $this->items[6]->name);
    }

    public function testUncrementPropertiesItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(1, $this->items[1]->quality);
        $this->assertEquals(3, $this->items[1]->sell_in);
    }

    public function testFastUncrementQualityItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(18, $this->items[5]->quality);
    }

    public function testQualityNegative(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(0, $this->items[0]->quality);
    }

    public function testAgedBrieItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(50, $this->items[2]->quality);
    }

    public function testSulfurasItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(80, $this->items[4]->quality);
        $this->assertEquals(100, $this->items[4]->sell_in);
    }

    public function testBackstagePassesItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(34, $this->items[3]->quality);
        $this->assertEquals(4, $this->items[3]->sell_in);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(0, $this->items[3]->quality);
    }

    public function testConjuredItem(): void
    {
        $gildedRose = new GildedRose($this->items);

        $gildedRose->updateQuality();
        $gildedRose->updateQuality();
        $gildedRose->updateQuality();

        $this->assertEquals(16, $this->items[5]->quality);
        $this->assertEquals(11, $this->items[6]->quality);
    }

    protected function tearDown(): void
    {
        unset($this->items);
    }
}