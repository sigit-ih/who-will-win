// Declare variable for initial function
const year = new Date().getFullYear();
let modeChoose;
let p = [];

// Function to create footer
function initialSetting() {
  // Disable fight and round button of custom match before select character and mode
  document.getElementsByClassName("fight custom0")[0].disabled = true;
  document.getElementsByClassName("round custom0")[0].disabled = true;

  // Create footer
  document.getElementsByTagName("footer")[0].innerHTML = "<h6>" + year + " | Made by <a href='github.com/sigit-ih' target='_blank'>Sigit Ispramono Hadi</a></h6>";
}

// Run initial function when website started
window.onload = initialSetting();

// Create function to scroll to the very bottom of element
function scrollToBottom(el, nc) {
  el[nc].scrollTop = el[nc].scrollHeight;
}

// Function to setting tab
function openContent(evt, contentName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("main-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(contentName).style.display = "flex";
  evt.currentTarget.className += " active";
}

// Function to convert name from select into variable char
function nameToChar (arr) {
  let i = 0;
  let pl = [];
  arr.forEach(nam => {
    if (nam == "Minotaur") {
      pl[i] = char[0];
    } else if (nam == "Kobold") {
      pl[i] = char[1];
    } else if (nam == "Knight") {
      pl[i] = char[2];
    } else if (nam == "Dragon") {
      pl[i] = char[3];
    } else if (nam == "Wolf") {
      pl[i] = char[4];
    } else if (nam == "Sheep") {
      pl[i] = char[5];
    } else if (nam == "Peasant") {
      pl[i] = char[6];
    } else if (nam == "Werewolf") {
      pl[i] = char[7];
    } else if (nam == "Mage") {
      pl[i] = char[8];
    } else if (nam == "Mirror") {
      pl[i] = char[9];
    } 
    i++;
  });
  return pl;
}

// Function to choose player and mode
function selectChar() {
  // Delete previous content
  document.getElementById("rule-list").innerHTML = "";
  document.getElementsByClassName("content-stats")[10].innerHTML = "<div class='stats-desc'><div class='stats-icon'><img src='assets/health-symbol.png' alt='hp' title='HP'></div><div class='stats-num'><h3 id='hp1'></h3></div></div><div class='stats-desc'><div class='stats-icon'><img src='assets/attack-symbol.png' alt='atk' title='ATK'></div><div class='stats-num'><h3 id='atk1'></h3></div></div><div class='stats-desc'><div class='stats-icon'><img src='assets/defense-symbol.png' alt='def' title='DEF'></div><div class='stats-num'><h3 id='def1'></h3></div></div><div class='stats-desc'><div class='stats-icon'><img src='assets/evasion-symbol.png' alt='eva' title='EVA'></div><div class='stats-num'><h3 id='eva1'></h3></div></div>";
  document.getElementsByClassName("content-stats")[11].innerHTML = "<div class='stats-desc'><div class='stats-icon'><img src='assets/health-symbol.png' alt='hp' title='HP'></div><div class='stats-num'><h3 id='hp2'></h3></div></div><div class='stats-desc'><div class='stats-icon'><img src='assets/attack-symbol.png' alt='atk' title='ATK'></div><div class='stats-num'><h3 id='atk2'></h3></div></div><div class='stats-desc'><div class='stats-icon'><img src='assets/defense-symbol.png' alt='def' title='DEF'></div><div class='stats-num'><h3 id='def2'></h3></div></div><div class='stats-desc'><div class='stats-icon'><img src='assets/evasion-symbol.png' alt='eva' title='EVA'></div><div class='stats-num'><h3 id='eva2'></h3></div></div>";
  
  // Declare statIns variable
  let statIns;

  // Change p and modeChoose value from select
  p = [document.getElementById("player1").value, document.getElementById("player2").value];
  modeChoose = document.getElementById("mode").value;

  // Run nameToChar function to obtain char variable
  statIns = nameToChar(p);

  // Insert title of the match
  document.getElementById("content-title-choose").innerHTML = "<h1>" + p[0] + " vs " + p[1] + "</h1>";

  // Change player logo and stats
  document.getElementsByClassName("logo")[10].innerHTML = "<img src='assets/" + p[0].toLowerCase() + "-symbol.png' alt='" + p[0].toLowerCase() + "'>";
  document.getElementsByClassName("logo")[11].innerHTML = "<img src='assets/" + p[1].toLowerCase() + "-symbol.png' alt='" + p[1].toLowerCase() + "'>";
  document.getElementById("hp1").innerHTML = statIns[0][1];
  document.getElementById("atk1").innerHTML = statIns[0][3];
  document.getElementById("def1").innerHTML = statIns[0][4];
  document.getElementById("eva1").innerHTML = statIns[0][5];
  document.getElementById("hp2").innerHTML = statIns[1][1];
  document.getElementById("atk2").innerHTML = statIns[1][3];
  document.getElementById("def2").innerHTML = statIns[1][4];
  document.getElementById("eva2").innerHTML = statIns[1][5];

  // Insert character modifier into stats
  // Character 1
  if (statIns[0][6][0] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/defense-break-symbol.png' alt='defbreak' title='Defense Break'></div><div class='stats-num'><h3>" + statIns[0][8][0][0] + "</h3></div></div>";
  }
  if (statIns[0][6][1] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/critical-symbol.png' alt='crit' title='Critical Attack'></div><div class='stats-num'><h3>" + statIns[0][8][1][0] + "%, " + statIns[0][8][1][1] + "x <span><img class='span-icon' src='assets/damage-symbol.png' alt='dmg' title='Damage'></span></h3></div></div>";
  }
  if (statIns[0][6][2] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/instant-death-symbol.png' alt='instadeath' title='Instant Death'></div><div class='stats-num'><h3>" + statIns[0][8][2][0] + "%</h3></div></div>";
  }
  if (statIns[0][6][3] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/bleeding-symbol.png' alt='bleed' title='Bleeding'></div><div class='stats-num'><h3>" + statIns[0][8][3][2] + "%, " + statIns[0][8][3][3] + " <span><img class='span-icon' src='assets/damage-symbol.png' alt='dmg' title='Damage'></span> per Turn</h3></div></div>";
  }
  if (statIns[0][6][4] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/rage-symbol.png' alt='rage' title='Rage'></div><div class='stats-num'><h3>Increase " + statIns[0][8][4][1] + " <span><img class='span-icon' src='assets/attack-symbol.png' alt='atk' title='ATK'></span>, " + statIns[0][8][4][2] + " <span><img class='span-icon' src='assets/defense-symbol.png' alt='def' title='DEF'></span>, and " + statIns[0][8][4][3] + "% <span><img class='span-icon' src='assets/evasion-symbol.png' alt='eva' title='EVA'></span> per <span><img class='span-icon' src='assets/bleeding-symbol.png' alt='bleed' title='Bleeding'></span> Bleeding level</h3></div></div>";
  }
  if (statIns[0][6][5] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/repeat-attack-symbol.png' alt='repeat' title='Repeated Attack'></div><div class='stats-num'><h3>" + statIns[0][8][5][0] + "%, " + statIns[0][8][5][1] + " times in a row (still takes into account <span><img class='span-icon' src='assets/evasion-symbol.png' alt='eva' title='EVA'></span> Evasion)</h3></div></div>";
  }
  if (statIns[0][6][6] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/werewolf-symbol.png' alt='convert' title='Convert'></div><div class='stats-num'><h3>" + statIns[0][8][6][0] + "% (after <span><img class='span-icon' src='assets/defense-break-symbol.png' alt='defbreak' title='Defense Break'></span> Defense Break)</h3></div></div>";
  }
  if (statIns[0][6][7] == true) {
    document.getElementsByClassName("content-stats")[10].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/reflect-symbol.png' alt='reflect' title='Reflect'></div><div class='stats-num'><h3>" + statIns[0][8][7][0] + "%</h3></div></div>";
  }
  // Character 2
  if (statIns[1][6][0] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/defense-break-symbol.png' alt='defbreak' title='Defense Break'></div><div class='stats-num'><h3>" + statIns[1][8][0][0] + "</h3></div></div>";
  }
  if (statIns[1][6][1] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/critical-symbol.png' alt='crit' title='Critical Attack'></div><div class='stats-num'><h3>" + statIns[1][8][1][0] + "%, " + statIns[1][8][1][1] + "x <span><img class='span-icon' src='assets/damage-symbol.png' alt='dmg' title='Damage'></span></h3></div></div>";
  }
  if (statIns[1][6][2] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/instant-death-symbol.png' alt='instadeath' title='Instant Death'></div><div class='stats-num'><h3>" + statIns[1][8][2][0] + "%</h3></div></div>";
  }
  if (statIns[1][6][3] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/bleeding-symbol.png' alt='bleed' title='Bleeding'></div><div class='stats-num'><h3>" + statIns[1][8][3][2] + "%, " + statIns[1][8][3][3] + " <span><img class='span-icon' src='assets/damage-symbol.png' alt='dmg' title='Damage'></span> per Turn</h3></div></div>";
  }
  if (statIns[1][6][4] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/rage-symbol.png' alt='rage' title='Rage'></div><div class='stats-num'><h3>Increase " + statIns[1][8][4][1] + " <span><img class='span-icon' src='assets/attack-symbol.png' alt='atk' title='ATK'></span>, " + statIns[1][8][4][2] + " <span><img class='span-icon' src='assets/defense-symbol.png' alt='def' title='DEF'></span>, and " + statIns[1][8][4][3] + "% <span><img class='span-icon' src='assets/evasion-symbol.png' alt='eva' title='EVA'></span> per <span><img class='span-icon' src='assets/bleeding-symbol.png' alt='bleed' title='Bleeding'></span> Bleeding level</h3></div></div>";
  }
  if (statIns[1][6][5] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/repeat-attack-symbol.png' alt='repeat' title='Repeated Attack'></div><div class='stats-num'><h3>" + statIns[1][8][5][0] + "%, " + statIns[1][8][5][1] + " times in a row (still takes into account <span><img class='span-icon' src='assets/evasion-symbol.png' alt='eva' title='EVA'></span> Evasion)</h3></div></div>";
  }
  if (statIns[1][6][6] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/werewolf-symbol.png' alt='convert' title='Convert'></div><div class='stats-num'><h3>" + statIns[1][8][6][0] + "% (after <span><img class='span-icon' src='assets/defense-break-symbol.png' alt='defbreak' title='Defense Break'></span> Defense Break)</h3></div></div>";
  }
  if (statIns[1][6][7] == true) {
    document.getElementsByClassName("content-stats")[11].innerHTML += "<div class='stats-desc'><div class='stats-icon'><img src='assets/reflect-symbol.png' alt='reflect' title='Reflect'></div><div class='stats-num'><h3>" + statIns[1][8][7][0] + "%</h3></div></div>";
  }

  // Insert rule to rule-list
  document.getElementById("rule-list").innerHTML += "<li>Damage = &nbsp;<span><img class='span-icon' src='assets/attack-symbol.png' alt='ATK' title='ATK'></span>&nbsp; - &nbsp;<span><img class='span-icon' src='assets/defense-symbol.png' alt='def' title='DEF'></span></li>";
  if (modeChoose == "rt") {
    if (p[0] == "Mirror" || p[1] == "Mirror") {
      document.getElementById("mode").value = "turn";
      if (p[0] == "Mirror") {
        document.getElementById("rule-list").innerHTML += "<li>Turn-based, " + p[1] + " begins first</li>";
      } else {
        document.getElementById("rule-list").innerHTML += "<li>Turn-based, " + p[0] + " begins first</li>";
      }
    } else {
      document.getElementById("rule-list").innerHTML += "<li>Both character attack simultaneously</li>";
    }
  } else {
    if (p[0] == "Mirror") {
      document.getElementById("rule-list").innerHTML += "<li>Turn-based, " + p[1] + " begins first</li>";
    } else {
      document.getElementById("rule-list").innerHTML += "<li>Turn-based, " + p[0] + " begins first</li>";
    }
  }
  if (statIns[0][6][3] == true) {
    document.getElementById("rule-list").innerHTML += "<li>A bleeding wound from " + statIns[0][0] + " causes " + statIns[0][8][3][3] + " &nbsp;<span><img class='span-icon' src='assets/damage-symbol.png' alt='dmg' title='Damage'></span>&nbsp; per turn and lasts forever, damage starts ticking in the next turn after wound is inflicted</li>";
  }
  if (statIns[1][6][3] == true) {
    document.getElementById("rule-list").innerHTML += "<li>A bleeding wound from " + statIns[1][0] + " causes " + statIns[1][8][3][3] + " &nbsp;<span><img class='span-icon' src='assets/damage-symbol.png' alt='dmg' title='Damage'></span>&nbsp; per turn and lasts forever, damage starts ticking in the next turn after wound is inflicted</li>";
  }
  if (statIns[0][6][4] == true && (statIns[1][6][3] == true || (statIns[0][6][3] == true && statIns[1][6][7] == true))) {
    document.getElementById("rule-list").innerHTML += "<li>Each bleeding wound boosts the " + statIns[0][0] + "'s &nbsp;<span><img class='span-icon' src='assets/attack-symbol.png' alt='atk' title='ATK'></span>&nbsp; by " + statIns[0][8][4][1] + ", &nbsp;<span><img class='span-icon' src='assets/defense-symbol.png' alt='def' title='DEF'></span>&nbsp; by " + statIns[0][8][4][2] + " and gives it a " + statIns[0][8][4][3] + "% bonus chance to &nbsp;<span><img class='span-icon' src='assets/evasion-symbol.png' alt='eva' title='EVA'></span></li>";
  }
  if (statIns[1][6][4] == true && (statIns[0][6][3] == true || (statIns[1][6][3] == true && statIns[0][6][7] == true))) {
    document.getElementById("rule-list").innerHTML += "<li>Each bleeding wound boosts the " + statIns[1][0] + "'s &nbsp;<span><img class='span-icon' src='assets/attack-symbol.png' alt='atk' title='ATK'></span>&nbsp; by " + statIns[1][8][4][1] + ", &nbsp;<span><img class='span-icon' src='assets/defense-symbol.png' alt='def' title='DEF'></span>&nbsp; by " + statIns[1][8][4][2] + " and gives it a " + statIns[1][8][4][3] + "% bonus chance to &nbsp;<span><img class='span-icon' src='assets/evasion-symbol.png' alt='eva' title='EVA'></span></li>";
  }
  if (statIns[0][6][3] == true || statIns[1][6][3] == true) {
    document.getElementById("rule-list").innerHTML += "<li>Whoever kills the other first is considered the winner, regardless of what happens after the battle</li>";
    if (statIns[0][6][3] == true && statIns[1][0] == "Sheep") {
      document.getElementById("rule-list").innerHTML += "<li>The " + statIns[1][0] + " has accepted his death as the most likely outcome, but he's determined to kill the " + statIns[0][0] + " before bleeding out</li>";
    } else if (statIns[1][6][3] == true && statIns[0][0] == "Sheep") {
      document.getElementById("rule-list").innerHTML += "<li>The " + statIns[0][0] + " has accepted his death as the most likely outcome, but he's determined to kill the " + statIns[1][0] + " before bleeding out</li>";
    }
  }
  if (statIns[0][6][6] == true && statIns[1][7].filter(n => n === "Mechanical").length == 0) {
    document.getElementById("rule-list").innerHTML += "<li>If " + statIns[1][0] + " turns into " + statIns[0][0] + ", " + statIns[1][0] + " loses immediately</li>";
  }
  if (statIns[1][6][6] == true && statIns[0][7].filter(n => n === "Mechanical").length == 0) {
    document.getElementById("rule-list").innerHTML += "<li>If " + statIns[0][0] + " turns into " + statIns[1][0] + ", " + statIns[0][0] + " loses immediately</li>";
  }
  if (statIns[0][6][7] == true || statIns[1][6][7] == true) {
    document.getElementById("rule-list").innerHTML += "<li>Attack is not affected by reflection</li>";
  }
  if (statIns[0][0] == "Mirror" || statIns[1][0] == "Mirror") {
    let tn = "";
    if (statIns[0][0] == "Mirror") {
      tn = statIns[0][0];
    } else {
      tn = statIns[1][0];
    }
    document.getElementById("rule-list").innerHTML += "<li>" + tn + " is a magic mirror so it's immune to physical attacks</li>";
  }
  if (statIns[0][0] == "Mage" || statIns[1][0] == "Mage") {
    let tn = "";
    if (statIns[0][0] == "Mage") {
      tn = statIns[0][0];
    } else {
      tn = statIns[1][0];
    }
    document.getElementById("rule-list").innerHTML += "<li>" + tn + " sucks and only knows one spell : lightning bolt</li>";
  }

  // Reset disabled button and log
  let nameClass = "custom0";
  let fightBtn = "fight " + nameClass;
  let roundBtn = "round " + nameClass;
  let inputCount = "input " + nameClass;
  let inputWarning = "input-warning " + nameClass;
  let logTitle = "log-title " + nameClass;
  let logBattle = "log-battle " + nameClass;

  document.getElementsByClassName(logTitle)[0].innerHTML = "";
  document.getElementsByClassName(logBattle)[0].innerHTML = "";
  document.getElementsByClassName(inputCount)[0].value = "";
  document.getElementsByClassName(inputWarning)[0].innerHTML = "";
  document.getElementsByClassName(fightBtn)[0].disabled = false;
  document.getElementsByClassName(roundBtn)[0].disabled = false;
}

// Function to check if value is truly number
function isNum(val) {
  return /^\d+$/.test(val);
}

// Function to simulate battle between character 1 and character 2
function runBattleSimulation(elem) {
  // Declare variable for button, input, warning, and log scroll
  let nameClass = elem.className[6] + elem.className[7];
  if (isNum(nameClass) == false) {
    nameClass = elem.className.slice(6, 13);
  }
  let inputCount = "input " + nameClass;
  let inputWarning = "input-warning " + nameClass;
  let logTitle = "log-title " + nameClass;
  let logBattle = "log-battle " + nameClass;
  let logScroll = document.getElementsByClassName("log-battle");

  // Decide player and mode value from button class
  let player = [];
  if (nameClass == "01") {
    player[0] = char[0];
    player[1] = char[1];
    if (elem.className.slice(0, 5) == "fight") {
      mode = "rt";
    } else if (elem.className.slice(0, 5) == "round") {
      mode = "loop-rt";
    }
  } else if (nameClass == "02") {
    player[0] = char[2];
    player[1] = char[3];
    if (elem.className.slice(0, 5) == "fight") {
      mode = "rt";
    } else if (elem.className.slice(0, 5) == "round") {
      mode = "loop-rt";
    }
  } else if (nameClass == "03") {
    player[0] = char[4];
    player[1] = char[5];
    if (elem.className.slice(0, 5) == "fight") {
      mode = "rt";
    } else if (elem.className.slice(0, 5) == "round") {
      mode = "loop-rt";
    }
  } else if (nameClass == "04") {
    player[0] = char[6];
    player[1] = char[7];
    if (elem.className.slice(0, 5) == "fight") {
      mode = "rt";
    } else if (elem.className.slice(0, 5) == "round") {
      mode = "loop-rt";
    }
  } else if (nameClass == "05") {
    player[0] = char[8];
    player[1] = char[9];
    if (elem.className.slice(0, 5) == "fight") {
      mode = "turn";
    } else if (elem.className.slice(0, 5) == "round") {
      mode = "loop-turn";
    }
  } else if (nameClass == "custom0") {
    // Run nameToChar function to obtain char variable
    player = nameToChar(p);

    if (elem.className.slice(0, 5) == "fight") {
      // Change mode if char1 or char2 is Mirror
      if (player[0][0] == "Mirror" || player[1][0] == "Mirror") {
        mode = "turn";
      } else {
        mode = modeChoose;
      }
    } else if (elem.className.slice(0, 5) == "round") {
      // Change mode if char1 or char2 is Mirror
      if (player[0][0] == "Mirror" || player[1][0] == "Mirror") {
        mode = "loop-turn";
      } else if (modeChoose == "rt") {
        mode = "loop-rt";
      } else {
        mode = "loop-turn";
      }
    }
  }

  // Declare value of input into val
  let val = document.getElementsByClassName(inputCount)[0].value;
  //let isnum = isNum(val);

  // Reset log and disable button when clicked
  if (elem.className.slice(0, 5) == "fight") {
    document.getElementsByClassName(logTitle)[0].innerHTML = "";
    document.getElementsByClassName(logBattle)[0].innerHTML = "";
    document.getElementsByClassName(inputCount)[0].value = "";
    document.getElementsByClassName(inputWarning)[0].innerHTML = "";
  } else if (elem.className.slice(0, 5) == "round") {
    // Check if input is empty or not number
    if (val == "") {
      return document.getElementsByClassName(inputWarning)[0].innerHTML = "Input number required!";
    } else if (isNum(val) == false) {
      return document.getElementsByClassName(inputWarning)[0].innerHTML = "Input must be number!";
    }
    document.getElementsByClassName(logTitle)[0].innerHTML = "";
    document.getElementsByClassName(logBattle)[0].innerHTML = "";
    document.getElementsByClassName(inputWarning)[0].innerHTML = "";
  }
  
  // For battle with multiple round, take round from input
  let round = 1;
  if (mode == "loop-rt" || mode == "loop-turn") {
    round = document.getElementsByClassName(inputCount)[0].value;
  }

  // Run battle simulation with battle function
  if (player[0] == "Mirror" && player[1] != "Mirror") {
    let temp;
    temp = player[0];
    player[0] = player[1];
    player[1] = temp;
  }
  let battleResult = battle(player[0], player[1], mode, round);
  let title = battleResult[0];
  let log = battleResult[1];
  let turn = battleResult[2];
  mode = battleResult[3];
  let win = battleResult[4];
  let j = 1;
  let k = "";

  // Reset input value
  if (elem.className.slice(0, 5) == "round") {
    document.getElementsByClassName(inputCount)[0].value = "";
  }

  // Print title
  document.getElementsByClassName(logTitle)[0].innerHTML += title;

  // Decide if battle is turn based or real time
  if (mode == "turn") {
    k = 4;
  } else if (mode == "rt") {
    k = 6;
  }

  // Declare elm value for bottom scroll index depend if the match is custom or not
  let elm = nameClass;
  if (isNum(elm) == true) {
    elm = parseInt(nameClass) - 1;
  } else if (elm == "custom0") {
    elm = 5;
  }

  // Print battle log and set timeout
  for(let i = 0; i < log.length; i++) {
    setTimeout(function () {
      if((i+1) % k == 0) {
        document.getElementsByClassName(logBattle)[0].innerHTML += log[i] + "<br><br><br>";
        scrollToBottom(logScroll, elm);
        j++;
      } else {
        document.getElementsByClassName(logBattle)[0].innerHTML += log[i] + "<br>";
        scrollToBottom(logScroll, elm);
      }
    }, 50 * i);
  }
}