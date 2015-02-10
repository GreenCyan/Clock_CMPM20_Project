use2D = true;
initGame("canvas");

var DEDUCT_VAR = 0.1;

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
        playerStats.init(50, 100, 100);
        enemyStats.init(50, 100, 100);
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
	init: function(atck, def, mask) {
		this.atck = atck;
        boxAtck = new TextBox(),
        boxAtck.text = this.atck;
        boxAtck.fontSize = 50;
        boxAtck.x = 250;
        boxAtck.y = 10;
        world.addChild(boxAtck);
        
		this.def = def;
        boxDef = new TextBox(),
        boxDef.text = this.def;
        boxDef.fontSize = 50;
        boxDef.x = 250;
        boxDef.y = 70;
        world.addChild(boxDef);
        
		this.mask = mask;
        boxMsk = new TextBox(),
        boxMsk.text = this.mask;
        boxMsk.fontSize = 50;
        boxMsk.x = 250;
        boxMsk.y = 130;
        world.addChild(boxMsk);
	},
    atckUp: function() {
        // generate number here and update boxAtck
        this.atck *= 1.5;
        boxAtck.text = this.atck;
    },
    defUp: function() {
        // generate number here and update boxAtck
        this.def *= 1.5;
        boxDef.text = this.def;
    },
    maskUp: function() {
        // generate number here and update boxAtck
        this.mask *= 1.5;
        boxMsk.text = this.mask;
    },
    enemyLwrAtck: function() {
        enemyStats.selfLwrAtck(this.atck);
    },
    enemyLwrDef: function() {
        enemyStats.selfLwrDef(this.atck);
    },
    enemyLwrSec: function() {
        //enemyStats.selfLwrMsk(this.mask);
    },
    selfLwrAtck: function(deduct) {
        this.atck -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
    },
    selfLwrDef: function(deduct) {
        this.def -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
    },
    selfLwrMsk: function(deduct) {
        //this.mask -= deduct * Math.floor(Math.random() * deduct * DEDUCT_VAR);
    }
};
/*************************************************************/
/* this function stores enemy stats and commands */
enemyStats = {
	atck: 5,
	def: 10,
	sec: 10,
	init: function(atck, def, sec) {
		this.atck = atck;
        box2Atck = new TextBox(),
        box2Atck.text = this.atck;
        box2Atck.fontSize = 50;
        box2Atck.x = 350;
        box2Atck.y = 10;
        world.addChild(box2Atck);
        
		this.def = def;
        box2Def = new TextBox(),
        box2Def.text = this.def;
        box2Def.fontSize = 50;
        box2Def.x = 350;
        box2Def.y = 70;
        world.addChild(box2Def);
        
		this.sec = sec;
        box2Sec = new TextBox(),
        box2Sec.text = this.sec;
        box2Sec.fontSize = 50;
        box2Sec.x = 350;
        box2Sec.y = 130;
        world.addChild(box2Sec);
	},
    atckUp: function() {
        // generate number here and update boxAtck
        this.atck *= 1.5;
        box2Atck.text = this.atck;
    },
    defUp: function() {
        // generate number here and update boxAtck
        this.def *= 1.5;
        box2Def.text = this.def;
    },
    secUp: function() {
        // generate number here and update boxAtck
        this.sec *= 1.5;
        box2Sec.text = this.sec;
    },
    enemyLwrAtck: function() {
        playerStats.selfLwrAtck(this.atck);
    },
    enemyLwrDef: function() {
        playerStats.selfLwrDef(this.atck);
    },
    enemyLwrMsk: function() {
        //enemyStats.selfLwrMsk(this.mask);
    },
    selfLwrAtck: function(deduct) {
        this.atck -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR );
    },
    selfLwrDef: function(deduct) {
        this.def -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR);
    },
    selfLwrSec: function(deduct) {
        //this.mask -= deduct + Math.floor(Math.random() * deduct * DEDUCT_VAR );
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
                if (string.localeCompare("ATCKUP") == 0) {
                    playerStats.atckUp();
                } else if (string.localeCompare("DEFUP") == 0) {
                    playerStats.defUp();
                } else if (string.localeCompare("MASKUP") == 0) {
                    playerStats.maskUp();
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
