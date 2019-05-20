Board.templates = [ //plansze
	[
		'WWWWWWWWWWWWWWW',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'WWWWWWWWWWWWWWW'
	],
	[
		'WWWWWWWWWWWWWWW',
		'W             W',
		'W X X XXX X X W',
		'W             W',
		'W X X X X X X W',
		'W X   X X   X W',
		'W X X X X X X W',
		'W             W',
		'W X X XXX X X W',
		'W             W',
		'WWWWWWWWWWWWWWW'
	],
	[
		'WWWWWWWWWWWWWWW',
		'W X           W',
		'W   X XXX X X W',
		'W           X W',
		'W X X   X   X W',
		'W     X X   X W',
		'W X   X   X X W',
		'W           X W',
		'W X X XXX X X W',
		'W             W',
		'WWWWWWWWWWWWWWW'
	],
];
Board.elements = {
	'floor': {
		sx: 174,
		sy: 16,
		type: 'empty',
		sub_type: 'board'
	}, // sub_type = rozróżnia elementy bez animacji od elementów z animacją
	'W': {
		sx: 190,
		sy: 16,
		type: 'solid',
		sub_type: 'board'
	},
	'X': {
		sx: 206,
		sy: 16,
		type: 'solid',
		sub_type: 'board'
	},
	'box': {
		sx: 126,
		sy: 0,
		type: 'soft',
		sub_type: 'board',
		ko_obj: 'Crate'
	} // ko_obj  = obiekt ktory zostaje wstawiony jak niszczy sie śmiecia
};

function Board() {
	this.parse(Board.templates[VAR.rand(0, Board.templates.length - 1)]);
	for (var i = 0; i < 30; i++) {
		this.addCrate();
	}
	this.fW = 16;
	this.fH = 16;
}
Board.prototype.addCrate = function () {
	var pos = this.getEmptySpace();
	if (pos) {
		this.b[pos.y][pos.x] = Board.elements.box;
	}
}
Board.prototype.getEmptySpace = function () {
	return this.emptySpaces.length > 0 ? this.emptySpaces.shift() : null;
}
Board.prototype.draw = function () {
	for (var i = 0; i < this.b.length; i++) {
		for (var j = 0; j < this.b[i].length; j++) {
			Game.ctx.drawImage(
				Game.spr,
				this.b[i][j].sx,
				this.b[i][j].sy,
				this.fW,
				this.fH,
				j * this.fW * VAR.scale,
				i * this.fH * VAR.scale,
				this.fW * VAR.scale,
				this.fH * VAR.scale
			);
			// jesli na polu jest animacja, to ja animuje
			if (this.b[i][j].sub_type != 'board') {
				this.b[i][j].draw();
			}
		}
	}
};
Board.prototype.parse = function (arr) {
	this.b = [];
	this.emptySpaces = [];
	for (var i = 0; i < arr.length; i++) {
		this.b.push([]);
		for (var j = 0; j < arr[i].length; j++) {
			this.b[i].push(Board.elements[arr[i].charAt(j) == ' ' ? 'floor' : arr[i].charAt(j)]);
			if (this.b[i][j].type == 'empty' && !(i == 1 && j == 1) && !(i == 2 && j == 1) && !(i == 1 && j == 2)) {
				this.emptySpaces.push({
					x: j,
					y: i
				});
			}
		}
	}
	VAR.shuffle(this.emptySpaces);
}