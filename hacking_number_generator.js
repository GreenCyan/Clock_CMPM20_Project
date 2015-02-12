use2D = true;
initGame("canvas");

//this line is for test only, comment it out later
currentStats = new gameHackStats();

var INC_RATIO = 1.5;
var MIN_INC = 20;
var DEDUCT_VAR = 0.1;
var MIN_STATS = 5;

var clickables = new Array();
var status = new TextBox("Status: ");
var hackBox = new Sprite();
var input = new Sprite();
var string = "";
/*************************************************************/
/* this function can be ignored as it is just for testing */
LoadContent = function() {
	status.center = false;
	status.fontSize = 40;
	status.color = "#660033";
	
	status.drawBG = true;
	status.bgColor = "#FFFFCC";
	status.border = 10;
	
	status.borderColor = "#333300";
	status.padTop = 10;
	status.padBottom = 10;
	status.padLeft = 10;
	status.padRight = 10;
	status.alpha = 0.7;
	world.addChild(status);
	
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
        playerStats.init(currentStats.hackCrack);
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
	},
    statUp: function(theStat) {
    	//input must be a string: the name of the variable
    	if ( ( this[theStat] * (INC_RATIO - 1) ) >= MIN_INC){
    		this[theStat] = Math.floor(this[theStat] * INC_RATIO);
    	} else {
    		this[theStat] += MIN_INC;
    	}
    },
    atckUp: function() {
        // generate number here and update boxAtck
        this.statUp('atck');
        boxAtck.text = this.atck;
    },
    defUp: function() {
        // generate number here and update boxAtck
        this.statUp('def');
        boxDef.text = this.def;
    },
    maskUp: function() {
        // generate number here and update boxAtck
        this.statUp('mask');
        boxMsk.text = this.mask;
    },
    enemyLwrAtck: function() {
        enemyStats.selfLwrAtck(this.atck);
    },
    enemyLwrDef: function() {
        enemyStats.selfLwrDef(this.atck);
    },
    enemyLwrSec: function() {
        enemyStats.selfLwrSec(this.mask);
    },
	statDown: function(theStat, deduct) {
    	//input must be a string: the name of the variable
	this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
	if (this[theStat] < MIN_STATS) {
		this[theStat] = MIN_STATS;
	}
    },
    statDown: function(theStat, deduct) {
    	//input must be a string: the name of the variable
    	this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
    	if (this[theStat] < MIN_STATS) {
    		this[theStat] = MIN_STATS;
    	}
    },
    selfLwrAtck: function(deduct) {
        this.statDown('atck', deduct);
        boxAtck.text = this.atck;
    },
    selfLwrDef: function(deduct) {
        this.statDown('def', deduct);
        boxDef.text = this.def;
    },
    selfLwrMsk: function(deduct) {
        this.statDown('mask', deduct);
        boxDef.text = this.mask;
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
	},
    statUp: function(theStat) {
    	//input must be a string: the name of the variable
    	if ( ( this[theStat] * (INC_RATIO - 1) ) >= MIN_INC){
    		this[theStat] = Math.floor(this[theStat] * INC_RATIO);
    	} else {
    		this[theStat] += MIN_INC;
    	}
    },
    atckUp: function() {
        // generate number here and update boxAtck
        this.statUp('atck');
        box2Atck.text = this.atck;
    },
    defUp: function() {
        // generate number here and update boxAtck
        this.statUp('def');
        box2Def.text = this.def;
    },
    secUp: function() {
        // generate number here and update boxAtck
        this.statUp('sec');
        box2Sec.text = this.sec;
    },
    enemyLwrAtck: function() {
        playerStats.selfLwrAtck(this.atck);
    },
    enemyLwrDef: function() {
        playerStats.selfLwrDef(this.atck);
    },
    enemyLwrMsk: function() {
        //enemyStats.selfLwrMsk(this.sec);
    },
    statDown: function(theStat, deduct) {
    	//input must be a string: the name of the variable
    	this[theStat] -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
    	if (this[theStat] < MIN_STATS) {
    		this[theStat] = MIN_STATS;
    	}
    },
    selfLwrAtck: function(deduct) {
        this.statDown('atck', deduct);
        box2Atck.text = this.atck;
    },
    selfLwrDef: function(deduct) {
        this.statDown('def', deduct);
        box2Def.text = this.def;
    },
    selfLwrSec: function(deduct) {
        this.statDown('sec', deduct);
        box2Def.text = this.sec;
    }
};
function Collision(obj, mouseX, mouseY) {
	var left = obj.x;
	var right = obj.x + obj.width;
	var top = obj.y;
	var bot = obj.y + obj.height;
	if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bot) {
		return true;
	}
	status.text = "Click: No";
	return false;
}
/*************************************************************/
/* this function reads and updates inputs the user produces */
function InputsUpdate() {
	input.onMouseDown = function(button) {
		for (var click in clickables) {
			click = clickables[click];
			if (Collision(click, gInput.mouse.x, gInput.mouse.y)) {
				status.text = "Click: Yes";
                Hack.init();
			}
		}
	};
    input.onKeyDown = function(key) {
        var char = String.fromCharCode(key);
        switch (key) {
            case 13:
                if (string.localeCompare("ATCKUP") == 0 || string.localeCompare("ATTACKUP") == 0) {
                    playerStats.atckUp();
                    //condition to increase enemy stat depending on player stat
                } else if (string.localeCompare("ATCK") == 0 || string.localeCompare("ATTACK") == 0) {
                    playerStats.enemyLwrDef();
                    //condition to increase enemy stat depending on player stat
                }  else if (string.localeCompare("ATCKDOWN") == 0 || string.localeCompare("ATTACKDOWN") == 0 || 
                	string.localeCompare("ATCKDWN") == 0 || string.localeCompare("ATTACKDWN") == 0 || 
                	string.localeCompare("ATCKDN") == 0 || string.localeCompare("ATTACKDN") == 0) {
                    playerStats.enemyLwrAtck();
                    //condition to increase enemy stat depending on player stat
                } else if (string.localeCompare("DEFUP") == 0 || string.localeCompare("DEFENSEUP") == 0) {
                    playerStats.defUp();
                    //condition to increase enemy stat depending on player stat
                } else if (string.localeCompare("MASKUP") == 0 || string.localeCompare("MSKUP") == 0 || 
        		string.localeCompare("MSK") == 0 || string.localeCompare("MASK") == 0) {
                    playerStats.maskUp();
                    //condition to increase enemy stat depending on player stat
                } else if (string.localeCompare("SECDOWN") == 0 || string.localeCompare("SCDOWN") == 0 || 
        		string.localeCompare("SECDWN") == 0 || string.localeCompare("SCDWN") == 0 || 
        		string.localeCompare("SECDN") == 0 || string.localeCompare("SCDN") == 0) {
                    playerStats.enemyLwrSec();
                    //condition to increase enemy stat depending on player stat
                }
                status.text = string;
                string = "";
                break;
            default:
                if (string.charAt(0) == 0) {
                    string = string.substring(1);
                }
                if (key == 8) {
                    string = string.substring(0, string.length - 1);
                } else {
                    string += char;
                }
                break;
        }
        Hack.updateTypeBox(string);
    };
	Update();
}
Update = function() {
	InputsUpdate();
};
//*/
LoadContent();
Update();
