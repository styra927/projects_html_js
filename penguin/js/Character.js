Character.count = 0;
function Character(inheritance){

	Character.count++;

	this.id = 'char_'+Character.count;

	if(!inheritance){
		Game.toDraw[this.id] = this;
	}
	this.speed = 2;

	this.fW = 21;
	this.fH = 24;

	this.modX = -2;
	this.modY = -9;

	this.states = {};

	this.current_f = 0;

	this.change_f_delay = 0;
	this.f_max_delay = 2;
}
Character.prototype.draw = function(){

	if(this.state.slice(-2)=='go'){

		if(this.state=='down_go'){
			this.y+=this.speed;
		}else if(this.state=='up_go'){
			this.y-=this.speed;
		}else if(this.state=='left_go'){
			this.x-=this.speed;
		}else if(this.state=='right_go'){
			this.x+=this.speed;
		}
		this.rowAndColumn();
	}

	if(Game.board.b[this.row][this.column].sub_type=='bomb' && Game.board.b[this.row][this.column].bum_type){
		this.setKO();
	}
	if(this.states[this.state].flip){
		Game.ctx.save();
		Game.ctx.scale(-1,1);
	}

	Game.ctx.drawImage(
		Game.spr,
		this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.fW,
		this.states[this.state].sy,
		this.fW,
		this.fH,
		(this.states[this.state].flip ? (-this.fW-this.x-this.modX)*VAR.scale : (this.x+this.modX)*VAR.scale),
		(this.y+this.modY)*VAR.scale,
		this.fW*VAR.scale,
		this.fH*VAR.scale
	);

	if(this.states[this.state].flip){
		Game.ctx.restore();
	}

	if(this.change_f_delay<this.f_max_delay){
		this.change_f_delay++;
	}else{
		this.change_f_delay = 0;
		if(this.state=='ko' && this.current_f== this.states[this.state].f.length-1){
			this.afterKO();
		}else{
			this.current_f = this.current_f+1>=this.states[this.state].f.length ? 0 : this.current_f+1;
		}
	}
};
Character.prototype.setKO = function(){
	this.state = 'ko';
} 
Character.prototype.afterKO = function(){
	delete Game.toDraw[this.id];
}
Character.prototype.rowAndColumn = function() {
	this.column = Math.round(this.x/Game.board.fW);
	this.row = Math.round(this.y/Game.board.fH);

	if(this.state.slice(-3)=='_go'){
		if(this.state=='left_go' || this.state=='right_go'){
			this.next_column = this.state=='left_go' ? Math.floor(this.x/Game.board.fW) : Math.ceil(this.x/Game.board.fW);
			this.next_row = this.row;
		}else{
			this.next_row = this.state=='up_go' ? Math.floor(this.y/Game.board.fW) : Math.ceil(this.y/Game.board.fW);
			this.next_column = this.column;
		}

		if(!(this.next_row==this.row && this.next_column==this.column) && Game.board.b[this.next_row][this.next_column].type!='empty'){
			this.state = this.state.slice(0,-3);
			this.current_f = 0;

			if(this.next_row!=this.row){
				this.y = this.row*Game.board.fH;
			}else{
				this.x = this.column*Game.board.fW;
			}
		}else{
			if(this.next_row!=this.row){
				this.x = this.next_column*Game.board.fW;
			}else if(this.next_column!=this.column){
				this.y = this.next_row*Game.board.fH;
			}
		}
	}else{
		this.next_column = this.column;
		this.next_row = this.row;
	}
};
function Hero(){
	Character.call(this);
	this.state = 'down';
	this.states = {
		'down':{sx:0, sy:0, f:[0]},
		'down_go':{sx:0, sy:0, f:[1,0,2,0]},
		'up':{sx:0, sy:24, f:[0]},
		'up_go':{sx:0, sy:24, f:[1,0,2,0]},
		'left':{sx:63, sy:0, f:[0]},
		'left_go':{sx:63, sy:0, f:[1,0,2,0]},
		'right':{sx:63, sy:0, f:[0], flip:true},
		'right_go':{sx:63, sy:0, f:[1,0,2,0], flip:true},
		'ko':{sx:0, sy:48, f:[0,1,0,1,0,1,2,3,4,4,4]}
	}

	this.x = Game.board.fW;
	this.y = Game.board.fH;

	this.rowAndColumn();

}

Hero.prototype = new Character(true);
Hero.prototype.construktor = Hero;
Hero.prototype.parent = Character.prototype;

Hero.prototype.updateState = function(){
	
	if(Game.key_37){
		this.tmpstate = 'left_go';
	}else if(Game.key_38){
		this.tmpstate = 'up_go';
	}else if(Game.key_39){
		this.tmpstate = 'right_go';
	}else if(Game.key_40){
		this.tmpstate = 'down_go';
	}else if(this.state.slice(-2)=='go'){
		this.tmpstate = this.state.slice(0, this.state.indexOf('_go') );
	}
	if(this.tmpstate!=this.state){
		this.current_f = 0;
		this.state = this.tmpstate;
	}
}
Hero.prototype.setKO = function(){
	this.parent.setKO.call(this);
	Game.stop();
}
Hero.prototype.afterKO = function(){
	if(!Game.is_over){
		Game.is_over = true;
		console.log('gameOver');
	}
}
// enemy hit - jesli wejdziemy na czlowieczka 
Hero.prototype.enemyHitTest = function(){
	
	for(var e in Enemy.all){
		
		e = Enemy.all[e];

		if((this.row==e.row && e.x+Game.board.fW>this.x && e.x<this.x+Game.board.fW) || (this.column==e.column && e.y+Game.board.fH>this.y && e.y<this.y+Game.board.fH)){
			// jak enemy dotknie pingwina to kończy grę
			return true;
		}
	} 
	// jak nie dotknął człowieczka
	return false;
}

Hero.prototype.draw = function(){
	this.parent.draw.call(this);
	// KO jeśli bohater został zabity przez enemy
	if(this.state!='ko' && this.enemyHitTest()){
		this.setKO();
	}
}

Enemy.all = {};
function Enemy(x,y){
	Character.call(this);

	Enemy.all[this.id] = this;
	this.state = 'down';
	this.states = {
		'down':{sx:0, sy:72, f:[0]},
		'down_go':{sx:0, sy:72, f:[0,1,0,2]},
		'up':{sx:63, sy:72, f:[0]},
		'up_go':{sx:63, sy:72, f:[0,1,0,2]},
		'left':{sx:63, sy:24, f:[0]},
		'left_go':{sx:63, sy:24, f:[0,1,0,2]},
		'right':{sx:63, sy:24, f:[0], flip:true},
		'right_go':{sx:63, sy:24, f:[0,1,0,2], flip:true},
		'ko':{sx:0, sy:96, f:[0,0,1,2,3,4,5]}
	}
 
	this.x = x;
	this.y = y;
	this.rowAndColumn();
	this.setDirection();
}
Enemy.prototype = new Character(true);
Enemy.prototype.construktor = Enemy;
 
Enemy.prototype.parent = Character.prototype;
Enemy.prototype.setDirection = function(){
	this.canGo = this.canGo || [];
	this.canGo.length = 0;

	for(var i=this.column-1; i<=this.column+1; i++){

		for(var j=this.row-1; j<=this.row+1; j++){

			if(!(i==this.column && j==this.row)){
				if(i==this.column || j==this.row){

					if(Game.board.b[j][i].type=='empty'){
						this.canGo.push({x:i, y:j});
					}
				}
			}
		}
	}
	if(this.canGo.length>0){
		this.tmp_pos = this.canGo[VAR.rand(0,this.canGo.length-1)];
		if(this.column<this.tmp_pos.x){
			this.state = 'right_go';
		}else if(this.column>this.tmp_pos.x){
			this.state = 'left_go';
		}else if(this.row<this.tmp_pos.y){
			this.state = 'down_go';
		}else if(this.row>this.tmp_pos.y){
			this.state = 'up_go';
		}
	}else if(this.state.slice(-2)=='go'){
		this.state = this.state.slice(0, this.state.indexOf('_go') );
	}
}
Enemy.prototype.rowAndColumn = function(){

	this.prev_state = this.state;

	this.parent.rowAndColumn.call(this);

	if(this.prev_state!=this.state && this.state.slice(-2)!='go' && this.prev_state.slice(-2)=='go'){
		this.setDirection();
	}
}
Enemy.prototype.afterKO = function(){

	this.parent.afterKO.call(this);

	delete Enemy.all[this.id];
	var some_enemy = false
	for(var e in Enemy.all){
		some_enemy ++;
		break;
	}

	if(!some_enemy){
		console.log('success')
	}
}


