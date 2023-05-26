// Create character data
let character = [
  new Minotaur(
    "Minotaur", 
    1200, 
    1200, 
    100, 
    20, 
    0, 
    [false, false, false, false, false, false, false, false], 
    ["Chaotic", "Monster", "Humanoid", "Physical Attack"], 
    [[0], [0, 0], [0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Kobold(
    "Kobold", 
    200, 
    200, 
    30, 
    10, 
    95, 
    [true, false, false, false, false, false, false, false], 
    ["Chaotic", "Monster", "Humanoid", "Physical Attack"], 
    [[50], [0, 0], [0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Knight(
    "Knight", 
    300, 
    300, 
    80, 
    30, 
    90, 
    [false, true, false, false, false, false, false, false], 
    ["Lawful", "Good", "Human", "Physical Attack"],
    [[0], [33, 3], [0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Dragon(
    "Dragon", 
    1500, 
    1500, 
    120, 
    60, 
    0, 
    [false, false, true, false, false, false, false, false], 
    ["Chaotic", "Evil", "Dragon", "Physical Attack"], 
    [[0], [0, 0], [25], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Wolf(
    "Wolf", 
    500, 
    500, 
    80, 
    30, 
    66, 
    [false, false, false, true, false, false, false, false], 
    ["Chaotic", "Animal", "Carnivore", "Physical Attack"], 
    [[0], [0, 0], [0], [0, 0, 75, 15], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Sheep(
    "Sheep", 
    300, 
    300, 
    60, 
    20, 
    50, 
    [false, false, false, false, true, false, false, false], 
    ["Lawful", "Animal", "Herbivore", "Physical Attack"], 
    [[0], [0, 0], [0], [0, 0, 0, 0], [100, 90, 20, 25], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Peasant(
    "Peasant", 
    500, 
    500, 
    70, 
    40, 
    75, 
    [false, false, false, false, false, true, false, false], 
    ["Lawful", "Neutral", "Human", "Physical Attack"], 
    [[0], [0, 0], [0], [0, 0, 0, 0], [0, 0, 0, 0], [50, 4, []], [0, false], [0, false, 0, false]]
  ),
  new Werewolf(
    "Werewolf", 
    1000, 
    1000, 
    90, 
    50, 
    20, 
    [false, false, false, false, false, false, true, false], 
    ["Chaotic", "Evil", "Humanoid", "Physical Attack"], 
    [[25], [0, 0], [0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [33, false], [0, false, 0, false]]
  ),
  new Mage(
    "Mage", 
    200, 
    200, 
    100, 
    20, 
    50, 
    [false, false, true, false, false, false, false, false], 
    ["Lawful", "Neutral", "Human", "Physical Attack", "Magical Attack"], 
    [[0], [0, 0], [33], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  ),
  new Mirror(
    "Mirror", 
    100, 
    100, 
    0, 
    10, 
    0, 
    [false, false, false, false, false, false, false, true], 
    ["Neutral", "Mechanical", "Inorganic", "No Attack", "Anti-Physical"], 
    [[0], [0, 0], [0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, []], [0, false], [66, false, 0, false]]
  ),
  new Custom(
    "Custom_I", 
    500, 
    500, 
    50, 
    25, 
    50, 
    [true, true, false, true, false, false, false, false], 
    ["Lawful", "Neutral", "Human", "Physical Attack", "Magical Attack"], 
    [[50], [25, 5], [0], [0, 0, 50, 15], [0, 0, 0, 0], [0, 0, []], [0, false], [0, false, 0, false]]
  )
];

/*
Character stats index :
0 = Name
1 = HP
2 = Remaining HP
3 = ATK
4 = DEF
5 = EVA
6 = Status Modifier (Break, Crit, Instant Death, Bleeding, Rage, Repeat, Convert, Reflect, ...)
7 = Trait (Trait1, Trait2, ...)
8 = Numerical Modifier (Break, Crit, Instant Death, Bleeding, Rage, Repeat, Convert, Reflect, ...)

Status Modifier index :
0 = Defense Break
1 = Critical Attack
2 = Instant Death
3 = Bleeding
4 = Rage
5 = Repeated Attack
6 = Conversion
7 = Reflect Attack

Trait (Currently only Mechanical and Anti-Physical used in code)
Lawful
Neutral
Chaotic
Good
Neutral
Evil
Physical Attack
Magical Attack
Monster         
Humanoid        
Dragon          
Human           
Animal          
Herbivore
Carnivore
Mechanical      Immune to Bleed
Biomechanical   
Immobilize      
Anti-Physical   Immune to Physical Attack
Anti-Magical    Immune to Magical Attack

Defense Break :
0 = chance

Critical Attack :
0 = chance
1 = multiplier of damage

Instant Death :
0 = chance

Bleeding :
0 = bleed level from enemy
1 = bleed level from self
2 = bleeding chance
3 = additional damage per turn

Rage
0 = chance
1 = bonus ATK per level
2 = bonus DEF per level
3 = bonus EVASION per level

Repeated
0 = chance
1 = amount of repeated attack
2 = common modifier of attack

Convertion
0 = chance
1 = convertion status (success or not)

Reflection
0 = chance
1 = reflection status (success or not)
2 = damage reflected to enemy
3 = miss status of reflected attack
*/

// Define variable char
let char = [
  character[0].stats(),
  character[1].stats(),
  character[2].stats(),
  character[3].stats(),
  character[4].stats(),
  character[5].stats(),
  character[6].stats(),
  character[7].stats(),
  character[8].stats(),
  character[9].stats(),
  character[10].stats()
];

// Define unique attack modifier (2, 5, 6)
let unique = [2, 5, 6];

// Define common attack modifier (0, 1, 3)
let common = [0, 1, 3];

/*
Common Attack Modifier :
defense break
critical attack
bleeding

Unique Attack Modifier :
instant death
repeated attack (can use common attack modifier in each attack and can miss)
conversion

Common Defense Modifier :
evasion

Unique Defense Modifier :
reflect

Common Status Modifier :
rage
*/