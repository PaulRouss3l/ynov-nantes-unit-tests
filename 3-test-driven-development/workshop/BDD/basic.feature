Feature: Item

Scenario: L'entrée consistera en un nombre arbitraire de champs (n et m deux entiers):
    Given I have 2 entries:
    | N | M  |
    | 4 | 12 |
    | 5 | -1 |
    When a day pass
    Then my item should be like:
    | Name                  | SellIn | Quality |
    | Un weekend de 3 jours |     10 |      19 |
    | Le dernier Iphone     |      9 |     799 |
