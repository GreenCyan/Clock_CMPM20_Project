use2D = true;
initGame("canvas");

//this line is for test only, comment it out later
currentStats = new gameHackStats();

var INC_RATIO = 1.10;
var MIN_INC = 10;
var DEDUCT_VAR = 0.05;
var MIN_STATS = 1;

var clickables = new Array();
var hackBox = new Sprite();
var input = new Sprite();
var string = "";

var hackBool = false;
/*************************************************************/
/* this function can be ignored as it is just for testing */
LoadContent = function() {
	hackBox.width = 100;
	hackBox.height = 50;
	hackBox.x = 20;
	hackBox.y = 100;
	hackBox.image = Textures.load("http://www.largeyellowbutton.com/largeyellowbutton.jpg");
	clickables.push(hackBox);
	world.addChild(hackBox);
	
	world.addChild(input);
	gInput.addMouseDownListener(input);
	gInput.addKeyboardListener(input);
};
/*************************************************************/
/* this function starts and updates typing */
Hack = {
    boxType: null,
    init: function() {
        //playerStats.init(currentStats.hackCrack);
        playerStats.init(genEnemy(80));
        enemyStats.init(genEnemy(50));
        this.boxType = new TextBox("YOOO");
        this.boxType.fontSize = 50;
        this.boxType.x = 0;
        this.boxType.y = 350;
        world.addChild(this.boxType);
    },
    updateTypeBox: function(string) {
        this.boxType.text = string;
    },
    end: function() {
        playerStats.end();
        enemyStats.end();
		hackBool = false;
    }
};
/*************************************************************/
/* this function stores the player stats and commands */
playerStats = {
	atck: 5,
	def: 10,
	mask: 10,
	init: function(stats) {
		this.atck = stats.attack;
		boxAtck = new TextBox(),
		boxAtck.text = this.atck;
		boxAtck.fontSize = 50;
		boxAtck.x = 250;
		boxAtck.y = 10;
		world.addChild(boxAtck);

		this.def = stats.defense;
		boxDef = new TextBox(),
		boxDef.text = this.def;
		boxDef.fontSize = 50;
		boxDef.x = 250;
		boxDef.y = 70;
		world.addChild(boxDef);

		this.mask = stats.mask;
		boxMsk = new TextBox(),
		boxMsk.text = this.mask;
		boxMsk.fontSize = 50;
		boxMsk.x = 250;
		boxMsk.y = 130;
		world.addChild(boxMsk);

		playerStats.colorClear();
	},
	colorClear: function() {
		boxAtck.color = "#666633";
		boxDef.color = "#666633";
		boxMsk.color = "#666633";
	},
    statUp: function(theStat, box) {
    	//input must be a string: the name of the variable
    	if ((this[theStat] * (INC_RATIO - 1)) >= MIN_INC) this[theStat] = Math.floor(this[theStat] * INC_RATIO);
    	else this[theStat] += MIN_INC;
    	if (box) {
			if (box.color == "#993333") box.color = "#CC9900";
			else box.color = "#009900";
		}
	},
    atckUp: function() {
        // generate number here and update boxAtck
        this.statUp('atck', boxAtck);
        boxAtck.text = this.atck;
    },
    defUp: function() {
        // generate number here and update boxAtck
        this.statUp('def', boxDef);
        boxDef.text = this.def;
    },
    maskUp: function() {
        // generate number here and update boxAtck
        this.statUp('mask', boxMsk);
        boxMsk.text = this.mask;
    },
    enemyLwrAtck: function() {
        enemyStats.selfLwrAtck(20);
    },
    enemyLwrDef: function() {
        enemyStats.selfLwrDef(this.atck);
    },
    enemyLwrSec: function() {
        enemyStats.selfLwrSec(10);
    },
    statDown: function(theStat, deduct, box) {
    	//input must be a string: the name of the variable
    	this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
    	if (this[theStat] < MIN_STATS) {
			if (theStat == 'def' || theStat == 'mask') Hack.end();
			else this[theStat] = MIN_STATS;
    	}
		if (box) {							//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			if (box.color == "#009900") box.color = "#CC9900";
			else box.color = "#993333";
		}
    },
    selfLwrAtck: function(deduct) {
        this.statDown('atck', deduct, boxAtck);		//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        boxAtck.text = this.atck;
    },
    selfLwrDef: function(deduct) {
        this.statDown('def', deduct, boxDef);		//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        boxDef.text = this.def;
    },
    selfLwrMsk: function(deduct) {
        this.statDown('mask', deduct, boxMsk);		//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        boxMsk.text = this.mask;
    },
	end: function() {
		boxAtck.remove();
		boxDef.remove();
		boxMsk.remove();
	}
};
/*************************************************************/
/* this function stores enemy stats and commands */
enemyStats = {
	atck: 5,
	def: 10,
	sec: 10,
	init: function(stats) {
		this.atck = stats.attack;
		box2Atck = new TextBox(),
		box2Atck.text = this.atck;
		box2Atck.fontSize = 50;
		box2Atck.x = 350;
		box2Atck.y = 10;
		world.addChild(box2Atck);

		this.def = stats.defense;
		box2Def = new TextBox(),
		box2Def.text = this.def;
		box2Def.fontSize = 50;
		box2Def.x = 350;
		box2Def.y = 70;
		world.addChild(box2Def);

		this.sec = stats.mask;
		box2Sec = new TextBox(),
		box2Sec.text = this.sec;
		box2Sec.fontSize = 50;
		box2Sec.x = 350;
		box2Sec.y = 130;
		world.addChild(box2Sec);

		enemyStats.colorClear();
	},
	colorClear: function() {
		box2Atck.color = "#666633";
		box2Def.color = "#666633";
		box2Sec.color = "#666633";
	},
    statUp: function(theStat, box) {
    	//input must be a string: the name of the variable
    	if ((this[theStat] * (INC_RATIO - 1)) >= MIN_INC) this[theStat] = Math.floor(this[theStat] * INC_RATIO);
    	else this[theStat] += MIN_INC;
		if (theStat == 'sec') {
			if (this[theStat] >= 100) Hack.end();
    	}
		if (box) {
			if (box.color == "#993333") box.color = "#CC9900";
			else box.color = "#009900";
		}
    },
    atckUp: function() {
        // generate number here and update boxAtck
        this.statUp('atck', box2Atck);
        box2Atck.text = this.atck;
    },
    defUp: function() {
        // generate number here and update boxAtck
        this.statUp('def', box2Def);
        box2Def.text = this.def;
    },
    secUp: function() {
        // generate number here and update boxAtck
        this.statUp('sec', box2Sec);
        box2Sec.text = this.sec;
    },
    enemyLwrAtck: function() {
        playerStats.selfLwrAtck(20);
    },
    enemyLwrDef: function() {
        playerStats.selfLwrDef(this.atck);
    },
    enemyLwrMsk: function() {
        playerStats.selfLwrMsk(10);
    },
    statDown: function(theStat, deduct, box) {
    	//input must be a string: the name of the variable
    	this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
		if (this[theStat] < MIN_STATS) {
			if (theStat == 'def') Hack.end();
			else this[theStat] = MIN_STATS;
    	}
		if (box) {
			if (box.color == "#009900") box.color = "#CC9900";
			else box.color = "#993333";
		}
    },
	// this function has the enemyAI make intelligent decisions
	intelligence: function() {
		if (this.atck > playerStats.def) {
			this.enemyLwrDef();
		} else if (this.atck < playerStats.atck) {
			this.enemyLwrAtck();
		} else if (this.sec < playerStats.mask) {
			this.enemyLwrMsk();
		} else if (this.def < playerStats.atck) {
			this.defUp();
		} else if (this.def > playerStats.def) {
			this.atckUp();
		} else {
			this.secUp();
		}
	},
    selfLwrAtck: function(deduct) {
        this.statDown('atck', deduct, box2Atck);
        box2Atck.text = this.atck;
    },
    selfLwrDef: function(deduct) {
        this.statDown('def', deduct, box2Def);
        box2Def.text = this.def;
    },
    selfLwrSec: function(deduct) {
        this.statDown('sec', deduct, box2Sec);
        box2Sec.text = this.sec;
    },
	end: function() {
		box2Atck.remove();
		box2Def.remove();
		box2Sec.remove();
	}
};

var enemyActions = [
	enemyStats['atckUp'],
	enemyStats['defUp'],
	enemyStats['secUp'],
	enemyStats['enemyLwrAtck'],
	enemyStats['enemyLwrDef'],
	enemyStats['enemyLwrMsk']
];

for (var i = 0; i < 5; i++) {
	enemyActions.push(enemyStats['intelligence'])
}

function Collision(obj, mouseX, mouseY) {
	var left = obj.x;
	var right = obj.x + obj.width;
	var top = obj.y;
	var bot = obj.y + obj.height;
	if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bot) {
		return true;
	}
	return false;
}
/*************************************************************/
/* this function reads and updates inputs the user produces */
function InputsUpdate() {
	input.onMouseDown = function(button) {
		for (var click in clickables) {
			click = clickables[click];
			if (Collision(click, gInput.mouse.x, gInput.mouse.y)) {
				Hack.init();
				hackBool = true;
			}
		}
	};
	input.onKeyDown = function(key) {
		var char = String.fromCharCode(key);
		if (hackBool == true) {
			switch (key) {
				case 13:
					if (string.localeCompare("ATCKUP") == 0 || string.localeCompare("ATTACKUP") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.atckUp();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("ATCK") == 0 || string.localeCompare("ATTACK") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.enemyLwrDef();
						//condition to increase enemy stat depending on player stat
					}  else if (string.localeCompare("ATCKDOWN") == 0 || string.localeCompare("ATTACKDOWN") == 0 || 
						string.localeCompare("ATCKDWN") == 0 || string.localeCompare("ATTACKDWN") == 0 || 
						string.localeCompare("ATCKDN") == 0 || string.localeCompare("ATTACKDN") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.enemyLwrAtck();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("DEFUP") == 0 || string.localeCompare("DEFENSEUP") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.defUp();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("MASKUP") == 0 || string.localeCompare("MSKUP") == 0 || 
						string.localeCompare("MSK") == 0 || string.localeCompare("MASK") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.maskUp();
						//condition to increase enemy stat depending on player stat
					} else if (string.localeCompare("SECDOWN") == 0 || string.localeCompare("SCDOWN") == 0 || 
						string.localeCompare("SECDWN") == 0 || string.localeCompare("SCDWN") == 0 || 
						string.localeCompare("SECDN") == 0 || string.localeCompare("SCDN") == 0) {
						playerStats.colorClear();
						enemyStats.colorClear();
						playerStats.enemyLwrSec();
						//condition to increase enemy stat depending on player stat
					} else {
						playerStats.colorClear();
						enemyStats.colorClear();
						//condition to increase enemy stat depending on player stat
					}
					enemyActions[Math.floor(Math.random() * enemyActions.length)].call(enemyStats);
					string = "";
					break;
				default:
					if (string.charAt(0) == 0) string = string.substring(1);
					if (key == 8) string = string.substring(0, string.length - 1);
					else string += char;
					break;
			}
			Hack.updateTypeBox(string);
		}
	};
	Update();
}
Update = function() {
	InputsUpdate();
};
//*/
LoadContent();
Update();
