const gameboard = document.querySelector('#gameboard')
const ctx = gameboard.getContext('2d')
const scoretext = document.querySelector('#scoretext')
const resetbn = document.querySelector('#resetbn')
const gameWidth = gameboard.width
const gameHeight = gameboard.height

const boardbg = 'black'
const snakecolor = 'red'
const snakeBorder = 'green'
const foodcolor = 'yellow'
const unitsize = 15
let active = false
let xvel = unitsize
let yvel = 0
let foodx
let foody
let score = 0
let snake = [
	{ x: unitsize * 4, y: 0 },
	{ x: unitsize * 3, y: 0 },
	{ x: unitsize * 2, y: 0 },
	{ x: unitsize, y: 0 },
	{ x: 0, y: 0 },
]

window.addEventListener('keydown', changeDirection)
resetbn.addEventListener('click', resetgame)

gameStart()

function gameStart() {
	active = true
	scoretext.textContent = score
	createfood()
	drawfood()
	nexttick()
}
function nexttick() {
	if (active) {
		setTimeout(() => {
			clearboard()
			drawfood()
			movesnake()
			drawsnake()
			checkgameover()
			nexttick()
		}, 20)
	} else {
		displaygameover()
	}
}
function clearboard() {
	ctx.fillStyle = boardbg
	ctx.fillRect(0, 0, gameWidth, gameHeight)
}
function createfood() {
	function randomfood(min, max) {
		const randNum =
			Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize
		return randNum
	}
	foodx = randomfood(0, gameWidth - unitsize * 3)
	foody = randomfood(0, gameWidth - unitsize * 3)
}
function drawfood() {
	ctx.fillStyle = foodcolor
	ctx.fillRect(foodx, foody, unitsize, unitsize)
}
function movesnake() {
	const head = { x: snake[0].x + xvel, y: snake[0].y + yvel }
	snake.unshift(head)
	if (snake[0].x == foodx && snake[0].y == foody) {
		score += 1
		scoretext.textContent = score
		createfood()
	} else {
		snake.pop()
	}
}
function drawsnake() {
	ctx.fillStyle = snakecolor
	ctx.strokeStyle = snakeBorder
	snake.forEach((snakePart) => {
		ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize)
		ctx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize)
	})
}
function changeDirection(event) {
	const keypressed = event.keyCode
	const LEFT = 37
	const RIGHT = 39
	const UP = 38
	const DOWN = 40

	const goingup = yvel == -unitsize
	const goingdown = yvel == unitsize
	const goingright = xvel == unitsize
	const goingleft = xvel == -unitsize

	switch (true) {
		case keypressed == LEFT && !goingright:
			xvel = -unitsize
			yvel = 0
			break

		case keypressed == UP && !goingdown:
			xvel = 0
			yvel = -unitsize
			break

		case keypressed == RIGHT && !goingleft:
			xvel = unitsize
			yvel = 0
			break

		case keypressed == DOWN && !goingup:
			xvel = 0
			yvel = unitsize
			break
	}
}
function checkgameover() {
	switch (true) {
		case snake[0].x < 0:
			active = false
			break
		case snake[0].x >= gameWidth:
			active = false
			break
		case snake[0].y < 0:
			active = false
			break
		case snake[0].y >= gameHeight:
			active = false
			break
	}
	for (let i = 1; i > snake.length; i += 1) {
		if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
			active = false
		}
	}
}
function displaygameover() {
	ctx.font = '50px cursive'
	ctx.fillStyle = 'white'
	ctx.textAlign = 'center'
	ctx.fillText('GAMEOVER', gameWidth / 2, gameHeight / 2)
	active = false
}
function resetgame() {
	score = 0;
	xvel = unitsize;
	yvel = 0;
	
}
