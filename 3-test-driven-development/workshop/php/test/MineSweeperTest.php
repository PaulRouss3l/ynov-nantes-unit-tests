<?php

declare(strict_types=1);

namespace MineSweeperTest;

use MineSweeper\MineSweeper;
use MineSweeper\Grid;
use PHPUnit\Framework\TestCase;

class MineSweeperTest extends TestCase
{
    private $grids; 

    protected function setUp(): void
    {
        $this->grids = [
            new Grid(4,4,3),
            new Grid(100, 100, 10),
            new Grid(4, 4, 4),
        ];
    } 
    
    public function testCreationGrid(): void
    {
        /** @var Grid */
        $grid = $this->grids[0];
        $mineSweeper = new MineSweeper($grid);

        $gridCreated = [
            '0' => ['.', '.', '.', '.'],
            '1' => ['.', '.', '.', '.'],
            '2' => ['.', '.', '.', '.'],
            '3' => ['.', '.', '.', '.']
        ];
        
        $this->assertEquals($mineSweeper->createGrid(), $gridCreated);
    }

    public function testCreationGridException(): void
    {
        /** @var Grid */
        $grid = $this->grids[1];
        $mineSweeper = new MineSweeper($grid);
        
        $this->expectException(\InvalidArgumentException::class);
        $mineSweeper->createGrid();
    }

    public function testPutBomb(): void
    {
        /** @var Grid */
        $grid = $this->grids[0];
        $mineSweeper = new MineSweeper($grid);
        $countBomb = 0;

        $gridCreated = $mineSweeper->createGrid(); 
        $gridWithBomb = $mineSweeper->putBomb($gridCreated);

        foreach($gridWithBomb as $line) {
            foreach($line as $case){
                if($case == '*'){
                    $countBomb++;
                }
            }
        }

        $this->assertEquals($grid->getNbBomb(), $countBomb);
    }

    public function testGetBombsPosition(): void
    {
        /** @var Grid */
        $grid = $this->grids[2];
        $mineSweeper = new MineSweeper($grid);
                
        $gridCreated = [
            '0' => ['.', '.', '.', '.'],
            '1' => ['.', '*', '.', '.'],
            '2' => ['.', '*', '*', '.'],
            '3' => ['.', '*', '.', '.']
        ];

        $expectedPositions = [
            0 => [1, 1],
            1 => [2, 1],
            2 => [2, 2],
            3 => [3, 1]
        ];

        $bombsPosition = $mineSweeper->getBombsPosition($gridCreated);

        $this->assertEquals($grid->getNbBomb(), count($bombsPosition));
        $this->assertEquals($expectedPositions, $bombsPosition);

        foreach($bombsPosition as $positions) {
            $this->assertEquals(2, count($positions));
        }
    }

    // Ce test fonctionne mais le code dans le controlleur lui ne fonctionne pas ! 
    public function testMineSweeper(): void
    {
        /** @var Grid */
        $grid = $this->grids[2];
        $mineSweeper = new MineSweeper($grid);
                
        $gridCreated = [
            '0' => ['.', '.', '.', '.'],
            '1' => ['.', '*', '.', '.'],
            '2' => ['.', '*', '*', '.'],
            '3' => ['.', '*', '.', '.']
        ];

        $finalGrid = [
            '0' => [1,  1,   1,  0],
            '1' => [2, '*',  3,  1],
            '2' => [3, '*', '*', 1],
            '3' => [2, '*',  3,  1]
        ];

        $this->assertEquals($mineSweeper->mineSweeper(), $finalGrid);
    }

    protected function tearDown(): void
    {
        unset($this->grids);
    }
}