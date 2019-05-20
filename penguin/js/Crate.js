function Crate(column, row) {
	// narysowana podłoga
	this.sx = Board.elements.floor.sx;
	this.sy = Board.elements.floor.sy;
	//pierwsza klatka animacji na sprite
	this.anim_sx = 126;
	this.anim_sy = 0;
	// aktualna klatka animacji
	this.current_f = 0;
	// indexy klatek animacji
	this.f = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
	this.type = 'empty';
	this.sub_type = 'crate';
	this.row = row;
	this.column = column;
	// podmiana obiektu na planszy
	Game.board.b[this.row][this.column] = this;
}
Crate.prototype.draw = function () {
	// rysowanie
	Game.ctx.drawImage(
		Game.spr,
		this.anim_sx + this.f[this.current_f] * Game.board.fW,
		this.anim_sy,
		Game.board.fW,
		Game.board.fH,
		this.column * Game.board.fW * VAR.scale,
		this.row * Game.board.fH * VAR.scale,
		Game.board.fW * VAR.scale,
		Game.board.fH * VAR.scale

	);
	// aktualny index klatki ++ 
	this.current_f++;
	// jak index klatki będzie równy lub większy ilości klatek
	if (this.current_f >= this.f.length) {
		// podmień obiekt na planszy na podłogę
		Game.board.b[this.row][this.column] = Board.elements.floor;
	}
};