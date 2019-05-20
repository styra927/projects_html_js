window.onload = function () {
	Game.spr = new Image();
	Game.spr.onload = Game.init;
	Game.spr.src = 'bombe.png';
} //gra sie ładuje, pojawiają się elementy

VAR = {
	fps: 16,
	W: 0,
	H: 0,
	scale: 4,

	lastTime: 0, //wpływa na prawidłowe działanie animationLoop
	rand: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	shuffle: function (arr) {
		var counter = arr.length;
		var tmp;
		var index;
		while (counter > 0) {
			counter--;
			index = Math.floor(Math.random() * counter);
			tmp = arr[counter];
			arr[counter] = arr[index];
			arr[index] = tmp;
		}
		return arr;
	}
}

Game = {
	toDraw: {},
	init: function () {
		Game.canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');

		Game.board = new Board();

		Game.hero = new Hero();
		// dodanie nasłuchiwaczy
		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);
		// dodanie enemies
		var tmp_empty;
		for (var i = 0; i < 5; i++) {
			// do tmp_empty dodaje obiekt z tablicy ze wszystkimi pustymi miejscami na planszy
			tmp_empty = Game.board.getEmptySpace();
			new Enemy(tmp_empty.x * Game.board.fW, tmp_empty.y * Game.board.fH);
		}

		Game.layout();
		window.addEventListener('resize', Game.layout, false);
		document.body.appendChild(Game.canvas);
		Game.animationLoop();
	},
	layout: function (ev) {
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		VAR.scale = Math.max(1, Math.min(
			Math.floor(VAR.W / (Game.board.fW * Game.board.b[0].length)),
			Math.floor(VAR.H / (Game.board.fH * Game.board.b.length))
		));
		Game.canvas.width = Math.round(VAR.scale * Game.board.fW * Game.board.b[0].length);
		Game.canvas.height = Math.round(VAR.scale * Game.board.fH * Game.board.b.length);
		Game.canvas.style[Modernizr.prefixed('transform')] = 'translate(' + Math.round((VAR.W - Game.canvas.width) / 2) + 'px,' + Math.round((VAR.H - Game.canvas.height) / 2) + 'px)'
		Game.ctx.imageSmoothingEnabled = false;
		Game.ctx.mozImageSmoothingEnabled = false;
		Game.ctx.oImageSmoothingEnabled = false;
		Game.ctx.webkitImageSmoothingEnabled = false;
	},
	onKey: function (ev) {
		if ((ev.keyCode >= 37 && ev.keyCode <= 40) || ev.keyCode == 32) {
			if (ev.type == 'keydown' && !Game['key_' + ev.keyCode]) {
				Game['key_' + ev.keyCode] = true;
				if (ev.keyCode >= 37 && ev.keyCode <= 40) {
					for (var i = 37; i <= 40; i++) {
						if (i != ev.keyCode) {
							Game['key_' + i] = false;
						}
					}
					Game.hero.updateState();
				} else { // to znaczy, że została wciśnięta spacja
					// postaw bombę
					new Bomb(Game.hero.column, Game.hero.row);
				}
			} else if (ev.type == 'keyup') {
				Game['key_' + ev.keyCode] = false;
				if (ev.keyCode != 32) {
					Game.hero.updateState(); // nie zmieniaj na puszczenie spacji
				}
			}

		}
	},
	stop: function () {
		window.removeEventListener('keydown', Game.onKey);
		window.removeEventListener('keyup', Game.onKey);
	},
	animationLoop: function (time) {
		requestAnimationFrame(Game.animationLoop);
		if (time - VAR.lastTime >= 1000 / VAR.fps) {
			VAR.lastTime = time;
			Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
			Game.board.draw();
			for (var o in Game.toDraw) {
				Game.toDraw[o].draw();
			}
		}
	}
}