<?php

declare(strict_types=1);

namespace MineSweeper;

final class Grid
{
    /**
     * @var int
     */
    public $nbLine;

    /**
     * @var int
     */
    public $nbCase;

    /**
     * @var int
     */
    public $nbBomb;

    public function __construct(int $nbLine, int $nbCase, int $nbBomb)
    {
        $this->nbLine = $nbLine;
        $this->nbCase = $nbCase;
        $this->nbBomb = $nbBomb;
    }   

    public function getNbLine(): ?int
    {
        return $this->nbLine;
    }

    public function setNbLine(int $nbLine): Grid
    {
        $this->nbLine = $nbLine;

        return $this;
    }

    public function getNbCase(): ?int
    {
        return $this->nbLine;
    }

    public function setNbCase(int $nbCase): Grid
    {
        $this->nbCase = $nbCase;

        return $this;
    }
    
    public function getNbBomb(): ?int
    {
        return $this->nbBomb;
    }

    public function setNbBomb(int $nbBomb): Grid
    {
        $this->nbBomb = $nbBomb;

        return $this;
    }
}
