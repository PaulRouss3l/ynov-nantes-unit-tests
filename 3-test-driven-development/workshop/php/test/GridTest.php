<?php

declare(strict_types=1);

namespace GridTests;

use MineSweeper\MineSweeper;
use MineSweeper\Grid;
use PHPUnit\Framework\TestCase;

class GridTest extends TestCase
{
    private $grids; 

    protected function setUp(): void
    {
        $this->grids = [
            new Grid(4,4,3)
        ];
    } 
    
    public function testCreationGrid(): void
    {
        /** @var Grid */
        $grid = $this->grids[0];

        $this->assertEquals($grid->getNbLine(), 4);
        $this->assertEquals($grid->getNbCase(), 4);
        $this->assertEquals($grid->getNbBomb(), 3);
    }

    public function testModificationGrid(): void
    {
        /** @var Grid */
        $grid = $this->grids[0];

        $grid->setNbLine(5);
        $grid->setNbCase(5);
        $grid->setNbBomb(5);

        $this->assertEquals($grid->getNbLine(), 5);
        $this->assertEquals($grid->getNbCase(), 5);
        $this->assertEquals($grid->getNbBomb(), 5);
    }

    protected function tearDown(): void
    {
        unset($this->grids);
    }
}