<?php

declare(strict_types=1);

namespace MineSweeper;

use MineSweeper\Grid;

final class MineSweeper
{
    /**
     * @var Grid[]
    */
    private $grid;

    public function __construct(Grid $grid)
    {
        $this->grid = $grid;
    }

    public function mineSweeper(): array
    {
        $grid = $this->createGrid();
        $gridWithBomb = $this->putBomb($grid);

        $bombPosition = $this->getBombsPosition($gridWithBomb);
        $gridDisplayWithoutZero = $this->displayCase($gridWithBomb, $bombPosition);
        $gridDisplay = $this->displayCaseZero($gridDisplayWithoutZero);

        return $gridDisplay;
    }

    /**
     * @return array
     */
    public function createGrid(): array
    {
        $arrayGrid = [];

        if($this->grid->getNbLine() <= 0 || $this->grid->getNbLine() >= 100) {
            throw new \InvalidArgumentException('Les paramètres d\'entrée ne sont pas bons');
        }

        if($this->grid->getNbCase() <= 0 || $this->grid->getNbCase() >= 100) {
            throw new \InvalidArgumentException('Les paramètres d\'entrée ne sont pas bons');
        }

        for ($i = 0; $i <= $this->grid->getNbLine() -1; $i++) {
            $arrayGrid[$i] = [];

            for ($k = 0; $k <= $this->grid->getNbCase() -1; $k++) {
                array_push($arrayGrid[$i], '.');
            }
        }

        return $arrayGrid;
    }

    public function putBomb(array $grid): array
    {
        for($i = 0; $i < $this->grid->getNbBomb(); $i++) {
            $line = array_rand($grid, 1);

            $case = rand(0, $this->grid->getNbCase() - 1);

            if($grid[$line][$case] == '*'){
                $i--;
            }

            $grid[$line][$case] = '*';
        }

        return $grid;
    }

    public function getBombsPosition(array $grid) {
        $posLine = 0;
        $posCase = 0;
        $bombsPosition = [];

        foreach($grid as $line) {
            foreach($line as $case){
                if($case == '*'){
                    array_push($bombsPosition, [$posLine, $posCase]);
                }
                $posCase++;
            }

            $posLine++;
            $posCase = 0;
        }

        return $bombsPosition;
    }

    public function displayCase(array $grid, array $bombsPosition) {
        $posLine = 0;
        $posCase = 0;

        foreach($grid as $line) {
            $posCase = 0;

            foreach($line as $case) {
                if($case != '*') {
                    foreach($bombsPosition as $bombPosition) {
                        if (
                            ($posLine + 1 == $bombPosition[0] || $posLine == $bombPosition[0] || $posLine - 1 == $bombPosition[0]) &&
                            ($posCase + 1 == $bombPosition[1] || $posCase == $bombPosition[1] || $posCase - 1 == $bombPosition[1])
                        ) {
                            if ($grid[$posLine][$posCase] == ".") {
                                $grid[$posLine][$posCase] = 1;
                            } else {
                                $grid[$posLine][$posCase]++;
                            }
                        }
                    }
                }

                $posCase++;
            }

            $posLine++;
        }

        return $grid;
    }

    public function displayCaseZero(array $grid) {
        $posLine = 0;
        $posCase = 0;

        foreach($grid as $line) {
            $posCase = 0;

            foreach($line as $case) {
                if($case == '0') {
                    $grid[$posLine][$posCase] = 0;
                }

                $posCase++;
            }

            $posLine++;
        }

        return $grid;
    }
}