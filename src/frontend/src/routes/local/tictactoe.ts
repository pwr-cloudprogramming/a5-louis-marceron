export enum GameStatus {
	inProgress,
	player1Wins,
	player2Wins,
	player1Forfeits,
	player2Forfeits,
	draw,
}

export enum Mark {
	X = 'X',
	O = 'O',
}

export class Player {
	private static numberOfPlayer: number = 0;
	private _id: number;
	private _name: string;
	private _mark: Mark;

	public get name() {
		return this._name;
	}

	public get mark() {
		return this._mark;
	}

	public get id() {
		return this._id;
	}

	public constructor(name: string, mark: Mark) {
		Player.numberOfPlayer++;
		this._id = Player.numberOfPlayer;
		this._name = name;
		this._mark = mark;
	}
}

export class TicTacToe {
	private _board: (Player | null)[][];
	private _player1: Player;
	private _player2: Player;
	private _currentPlayer: Player;

	public constructor(player1Name: string = "Player 1", player2Name: string = "Player 2") {
		this._board = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];

		this._player1 = new Player(player1Name, Mark.X);
		this._player2 = new Player(player2Name, Mark.O);

		this._currentPlayer = this.selectRandomPlayer();
	}

	public get currentPlayer(): Player {
		return this._currentPlayer;
	}

	public get player1() {
		return this._player1;
	}

	public get player2() {
		return this._player2;
	}

	public get boardWithXandO() {
		return this._board.map(row => row.map(square => {
			if (square === null) {
				return null;
			}
			return square === this._player1 ? 'X' : 'O';
		}));
	}

	public get gameStatus(): GameStatus {
		// Check rows
		for (let i = 0; i < 3; i++) {
			if (this._board[i][0] !== null &&
				this._board[i][0] === this._board[i][1] &&
				this._board[i][0] === this._board[i][2]) {
				return this._board[i][0] === this._player1 ? GameStatus.player1Wins : GameStatus.player2Wins;
			}
		}

		// Check columns
		for (let i = 0; i < 3; i++) {
			if (this._board[0][i] !== null &&
				this._board[0][i] === this._board[1][i] &&
				this._board[0][i] === this._board[2][i]) {
				return this._board[0][i] === this._player1 ? GameStatus.player1Wins : GameStatus.player2Wins;
			}
		}

		// Check diagonals
		if (this._board[0][0] !== null &&
			this._board[0][0] === this._board[1][1] &&
			this._board[0][0] === this._board[2][2]) {
			return this._board[0][0] === this._player1 ? GameStatus.player1Wins : GameStatus.player2Wins;
		}

		if (this._board[0][2] !== null &&
			this._board[0][2] === this._board[1][1] &&
			this._board[0][2] === this._board[2][0]) {
			return this._board[0][2] === this._player1 ? GameStatus.player1Wins : GameStatus.player2Wins;
		}

		// Check if the board is full
		let isBoardFull = true;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this._board[i][j] === null) {
					isBoardFull = false;
					break;
				}
			}
			if (!isBoardFull) {
				break;
			}
		}

		if (isBoardFull) {
			return GameStatus.draw;
		}

		return GameStatus.inProgress;
	}

	public playTurn(x: number, y: number): GameStatus {
		const isOutsideTheBoard = x < 0 || x > 2 || y < 0 || y > 2;
		const squareNotEmpty = this._board[x][y] !== null;
		const gameIsOver = this.gameStatus !== GameStatus.inProgress;

		if (gameIsOver) {
			throw new Error('The game is over');
		}

		if (isOutsideTheBoard || squareNotEmpty) {
			throw new Error('Invalid position');
		}

		this._board[x][y] = this.currentPlayer
		this._currentPlayer = this.currentPlayer === this._player1 ?
			this._player2 : this._player1;

		return this.gameStatus;
	}

	private selectRandomPlayer(): Player {
		const randomNumber = Math.random();
		return randomNumber < 0.5 ? this._player1 : this._player2
	}

	public reset() {
		this._board = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		this._currentPlayer = this.selectRandomPlayer();
	}
}
