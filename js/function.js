// Create function of bleed damage per turn
function bleedPerTurn(character1, character2, i, mode) {
  if (mode == "turn") {
    if (character1[0] != character2[0]) {
    character2[2] -= character1[8][3][3] * character2[8][3][0];
    character2[2] -= character2[8][3][3] * character2[8][3][1];
    }
  } else {
    character2[2] -= character1[8][3][3] * character2[8][3][0];
    character2[2] -= character2[8][3][3] * character2[8][3][1];
  }
}

// Create function of Normal ATK
function normalATK(character1, character2, atkStatus, i, mode) { 
  let damage = 0;
  damage = character1[3] - character2[4];
  if (damage <= 0) {
    damage = 1;
  }
  character2[2] -= damage;
  bleedPerTurn(character1, character2, i, mode); 
  if (character2[2] < 0) {
    character2[2] = 0;
  }
  if (character1[6][5] == true) {
    if (atkStatus[5][0] == true && atkStatus[3] == false) {
      character1[8][5][2].push([false, false, false]);    
    }
  }
  return [damage, atkStatus];
}

// Create function of Defense Break
function defBreak(character1, character2, atkStatus, i, mode) {
  let damage = 0;
  let rand = Math.random();
  if (rand < (character1[8][0][0]/100)) {
    atkStatus[0] = true;
    if (character1[6][5] == true) {
      if (atkStatus[5][0] == true) {
        character1[8][5][2].push([true, false, false]);    
      }
    }
    damage = character1[3];
    if (damage <= 0) {
      damage = 1;
    }
    character2[2] -= damage;
    bleedPerTurn(character1, character2, i, mode); 
    if (character2[2] < 0) {
      character2[2] = 0;
    }
    return [damage, atkStatus];
  } else {
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    return [arrNormal[0], arrNormal[1]];
  }
}

// Create function of Critical ATK
function criticalAtk(character1, character2, atkStatus, i, mode) {
  let damage = 0;
  let rand = Math.random();
  if (rand < (character1[8][1][0]/100)) {
    atkStatus[1] = true;
    if (character1[6][5] == true) {
      if (atkStatus[5][0] == true) {
        character1[8][5][2].push([false, true, false]);    
      }
    }
    damage = (character1[3] - character2[4]) * character1[8][1][1];
    if (damage <= 0) {
      damage = 1;
    }
    character2[2] -= damage;
    bleedPerTurn(character1, character2, i, mode); 
    if (character2[2] < 0) {
      character2[2] = 0;
    }
    return [damage, atkStatus];
  } else {
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    return [arrNormal[0], arrNormal[1]];
  }
}

// Create function of Instant Death
function instaDeath(character1, character2, atkStatus, i, mode) {
  let damage = 0;
  let rand = Math.random();
  if (rand < (character1[8][2][0]/100) && (character1[0] != "Mage" || character2[0] != "Mirror")) {
    atkStatus[2] = true;
    damage = character2[1];
    character2[2] -= damage;
    if (character2[2] < 0) {
      character2[2] = 0;
    }
    return [damage, atkStatus];
  } else {
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    return [arrNormal[0], arrNormal[1]];
  }
}

// Create function of Bleeding
function bleeding(character1, character2, atkStatus, i, mode) {
  let damage = 0;
  let rand = Math.random();
  if (rand < (character1[8][3][2]/100)) {
    atkStatus[3] = true;
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    if (character1[6][5] == true) {
      if (atkStatus[5][0] == true) {
        character1[8][5][2].push([false, false, true]);    
      }
    }
    return [arrNormal[0], arrNormal[1]];
  } else {
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    return [arrNormal[0], arrNormal[1]];
  }
}

// Create function of Repeated Attack
function repeatedAtk(character1, character2, atkStatus, i, mode) {
  let damage = 0;
  let rand = Math.random();
  atkStatus[5].push(false);
  let n = 0;
  for (let a = 0; a < (character1[8][5][1] * 2); a++) {
    if (n < character1[8][5][1]) {
      atkStatus[5].push(false);
    } else {
      atkStatus[5].push(0);
    }
    n++;
  }
  atkStatus[5].push(0);
  if (rand < (character1[8][5][0]/100)) {
    atkStatus[5][0] = true;
    let damage = 0;
    let rpt, atkTemp;
    for (let b = 0; b < character1[8][5][1]; b++) {
      rand = Math.random();
      if (rand < (character2[5]/100)) {
        atkStatus[5][b + 1] = false;
        character1[8][5][2].push([false, false, false]);
      } else {
        atkTemp = [false, false, atkStatus[2], false, atkStatus[4], atkStatus[5], false, atkStatus[7]];
        rpt = commonAttackModifier(character1, character2, atkTemp, i, mode);
        atkStatus = rpt[1];
        atkStatus[5][b + 1] = true;      
        damage += rpt[0];
        atkStatus[5][b + 1 + character1[8][5][1]] = rpt[0];
        atkStatus[5][1 + (character1[8][5][1] * 2)] += rpt[0];
      }
    }
    bleedPerTurn(character1, character2, i, mode);
    if (character2[2] < 0) {
      character2[2] = 0;
    }
    return [damage, atkStatus];
  } else {
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    return [arrNormal[0], arrNormal[1]];
  }
}

// Create function of Conversion
function conversion(character1, character2, atkStatus, i, mode) {
  let db = defBreak(character1, character2, atkStatus, i, mode);
  let damage = db[0];
  atkStatus = db[1];
  if (character1[0] != character2[0] && atkStatus[7] == false) {
    let rand = Math.random();
    if (atkStatus[0] == true) {
      if (rand < (character1[8][6][0]/100)) {
        atkStatus[6] = true;
        return [damage, atkStatus];
      } else {
        atkStatus[6] = false;
        return [damage, atkStatus];
      }
    } else {
      atkStatus[6] = false;
      return [damage, atkStatus];
    }
  }
}

// Create function of reflect attack
function reflect(character1, character2, atkStatus, i, mode){
  let rand = Math.random();
  if (rand < (character2[8][7][0]/100)) {
    atkStatus[7] = true;
    character2[8][7][1] = true;
    let a2 = fight(character1, character1, atkStatus, i, mode);
    character2[8][7][2] = a2[0];
    character2[8][7][3] = a2[1];
    atkStatus = a2[2];
    bleedPerTurn(character1, character2, i, mode); 
    return [0, a2[2]];
  } else {
    bleedPerTurn(character1, character2, i, mode); 
    return [0, atkStatus];
  }
}

// Create function of Evasion
function evasion(character1, character2, atkStatus, i, mode) {
  let damage = 0;
  let missStatus = true;
  bleedPerTurn(character1, character2, i, mode); 
  if (character2[2] < 0) {
    character2[2] = 0;
  }
  return [damage, missStatus];
}

// Create function of unique attack modifier
function uniqueAttackModifier(character1, character2, atkStatus, i, mode, u) {
  let damage = 0;
  let unq = Math.floor(Math.random() * unique.length);
  if (u > 1) {
    unq = Math.floor(Math.random() * unique.length);
    let on;
    if (unq == 2) {
      on = instaDeath(character1, character2, atkStatus, i, mode);
    } else if (unq == 5 && atkStatus[5][0] != true) {
      on = repeatedAtk(character1, character2, atkStatus, i, mode);
    } else if (unq == 6) {
      on = conversion(character1, character2, atkStatus, i, mode);
    }
    damage = on[0];
    atkStatus = on[1];
  } 
  else {
    if (character1[6][2] == true) {
      let id = instaDeath(character1, character2, atkStatus, i, mode);
      damage = id[0];
      atkStatus = id[1];
    } 
    else if (character1[6][5] == true && atkStatus[5][0] != true) {
      let ra = repeatedAtk(character1, character2, atkStatus, i, mode);
      damage = ra[0];
      atkStatus = ra[1];
    } 
    else if (character1[6][6] == true) {
      let cv = conversion(character1, character2, atkStatus, i, mode);
      damage = cv[0];
      atkStatus = cv[1];
      if (atkStatus[6] == true) {
        character2[2] = 0;
      }
    }
  }
  return [damage, atkStatus];
}

// Create function of common attack modifier
function commonAttackModifier(character1, character2, atkStatus, i, mode) {
  /* 
  0 = defense break
  1 = critical attack
  3 = bleeding
  */
  let rand = Math.random();
  if (character1[6][0] == true && rand < (character1[8][0][0]/100)) {
    rand = Math.random();
    if (character1[6][1] == true && rand < (character1[8][1][0]/100)) {
      rand = Math.random();
      if (character1[6][3] == true && rand < (character1[8][3][2]/100) && character2[7].filter(n => n === "Mechanical").length == 0) {
        atkStatus[0] = true;
        atkStatus[1] = true;
        atkStatus[3] = true;
        if (character1[6][5] == true) {
          if (atkStatus[5][0] == true) {
            character1[8][5][2].push([true, true, true]);    
          }
        }
        damage = character1[3] * character1[8][1][1];
        bleedPerTurn(character1, character2, i, mode); 
        if (damage <= 0) {
          damage = 1;
        }
        character2[2] -= damage;
        if (character2[2] < 0) {
          character2[2] = 0;
        }
      } 
      else {
        atkStatus[0] = true;
        atkStatus[1] = true;
        if (character1[6][5] == true) {
          if (atkStatus[5][0] == true) {
            character1[8][5][2].push([true, true, false]);    
          }
        }
        damage = character1[3] * character1[8][1][1];
        bleedPerTurn(character1, character2, i, mode); 
        if (damage <= 0) {
          damage = 1;
        }
        character2[2] -= damage;
        if (character2[2] < 0) {
          character2[2] = 0;
        }
      }
    }
    else if (character1[6][3] == true && rand < (character1[8][3][2]/100) && character2[7].filter(n => n === "Mechanical").length == 0) {
      atkStatus[0] = true;
      atkStatus[3] = true;
      if (character1[6][5] == true) {
        if (atkStatus[5][0] == true) {
          character1[8][5][2].push([true, false, true]);    
        }
      }
      damage = character1[3];
      bleedPerTurn(character1, character2, i, mode); 
      if (damage <= 0) {
        damage = 1;
      }
      character2[2] -= damage;
      if (character2[2] < 0) {
        character2[2] = 0;
      }
    }
    else {
      let db = defBreak(character1, character2, atkStatus, i, mode);
      damage = db[0];
      atkStatus = db[1];
    }
  } 
  else if (character1[6][1] == true && rand < (character1[8][1][0]/100)) {
    rand = Math.random();
    if (character1[6][3] == true && rand < (character1[8][3][2]/100) && character2[7].filter(n => n === "Mechanical").length == 0) {
      atkStatus[1] = true;
      atkStatus[3] = true;
      if (character1[6][5] == true) {
        if (atkStatus[5][0] == true) {
        character1[8][5][2].push([false, true, true]);    
        }
      }
      damage = (character1[3] - character2[4]) * character1[8][1][1];
      bleedPerTurn(character1, character2, i, mode); 
      if (damage <= 0) {
        damage = 1;
      }
      character2[2] -= damage;
      if (character2[2] < 0) {
        character2[2] = 0;
      }
    } 
    else {
      let cr = criticalAtk(character1, character2, atkStatus, i, mode);
      damage = cr[0];
      atkStatus = cr[1];
      }
  } 
  else if (character1[6][3] == true && rand < (character1[8][3][2]/100) && character2[7].filter(n => n === "Mechanical").length == 0) {
    let bl = bleeding(character1, character2, atkStatus, i, mode);
    damage = bl[0];
    atkStatus = bl[1];
  } 
  else {
    arrNormal = normalATK(character1, character2, atkStatus, i, mode);
    damage = arrNormal[0];
    atkStatus = arrNormal[1];
  }
  return [damage, atkStatus];
}

// Create function of Fight
function fight(character1, character2, atkStatus, i, mode) {
  let rand = Math.random();
  if (character1[3] <= 0 || character1[7].filter(n => n === "No Attack").length > 0) {
    bleedPerTurn(character1, character2, i, mode); 
    if (character2[2] < 0) {
      character2[2] = 0;
    }
    return [0, false, atkStatus];
  } else if ((character2[7].filter(n => n === "Anti-Physical").length > 0 && character1[7].filter(n => n === "Magical Attack").length == 0) || character2[7].filter(n => n === "Anti-Magical").length > 0 && character1[7].filter(n => n === "Physical Attack").length == 0) {
    bleedPerTurn(character1, character2, i, mode); 
    if (character2[2] < 0) {
      character2[2] = 0;
    }
    return [0, false, atkStatus];
  } else if (rand < (character2[5]/100)) {
    let evas = evasion(character1, character2, atkStatus, i, mode);
    return [evas[0], evas[1], atkStatus];
  } else {
    let missStatus = false;
    if (character2[6][7] == true && character2[8][7][1] == false && character1[0] != character2[0]) {
      let rf = reflect(character1, character2, atkStatus, i, mode);
      damage = rf[0];
      atkStatus = rf[1];
    }
    if (character2[6][7] == true && character2[8][7][1] == true) {
      return [damage, missStatus, atkStatus];
    } else {
      let uniqueStatus = false;
      let commonStatus = false;
      let u = 0;
      unique.forEach(element => {
        if (character1[6][element] == true) {
          uniqueStatus = true;
          u += 1;
        }
      });
      common.forEach(element => {
        if (character1[6][element] == true) {
          commonStatus = true;
        }
      });
      if (uniqueStatus == true) {
        let uq = uniqueAttackModifier(character1, character2, atkStatus, i, mode, u);
        damage = uq[0];
        atkStatus = uq[1];
        return [damage, missStatus, atkStatus];
      } else if (commonStatus == true) {
        let cm = commonAttackModifier(character1, character2, atkStatus, i, mode);
        damage = cm[0];
        atkStatus = cm[1];
        return [damage, missStatus, atkStatus];
      } else {
        arrNormal = normalATK(character1, character2, atkStatus, i, mode);
        return [arrNormal[0], missStatus, arrNormal[1]];
      }
    }
  }
}

// Create Function to push battle result to log Array
function battleLog (char1, char2, damage, currentHP, miss, atkStatus, i, mode) {
  let log = [];
  let temp = "";
  let twin = "";
  if (char1 == char2 && false) {
    twin = " 2";
  }
  if (char1[3] == 0) {
    log.push("<img src='assets/attack-symbol.png' alt='fight'> " + char1[0] + " doesn't have any OFFENSIVE capabilities!");
  }
  else if ((char2[7].filter(n => n === "Anti-Physical").length > 0 && char1[7].filter(n => n === "Magical Attack").length == 0) || (char2[7].filter(n => n === "Anti-Magical").length > 0 && char1[7].filter(n => n === "Physical Attack").length == 0)) {
    if (char2[7].filter(n => n === "Anti-Physical").length > 0) {
      if (char2[7].filter(n => n === "Anti-Magical").length > 0) {
        log.push("<img src='assets/attack-symbol.png' alt='fight'> " + char1[0] + " unable to damage " + char2[0] + " because of " + char2[0] + "'s immunity to PHYSICAL and MAGICAL attack!");
      } else if (char2[7].filter(n => n === "Anti-Physical").length > 0) {
        log.push("<img src='assets/attack-symbol.png' alt='fight'> " + char1[0] + " unable to damage " + char2[0] + " because of " + char2[0] + "'s immunity to PHYSICAL ATTACK!");
      }
    } else if (char2[7].filter(n => n === "Anti-Magical").length > 0) {
      log.push("<img src='assets/attack-symbol.png' alt='fight'> " + char1[0] + " unable to damage " + char2[0] + " because of " + char2[0] + "'s immunity to MAGICAL ATTACK!");
    }
  }
  else if (miss == false) {
    if (char2[6][7] == true && char2[8][7][1] == true) {
      let tempDamage;
      if (mode == "rt") {
        if (char1[8][3][0] > 0 && char1[8][3][1] > 0) {
          tempDamage = char2[8][7][2] - (char1[8][3][0] * char2[8][3][3]) - (char1[8][3][1] * char1[8][3][3]);
        } else if (char1[8][3][0] > 0) {
          tempDamage = char2[8][7][2] - (char1[8][3][0] * char2[8][3][3]);
        } else if (char1[8][3][1] > 0) {
          tempDamage = char2[8][7][2] - (char1[8][3][1] * char1[8][3][3]);
        } else {
          tempDamage = char2[8][7][2];
        }
      } else {
        tempDamage = char2[8][7][2];
      }
      temp += String("<img src='assets/reflect-symbol.png' alt='reflect'> " + char1[0] + " attack " + char2[0] + " but REFLECTED!<br>");
      if (char2[8][7][3] == false) {
        if (atkStatus[2] == true) {
          temp += String("<img src='assets/instant-death-symbol.png' alt='instant-death'> " + char1[0] + " attack trigger INSTANT DEATH! " + char1[0] + " DIED instantly!<br>");
        } else if (atkStatus[5][0] == true) {
          let dmg = [];
          for (let a = 0; a < 4; a++) {
            if (atkStatus[5][a+1] == true) {
              let arrRepeatStat = char1[8][5][2][a];
              if (arrRepeatStat[0] == true) {
                if (arrRepeatStat[1] == true) {
                  if (arrRepeatStat[2] == true) {
                    dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK, <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
                  } else {
                    dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK)";
                  }
                } else if (arrRepeatStat[2] == true) {
                  dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
                } else {
                  dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK)";
                }
              } else if (arrRepeatStat[1] == true) {
                if (arrRepeatStat[2] == true) {
                  dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
                } else {
                  dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK)";
                }
              } else if (arrRepeatStat[2] == true) {
                dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
              } else {
                dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP";
              }
            } else {
              dmg[a] = "0 HP (<img src='assets/evasion-symbol.png' alt='miss'> MISSED)";
            }
          }
          temp += String("<img src='assets/repeat-attack-symbol.png' alt='repeat-attack'> " + char1[0] + " deal REPEATED ATTACK! " + char1[0] + " deal " + char1[8][5][1] + " consecutive attack for " + dmg[0] + ", " + dmg[1] + ", "+ dmg[2] + ", and "+ dmg[3] + " with TOTAL of " + atkStatus[5][1+(char1[8][5][1]*2)] + " HP<br>");
        } else if (atkStatus[0] == true) {
          if (atkStatus[1] == true) {
            if (atkStatus[3] == true) {
              temp += String("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK, <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING! " + char1[0] + " deal pure damage, " + char1[8][1][1] + " times damage for " + tempDamage + " HP and inflict Bleed<br>");
            }
            else {
              temp += String("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK! " + char1[0] + " deal pure damage and " + char1[8][1][1] + " times damage for " + tempDamage + " HP<br>");
            }
          } else if (atkStatus[3] == true) {
            temp += String("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING! " + char1[0] + " deal pure damage for " + tempDamage + " HP and inflict Bleed<br>");
          } else {
            temp += String("<img src='assets/defense-break-symbol.png' alt='defense-break'> " + char1[0] + " attack trigger DEFENSE BREAK! " + char1[0] + " deal pure damage for " + tempDamage + " HP<br>");
          }
        } else if (atkStatus[1] == true) {
          if (atkStatus[3] == true) {
            temp += String("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING! " + char1[0] + " deal " + char1[8][1][1] + " times damage for " + tempDamage + " HP and inflict Bleed<br>");
          } else {
            temp += String("<img src='assets/critical-symbol.png' alt='critical-attack'> " + char1[0] + " attack trigger CRITICAL ATTACK! " + char1[0] + " deal " + char1[8][1][1] + " times damage for " + tempDamage + " HP<br>");
          }
        } else if (atkStatus[3] == true) {
          temp += String("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] + " attack trigger BLEEDING! " + char1[0] + " deal " + tempDamage + " HP and inflict Bleed<br>");
        } else {
          temp += String("<img src='assets/attack-symbol.png' alt='fight'> " + char1[0] + " attack " + char1[0] + " for " + tempDamage + " HP<br>");
        }
      } else {
        temp += String("<img src='assets/evasion-symbol.png' alt='miss'> " + char1[0] + " attack MISSED!<br>");
      }
    } else {
      if (atkStatus[2] == true) {
        log.push("<img src='assets/instant-death-symbol.png' alt='instant-death'> " + char1[0] + " attack trigger INSTANT DEATH! " + char2[0] + " DIED instantly!");
      } else if (atkStatus[5][0] == true) {
        let dmg = [];
        for (let a = 0; a < 4; a++) {
          if (atkStatus[5][a+1] == true) {
            let arrRepeatStat = char1[8][5][2][a];
            if (arrRepeatStat[0] == true) {
              if (arrRepeatStat[1] == true) {
                if (arrRepeatStat[2] == true) {
                  dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK, <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
                } else {
                  dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK)";
                }
              } else if (arrRepeatStat[2] == true) {
                dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
              } else {
                dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK)";
              }
            } else if (arrRepeatStat[1] == true) {
              if (arrRepeatStat[2] == true) {
                dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
              } else {
                dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK)";
              }
            } else if (arrRepeatStat[2] == true) {
              dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP (<img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING)";
            } else {
              dmg[a] = atkStatus[5][a+1+char1[8][5][1]] + " HP";
            }
          } else {
            dmg[a] = "0 HP (<img src='assets/evasion-symbol.png' alt='miss'> MISSED)";
          }
        }
        log.push("<img src='assets/repeat-attack-symbol.png' alt='repeat-attack'> " + char1[0] + " deal REPEATED ATTACK! " + char1[0] + " deal " + char1[8][5][1] + " consecutive attack for " + dmg[0] + ", " + dmg[1] + ", "+ dmg[2] + ", and "+ dmg[3] + " with TOTAL of " + atkStatus[5][1+(char1[8][5][1]*2)] + " HP");
      } else if (atkStatus[0] == true) {
        if (atkStatus[6] == true) {
          let convName = "";
          if (char1[0] == "Werewolf") {
            convName = char1[0];
          } else {
            convName = "entity like " + char1[0];
          }
        log.push("<img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='convert'> " + char1[0] + " successfully CONVERT " + char2[0] + " into another " + convName + "!");
        } else if (atkStatus[1] == true) {
          if (atkStatus[3] == true) {
            log.push("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK, <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING! " + char1[0] + " deal pure damage, " + char1[8][1][1] + " times damage for " + damage + " HP and inflict Bleed");
          } else {
            log.push("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK! " + char1[0] + " deal pure damage and " + char1[8][1][1] + " times damage for " + damage + " HP");
          }
        } else if (atkStatus[3] == true) {
          log.push("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/defense-break-symbol.png' alt='defense-break'> DEFENSE BREAK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING! " + char1[0] + " deal pure damage for " + damage + " HP and inflict Bleed");
        } else {
          log.push("<img src='assets/defense-break-symbol.png' alt='defense-break'> " + char1[0] + " attack trigger DEFENSE BREAK! " + char1[0] + " deal pure damage for " + damage + " HP");
        }
      } else if (atkStatus[1] == true) {
        if (atkStatus[3] == true) {
          log.push("<img src='assets/damage-symbol.png' alt='multiple-modifier'> " + char1[0] + " attack trigger <img src='assets/critical-symbol.png' alt='critical-attack'> CRITICAL ATTACK and <img src='assets/bleeding-symbol.png' alt='bleeding'> BLEEDING! " + char1[0] + " deal " + char1[8][1][1] + " times damage for " + damage + " HP and inflict Bleed");
        } else {
          log.push("<img src='assets/critical-symbol.png' alt='critical-attack'> " + char1[0] + " attack trigger CRITICAL ATTACK! " + char1[0] + " deal " + char1[8][1][1] + " times damage for " + damage + " HP");
        }
      } else if (atkStatus[3] == true) {
        log.push("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] + " attack trigger BLEEDING! " + char1[0] + " deal " + damage + " HP and inflict Bleed");
      } else {
        log.push("<img src='assets/attack-symbol.png' alt='fight'> " + char1[0] + " attack " + char2[0] + " for " + damage + " HP");
      }
    }
  } else {
    log.push("<img src='assets/evasion-symbol.png' alt='miss'> " + char1[0] + " attack MISSED!");
  }

  let rip = "<img src='assets/health-symbol.png' alt='HP'> ";
  if (char2[6][7] == true && char2[8][7][1] == true) {
    if (char1[2] <= 0) {
      rip = "<img src='assets/death-symbol.png' alt='death'> ";
    }
    let tempDamage = char2[8][7][2];
    if (mode == "turn") {
      temp += String(rip + char1[0] + " remaining HP is " + char1[2]);
    } 
    else {
      if (char1[6][4] == true) {
        if (char1[8][3][0] > 0 && char1[8][3][1] > 0) {
          let total0 = (char1[8][3][0] * char2[8][3][3]);
          let total1 = (char1[8][3][1] * char1[8][3][3]);
          let total = total0 + total1 + tempDamage;
          temp += String("<img src='assets/rage-symbol.png' alt='rage'> " + char1[0] + " are BLEEDING and ANGRY!<br><img src='assets/rage-symbol.png' alt='rage'> " + char1[0] +" Bleeding level are " + char1[8][3][0] + " and " + char1[8][3][1] + " from self bleeding, causing increased <img src='assets/attack-symbol.png' alt='attack'> ATK by " + ((char1[8][3][0] + char1[8][3][1]) * char1[8][4][1]) + ", <img src='assets/defense-symbol.png' alt='defense'> DEF by " + ((char1[8][3][0] + char1[8][3][1]) * char1[8][4][2]) + ", <img src='assets/evasion-symbol.png' alt='evasion'> EVASION by " + ((char1[8][3][0] + char1[8][3][1]) * char1[8][4][3]) + "% and additional bleeding damage per Turn by " + total0 + " HP plus " + total1 + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char1[0] + " remaining HP is " + char1[2]);
        }
        else if (char1[8][3][0] > 0) {
          let total = (char1[8][3][0] * char2[8][3][3]) + tempDamage;
          temp += String("<img src='assets/rage-symbol.png' alt='rage'> " + char1[0] + " are BLEEDING and ANGRY!<br><img src='assets/rage-symbol.png' alt='rage'> " + char1[0] +" Bleeding level are " + char1[8][3][0] + ", causing increased <img src='assets/attack-symbol.png' alt='attack'> ATK by " + (char1[8][3][0] * char1[8][4][1]) + ", <img src='assets/defense-symbol.png' alt='defense'> DEF by " + (char1[8][3][0] * char1[8][4][2]) + ", <img src='assets/evasion-symbol.png' alt='evasion'> EVASION by " + (char1[8][3][0] * char1[8][4][3]) + "% and additional bleeding damage per Turn by " + (char1[8][3][0] * char2[8][3][3]) + " HP for TOTAL damage " + total + " HP<br> " + rip + char1[0] + " remaining HP is " + char1[2]);
        } 
        else if (char1[8][3][1] > 0) {
          let total = (char1[8][3][1] * char1[8][3][3]) + tempDamage;
          temp += String("<img src='assets/rage-symbol.png' alt='rage'> " + char1[0] + " are BLEEDING and ANGRY!<br><img src='assets/rage-symbol.png' alt='rage'> " + char1[0] +" Bleeding level are " + char1[8][3][1] + " from self bleeding, causing increased <img src='assets/attack-symbol.png' alt='attack'> ATK by " + (char1[8][3][1] * char1[8][4][1]) + ", <img src='assets/defense-symbol.png' alt='defense'> DEF by " + (char1[8][3][1] * char1[8][4][2]) + ", <img src='assets/evasion-symbol.png' alt='evasion'> EVASION by " + (char1[8][3][1] * char1[8][4][3]) + "% and additional bleeding damage per Turn by " + (char1[8][3][1] * char1[8][3][3]) + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char1[0] + " remaining HP is " + char1[2]);
        } 
        else {
          temp += String(rip + char1[0] + " remaining HP is " + char1[2]);
        }
      } else {
        if (char1[8][3][0] > 0 && char1[8][3][1] > 0) {
          let total0 = (char1[8][3][0] * char2[8][3][3]);
          let total1 = (char1[8][3][1] * char1[8][3][3]);
          let total = total0 + total1 + tempDamage;
          temp += String("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] + " are BLEEDING!<br><img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] +" Bleeding level are " + char1[8][3][0] + " and " + char1[8][3][1] + " from self bleeding, causing additional bleeding damage per Turn by " + total0 + " HP plus " + total1 + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char1[0] + " remaining HP is " + char1[2]);
        }
        else if (char1[8][3][0] > 0) {
          let total = (char1[8][3][0] * char2[8][3][3]) + tempDamage;
          temp += String("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] + " are BLEEDING!<br><img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] +" Bleeding level are " + char1[8][3][0] + ", causing additional bleeding damage per Turn by " + (char1[8][3][0] * char2[8][3][3]) + " HP for TOTAL damage " + total + " HP<br> " + rip + char1[0] + " remaining HP is " + char1[2]);
        } 
        else if (char1[8][3][1] > 0) {
          let total = (char1[8][3][1] * char1[8][3][3]) + tempDamage;
          temp += String("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] + " are BLEEDING!<br><img src='assets/bleeding-symbol.png' alt='bleeding'> " + char1[0] +" Bleeding level are " + char1[8][3][1] + " from self bleeding, causing additional bleeding damage per Turn by " + (char1[8][3][1] * char1[8][3][3]) + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char1[0] + " remaining HP is " + char1[2]);
        } 
        else {
          temp += String(rip + char1[0] + " remaining HP is " + char1[2]);
        }
      }
    }
    log.push(temp);
  } 

  if (atkStatus[6] == false) {
    rip = "<img src='assets/health-symbol.png' alt='HP'> ";
    if (char2[2] <= 0) {
      rip = "<img src='assets/death-symbol.png' alt='death'> ";
    }
    if (char2[6][4] == true) {
      if (char2[8][3][0] > 0 && char2[8][3][1] > 0) {
        let total0 = (char2[8][3][0] * char1[8][3][3]);
        let total1 = (char2[8][3][1] * char2[8][3][3]);
        let total = total0 + total1 + damage;
        log.push("<img src='assets/rage-symbol.png' alt='rage'> " + char2[0] + " are BLEEDING and ANGRY!<br><img src='assets/rage-symbol.png' alt='rage'> " + char2[0] +" Bleeding level are " + char2[8][3][0] + " and " + char2[8][3][1] + " from self bleeding, causing increased <img src='assets/attack-symbol.png' alt='attack'> ATK by " + ((char2[8][3][0] + char2[8][3][1]) * char2[8][4][1]) + ", <img src='assets/defense-symbol.png' alt='defense'> DEF by " + ((char2[8][3][0] + char2[8][3][1]) * char2[8][4][2]) + ", <img src='assets/evasion-symbol.png' alt='evasion'> EVASION by " + ((char2[8][3][0] + char2[8][3][1]) * char2[8][4][3]) + "% and additional bleeding damage per Turn by " + total0 + " HP plus " + total1 + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char2[0] + " remaining HP is " + char2[2]);
      }
      else if (char2[8][3][0] > 0) {
        let total = (char2[8][3][0] * char1[8][3][3]) + damage;
        log.push("<img src='assets/rage-symbol.png' alt='rage'> " + char2[0] + " are BLEEDING and ANGRY!<br><img src='assets/rage-symbol.png' alt='rage'> " + char2[0] +" Bleeding level are " + char2[8][3][0] + ", causing increased <img src='assets/attack-symbol.png' alt='attack'> ATK by " + (char2[8][3][0] * char2[8][4][1]) + ", <img src='assets/defense-symbol.png' alt='defense'> DEF by " + (char2[8][3][0] * char2[8][4][2]) + ", <img src='assets/evasion-symbol.png' alt='evasion'> EVASION by " + (char2[8][3][0] * char2[8][4][3]) + "% and additional bleeding damage per Turn by " + (char2[8][3][0] * char1[8][3][3]) + " HP for TOTAL damage " + total + " HP<br> " + rip + char2[0] + " remaining HP is " + char2[2]);
      } 
      else if (char2[8][3][1] > 0) {
        let total = (char2[8][3][1] * char2[8][3][3]) + damage;
        log.push("<img src='assets/rage-symbol.png' alt='rage'> " + char2[0] + " are BLEEDING and ANGRY!<br><img src='assets/rage-symbol.png' alt='rage'> " + char2[0] +" Bleeding level are " + char2[8][3][1] + " from self bleeding, causing increased <img src='assets/attack-symbol.png' alt='attack'> ATK by " + (char2[8][3][1] * char2[8][4][1]) + ", <img src='assets/defense-symbol.png' alt='defense'> DEF by " + (char2[8][3][1] * char2[8][4][2]) + ", <img src='assets/evasion-symbol.png' alt='evasion'> EVASION by " + (char2[8][3][1] * char2[8][4][3]) + "% and additional bleeding damage per Turn by " + (char2[8][3][1] * char2[8][3][3]) + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char2[0] + " remaining HP is " + char2[2]);
      } 
      else {
        log.push(rip + char2[0] + " remaining HP is " + char2[2]);
      }
    } else {
      if (char2[8][3][0] > 0 && char2[8][3][1] > 0) {
        let total0 = (char2[8][3][0] * char1[8][3][3]);
        let total1 = (char2[8][3][1] * char2[8][3][3]);
        let total = total0 + total1 + damage;
        log.push("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char2[0] + " are BLEEDING!<br><img src='assets/bleeding-symbol.png' alt='bleeding'> " + char2[0] +" Bleeding level are " + char2[8][3][0] + " and " + char2[8][3][1] + " from self bleeding, causing additional bleeding damage per Turn by " + total0 + " HP plus " + total1 + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char2[0] + " remaining HP is " + char2[2]);
      }
      else if (char2[8][3][0] > 0) {
        let total = (char2[8][3][0] * char1[8][3][3]) + damage;
        log.push("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char2[0] + " are BLEEDING!<br><img src='assets/bleeding-symbol.png' alt='bleeding'> " + char2[0] +" Bleeding level are " + char2[8][3][0] + ", causing additional bleeding damage per Turn by " + (char2[8][3][0] * char1[8][3][3]) + " HP for TOTAL damage " + total + " HP<br> " + rip + char2[0] + " remaining HP is " + char2[2]);
      } 
      else if (char2[8][3][1] > 0) {
        let total = (char2[8][3][1] * char2[8][3][3]) + damage;
        log.push("<img src='assets/bleeding-symbol.png' alt='bleeding'> " + char2[0] + " are BLEEDING!<br><img src='assets/bleeding-symbol.png' alt='bleeding'> " + char2[0] +" Bleeding level are " + char2[8][3][1] + " from self bleeding, causing additional bleeding damage per Turn by " + (char2[8][3][1] * char2[8][3][3]) + " HP from self bleeding for TOTAL damage " + total + " HP<br> " + rip + char2[0] + " remaining HP is " + char2[2]);
      } 
      else {
        log.push(rip + char2[0] + " remaining HP is " + char2[2]);
      }
    }
  } else {
    log.push("<img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='convert'> " + char2[0] + " is converted");
  }
  return log;
}

// Create function rtBattle (real time battle)
function rtBattle(log, char1, char2, miss, atkStatus, i, mode) {
  // char1 attack char2
  // Check fight from char1 to char2
  let eva = fight(char1, char2, atkStatus[0], i, mode);
  let damage = eva[0];
  miss[0] = eva[1];
  atkStatus[0] = eva[2];
  if (atkStatus[0][6] == true) {
    char1[8][6][1] = true;
  }

  // Insert attack log from char1 to char2 into log Array
  if (mode == "rt") {
    let btlLog = battleLog(char1, char2, damage, char2[2], miss[0], atkStatus[0], i, mode);
    for(let a = 0; a < btlLog.length; a++) {
      log.push(btlLog[a]);
    }
  }

  // char2 attack char1    
  // Check fight from char2 to char1
  let eva2 = fight(char2, char1, atkStatus[1], i, mode);
  let damage2 = eva2[0];
  miss[1] = eva2[1];
  atkStatus[1] = eva2[2];
  if (atkStatus[1][6] == true) {
    char2[8][6][1] = true;
  }

  // Insert attack log from char2 to char1 into log Array
  if (mode == "rt") {
    btlLog = [];
    btlLog = battleLog(char2, char1, damage2, char1[2], miss[1], atkStatus[1], i, mode);
    for(let b = 0; b < btlLog.length; b++) {
      log.push(btlLog[b]);
    }
  }
  return [log, char1, char2, miss, atkStatus];
}

// Create function turnBattle (turn battle)
function turnBattle(log, char1, char2, miss, atkStatus, i, mode) {
  // Change mode if char1 or char2 is Mirror
  if (char2[0] == "Mirror" || char1[0] == "Mirror") {
    if (mode == "rt") {
      mode = "turn";
    } else if (mode == "loop-rt"){
      mode = "loop-turn";
    }
  }
  // Check turn number odd or even
  if (i % 2 == 1) {
    let eva = fight(char1, char2, atkStatus[0], i, mode);
    let damage = eva[0];
    miss[0] = eva[1];
    atkStatus[0] = eva[2];
    if (atkStatus[0][6] == true) {
      char1[8][6][1] = true;
    }
    // Insert attack log into log Array
    if (mode == "turn") {
      let btlLog = battleLog(char1, char2, damage, char2[2], miss[0], atkStatus[0], i, mode);
      for(let a = 0; a < btlLog.length; a++) {
        log.push(btlLog[a]);
      }
    }
  } else {
    let eva2 = fight(char2, char1, atkStatus[1], i, mode);
    let damage2 = eva2[0];
    miss[1] = eva2[1];
    atkStatus[1] = eva2[2];
    if (atkStatus[1][6] == true) {
      char2[8][6][1] = true;
    }
    // Insert attack log into log Array
    if (mode == "turn") {
      let btlLog = battleLog(char2, char1, damage2, char1[2], miss[1], atkStatus[1], i, mode);
      for(let b = 0; b < btlLog.length; b++) {
        log.push(btlLog[b]);
      }
    }
  }
  return [log, char1, char2, miss, atkStatus];
}

// Create function to push battle result into log
function resultLog(char1, char2) {
  let log = [];
  if (char1[2] <= 0 && char2[2] > 0) {
    if (char2[8][6][1] == true) {
      log.push("<img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='convert'> " + char2[0] + " has successfully CONVERT " + char1[0] + "! The winner is <img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='" + char2[0].toLowerCase() + "'> " + char2[0] + "!");
    } else {
      log.push("<img src='assets/trophy-symbol.png' alt='win'> " + char1[0] + " is DEAD! The winner is <img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='" + char2[0].toLowerCase() + "'> " + char2[0] + "!");
    }
  } else if (char2[2] <= 0 && char1[2] > 0) {
    if (char1[8][6][1] == true) {
      log.push("<img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='convert'> " + char1[0] + " has successfully CONVERT " + char2[0] + "! The winner is <img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='" + char1[0].toLowerCase() + "'> " + char1[0] + "!");
    } else {
      log.push("<img src='assets/trophy-symbol.png' alt='win'> " + char2[0] + " is DEAD! The winner is <img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='" + char1[0].toLowerCase() + "'> " + char1[0] + "!");
    }
  } else if (char2[2] <= 0 && char1[2] <= 0){
    if (char1[8][6][1] == true) {
      log.push("<img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='convert'> " + char1[0] + " is DEAD but successfully CONVERT " + char2[0] + "! The winner is <img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='" + char1[0].toLowerCase() + "'> " + char1[0] + "!");
    } else if (char2[8][6][1] == true) {
      log.push("<img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='convert'> " + char2[0] + " is DEAD but successfully CONVERT " + char1[0] + "! The winner is <img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='" + char2[0].toLowerCase() + "'> " + char2[0] + "!");
    } else {
      log.push("<img src='assets/death-symbol.png' alt='death'> Both character DEAD! It's a DRAW!");
    }
  } else {
    log.push("<img src='assets/battle-symbol.png' alt='draw'> Both character unable to hurt each other! It's a DRAW!");
  }
  return log;
}

// Create function to push battle result for each round into log
function roundResultLog(char1, char2, round, winner) {
  let log = [];
  let win;

  for(let k = 0; k < round; k++) {
    if (winner[k] == 1) {
      win = "<img src='assets/trophy-symbol.png' alt='win'> The WINNER is <img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='" + char1[0].toLowerCase() + "'> " + char1[0];
    } else if (winner[k] == 2) {
      win = "<img src='assets/trophy-symbol.png' alt='win'> The WINNER is <img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='" + char2[0].toLowerCase() + "'> " + char2[0];
    } else if (winner[k] == 4) {
      win = "<img src='assets/battle-symbol.png' alt='stalemate'> DRAW (Unable to hurt each other)";
    } else {
      win = "<img src='assets/death-symbol.png' alt='death'> DRAW (Both character dead)";
    }
    log.push("<img src='assets/battle-symbol.png' alt='battle'> Round " + (k+1) + "<br>" + win);
  }

  log.push("<br>-----------------------------------------------------------------------------------------------");
  log.push("<br>End Result : ");
  log.push("<img src='assets/" + char1[0].toLowerCase() + "-symbol.png' alt='" + char1[0].toLowerCase() + "'> " + char1[0] + " WIN = " + winner.filter(j => j === 1).length);
  log.push("<img src='assets/" + char2[0].toLowerCase() + "-symbol.png' alt='" + char2[0].toLowerCase() + "'> " + char2[0] + " WIN = " + winner.filter(j => j === 2).length);
  log.push("<img src='assets/battle-symbol.png' alt='stalemate'> DRAW (Both character unable to deal damage) = " + winner.filter(j => j === 4).length);
  log.push("<img src='assets/death-symbol.png' alt='death'> DRAW (Both character dead) = " + winner.filter(j => j === 0).length);
  return log;
}

// Create function to loop until at least one of character have no more HP left
function battleLoop(log, char1, char2, miss, atkStatus, i, mode, basic) {
  // Declare variable to check if both character unable to hurt each other for certain turn
  let t = 0;
  let cloop = [0, char1[2], char2[2]];
  if (mode == "turn" || mode == "loop-turn") {
    t = 11;
  } else if (mode == "rt" || mode == "loop-rt") {
    t = 6;
  }

  // Loop battle until one of character died
  while(char1[2] > 0 && char2[2] > 0) {
    // Print Turn
    if (mode == "turn" || mode == "rt") {
      log.push("Turn " + i);
      log.push("-----------------------------------------------------------------------------------------------");
    }

    // Check mode and if character is Mirror
    let result = [];
    if (char2[0] == "Mirror" || char1[0] == "Mirror" || mode == "turn" || mode == "loop-turn") {
      result = turnBattle(log, char1, char2, miss, atkStatus, i, mode);
    } else {
      result = rtBattle(log, char1, char2, miss, atkStatus, i, mode);
    }

    // Check Rage and Bleeding status
    log = result[0];
    char1 = result[1];
    char2 = result[2];
    miss = result[3];
    atkStatus = result[4];
    let repeatBleed = 0;
    if (atkStatus[0][5][0] == true) {
      char1[8][5][2].forEach(element => {
        if (element[2] == true) {
          repeatBleed += 1;
        }
      });
      if (atkStatus[0][3] == true && atkStatus[0][7] == false) {
        char2[8][3][0] += repeatBleed;
        if (char2[6][4] == true) {
          char2[3] = basic[0][1] + char2[8][4][1] * (char2[8][3][0] + char2[8][3][1]);
          char2[4] = basic[1][1] + char2[8][4][2] * (char2[8][3][0] + char2[8][3][1]);
          char2[5] = basic[2][1] + char2[8][4][3] * (char2[8][3][0] + char2[8][3][1]);
        }
      } else if (atkStatus[0][3] == true && atkStatus[0][7] == true) {
        char1[8][3][1] += repeatBleed;
        if (char1[6][4] == true) {
          char1[3] = basic[0][0] + char1[8][4][1] * (char1[8][3][0] + char1[8][3][1]);
          char1[4] = basic[1][0] + char1[8][4][2] * (char1[8][3][0] + char1[8][3][1]);
          char1[5] = basic[2][0] + char1[8][4][3] * (char1[8][3][0] + char1[8][3][1]);
        }
      }
      if (atkStatus[1][3] == true && atkStatus[1][7] == false) {
        char1[8][3][0] += repeatBleed;
        if (char1[6][4] == true) {
          char1[3] = basic[0][0] + char1[8][4][1] * (char1[8][3][0] + char1[8][3][1]);
          char1[4] = basic[1][0] + char1[8][4][2] * (char1[8][3][0] + char1[8][3][1]);
          char1[5] = basic[2][0] + char1[8][4][3] * (char1[8][3][0] + char1[8][3][1]);
        }
      } else if (atkStatus[1][3] == true && atkStatus[1][7] == true) {
        char2[8][3][1] += repeatBleed;
        if (char2[6][4] == true) {
          char2[3] = basic[0][1] + char2[8][4][1] * (char2[8][3][0] + char2[8][3][1]);
          char2[4] = basic[1][1] + char2[8][4][2] * (char2[8][3][0] + char2[8][3][1]);
          char2[5] = basic[2][1] + char2[8][4][3] * (char2[8][3][0] + char2[8][3][1]);
        }
      }
    } else {
      if (atkStatus[0][3] == true && atkStatus[0][7] == false) {
        char2[8][3][0] += 1;
        if (char2[6][4] == true) {
          char2[3] = basic[0][1] + char2[8][4][1] * (char2[8][3][0] + char2[8][3][1]);
          char2[4] = basic[1][1] + char2[8][4][2] * (char2[8][3][0] + char2[8][3][1]);
          char2[5] = basic[2][1] + char2[8][4][3] * (char2[8][3][0] + char2[8][3][1]);
        }
      } else if (atkStatus[0][3] == true && atkStatus[0][7] == true) {
        char1[8][3][1] += 1;
        if (char1[6][4] == true) {
          char1[3] = basic[0][0] + char1[8][4][1] * (char1[8][3][0] + char1[8][3][1]);
          char1[4] = basic[1][0] + char1[8][4][2] * (char1[8][3][0] + char1[8][3][1]);
          char1[5] = basic[2][0] + char1[8][4][3] * (char1[8][3][0] + char1[8][3][1]);
        }
      }
      if (atkStatus[1][3] == true && atkStatus[1][7] == false) {
        char1[8][3][0] += 1;
        if (char1[6][4] == true) {
          char1[3] = basic[0][0] + char1[8][4][1] * (char1[8][3][0] + char1[8][3][1]);
          char1[4] = basic[1][0] + char1[8][4][2] * (char1[8][3][0] + char1[8][3][1]);
          char1[5] = basic[2][0] + char1[8][4][3] * (char1[8][3][0] + char1[8][3][1]);
        }
      } else if (atkStatus[1][3] == true && atkStatus[1][7] == true) {
        char2[8][3][1] += 1;
        if (char2[6][4] == true) {
          char2[3] = basic[0][1] + char2[8][4][1] * (char2[8][3][0] + char2[8][3][1]);
          char2[4] = basic[1][1] + char2[8][4][2] * (char2[8][3][0] + char2[8][3][1]);
          char2[5] = basic[2][1] + char2[8][4][3] * (char2[8][3][0] + char2[8][3][1]);
        }
      }
    }

    // Add 1 to i for increasing Turn number
    i++;

    // Return all status to false
    miss = [false, false];
    atkStatus = [
      [false, false, false, false, false, [], false, false], 
      [false, false, false, false, false, [], false, false]
    ];
    char1[8][5][2] = [];
    char2[8][5][2] = [];

    // Return status after reflected attack
    if (char1[6][7] == true) {
      char1[8][7][1] = false;
      char1[8][7][2] = 0;
      char1[8][7][3] = false;
    }
    if (char2[6][7] == true) {
      char2[8][7][1] = false;
      char2[8][7][2] = 0;
      char2[8][7][3] = false;
    }

    // Check if both character unable to damage each other after set of turn
    if (char1[2] != cloop[1] && char2[2] != cloop[2]){
      cloop[1] = char1[2];
      cloop[2] = char2[2];
      cloop[0] = i;
    }

    if (i >= t && t - cloop[0] >= t) {
      return log;
    }
  }
  return log;
}

// Create function to start battle
function battle(char1, char2, mode, round) {
  let i = 1;
  let miss = [false, false];
  let atkStatus = [
    [false, false, false, false, false, [], false, false], 
    [false, false, false, false, false, [], false, false]
  ];
  /*
  attack status :
  0 = break
  1 = critical
  2 = instant death
  3 = bleeding
  4 = rage
  5 = repeat
  6 = convert
  7 = reflect
  */
  let title = [];
  let log = [];

  // Declare const of ATK, DEF, and EVA of each character with Rage
  let atk = [0, 0];
  let def = [0, 0];
  let eva = [0, 0];
  let basic = [atk, def, eva];
  if (char1[6][4] == true) {
    atk[0] = parseInt(char1.slice(3, 4));
    def[0] = parseInt(char1.slice(4, 5));
    eva[0] = parseInt(char1.slice(5, 6));
  } 
  if (char2[6][4] == true) {
    atk[1] = parseInt(char2.slice(3, 4));
    def[1] = parseInt(char2.slice(4, 5));
    eva[1] = parseInt(char2.slice(5, 6));
  }

  // Define who fighting
  title.push("<img src='assets/battle-symbol.png' alt='battle'> " + char1[0] + " vs " + char2[0]); 

  // Simulate battle depend on mode (single or multiple round)
  let winner;
  if (mode == "loop-turn" || mode == "loop-rt") {
    winner = [];
    const c1 = [...char1];
    const c2 = [...char2];
    for (let j = 0; j < round; j++) {
      char1 = [...c1];
      char2 = [...c2];
      char1[8][3][0] = 0;
      char1[8][3][1] = 0;
      char2[8][3][0] = 0;
      char2[8][3][1] = 0;
      battleLoop(log, char1, char2, miss, atkStatus, i, mode, basic);
      if (char1[2] <= 0 && char2[2] > 0) {
        winner.push(2);
      } else if (char2[2] <= 0 && char1[2] > 0) {
        winner.push(1);
      } else {
        if (char1[8][6] == true) {
          winner.push(1);
        } else if (char2[8][6] == true) {
          winner.push(2);
        } else if (char1[2] == char1[1] && char2[2] == char2[1]) {
          winner.push(4);
        } else {
          winner.push(0);
        }
      }
    }
  } 
  else {
    const c1 = [...char1];
    const c2 = [...char2];
    char1 = [...c1];
    char2 = [...c2];
    char1[8][3][0] = 0;
    char1[8][3][1] = 0;
    char2[8][3][0] = 0;
    char2[8][3][1] = 0;
    log = battleLoop(log, char1, char2, miss, atkStatus, i, mode, basic);
    if (char1[2] == 0 && char2[2] > 0) {
      winner = 2;
    } else if (char2[2] == 0 && char1[2] > 0) {
      winner = 1;
    } else {
      if (char1[8][6] == true) {
        winner = 1;
      } else if (char2[8][6] == true) {
        winner = 2;
      } else if (char1[2] == char1[1] && char2[2] == char2[1]) {
        winner = 4;
      } else {
        winner = 0;
      }
    }
  }

  // Insert battle result into log Array
  let rl;
  if (mode == "turn" || mode == "rt") {
    rl = resultLog(char1, char2); 
  } else {
    rl = roundResultLog(char1, char2, round, winner);
  }
  for(let c = 0; c < rl.length; c++) {
    log.push(rl[c]);
  }
  
  // Return log
  return [title, log, i, mode, winner];
}