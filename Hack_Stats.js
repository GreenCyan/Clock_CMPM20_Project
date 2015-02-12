// general rule of thumb: anything that carries across days or should be saved goes here

// Stats that affect hacking
var crackStats = function(atck, def, spd, msk) {
  this.attack = atck;
  this.defense = def;
  this.speed = spd;
  this.mask = msk;
};

var gameHackStats = function() {
  // important stats
  
  // Current day. Every week starts with Monday
  this.theDay = 0;
  // positive numbers closer to government, negative numbers closer to freedom fighters
  this.govAlignment = 30;
  // The hacker's budget
  this.money = 100;
  // The hacker's hacking stats
  this.hackCrack = new crackStats(5, 5, 5, 5);
  
  // other stats
  
  // Targets Hacked
  this.targetNum = 0;
  // Successful Hacks
  this.winNum = 0;
  // Times Caught
  this.loseNum = 0;
  // Money Earned
  this.totalEarn = 0;
  

};

// current game stats
var currentStats = null;

// saved game stats
var saveStats = [];
for (var i = 0; i < 10; i++) {
	saveStats.push([]);
}

// Stat functions

// generate enemy stats
var genEnemy = function(difficulty) {
  var genArr = [];
  for (var i = 0; i < 4; i++) { genArr.push(Math.floor(difficulty + (Math.random() * difficulty) ) ) }
  return new crackStats(genArr[0], genArr[1], genArr[2], genArr[3]);
};

// loads saved game from loadStats or starts new game if loadStats is empty
function startGame(loadStats) {
  if (loadStats == null) {
    currentStats = new gameHackStats();
	return;
  } else if (!(typeof loadStats == 'gameHackStats')) {
    window.alert('Error: Incompatible object. Cannot load game.');
    return;
  } currentStats = loadStats;
};

// adds save game data to saveStats
function saveGame() {
};

// deletes save data from saveStats and pushes down save data indexed above the deleted data
function deleteSave() {
};