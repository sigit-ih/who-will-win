// Define class
class Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    this.name = name;
    this.hp = hitpoint;
    this.rhp = remainHP;
    this.atk = attack;
    this.def = defense;
    this.eva = evasion;
    this.eff = effect;
    this.trt = trait;
    this.mod = modifier;
  }

  stats() {
    return [this.name, this.hp, this.rhp, this.atk, this.def, this.eva, this.eff, this.trt, this.mod];
  }
}
class Minotaur extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Kobold extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Knight extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Dragon extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Wolf extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Sheep extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Peasant extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Werewolf extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Mage extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
class Mirror extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}
// Class for testing purpose
class Custom extends Character {
  constructor(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier) {
    super(name, hitpoint, remainHP, attack, defense, evasion, effect, trait, modifier);
  }
}