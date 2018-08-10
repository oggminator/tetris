var currentPiece = nextPiece = new Array(2);
var boardCanvas = hipoCanvas = horseCanvas = null;
var boardContext = hipoContext = horseContext = null;
var currentPieceCanvas = nextPieceCanvas = null;
var currentPieceContext = nextPieceContext = null;
var moveDownPieceAuto = null;
var boardStatus = new Array();
var pieceMovedDown = 0;
var gameIsOver = false;

function draw(){
	var canvas = document.getElementById('tutorial');
	if (canvas.getContext)
	{
		boardCanvas = canvas;
		canvas.width = canvasObj.width;
		canvas.height = canvasObj.height;
		canvas.style.left = canvasObj.startX + "px";
		canvas.style.top = canvasObj.startY + "px";
		var ctx = canvas.getContext('2d');
		boardContext = ctx;
		ctx.translate(0.5, 0.5);
		drawBoard();
		drawHipo();
		drawHorse();
	}
	
	window.addEventListener('keydown', handleKeyPress);
	
	generateNewPiece();
	
	generateNextPiece();
}

function generateNextPiece()
{
	var newPiece = chooseNewPiece();
	nextPiece = newPiece;

	drawNextPiece(newPiece[0], newPiece[1]);
	
	nextPieceCanvas.style.left = canvasObj.startX + canvasObj.width + boardObj.square.width + "px";
	nextPieceCanvas.style.top = canvasObj.startY + "px";
}

function generateNewPiece()
{
	// Reset the number of the down moves the current piece made
	pieceMovedDown = 0;
	
	var newPiece = !nextPieceContext ? chooseNewPiece() : nextPiece;
	currentPiece = newPiece;

	drawNewPiece(newPiece[0], newPiece[1]);
	
	currentPieceCanvas.style.left = canvasObj.startX + (canvasObj.width / (boardObj.square.width * 2)) * boardObj.square.width - boardObj.square.width + "px";
	currentPieceCanvas.style.top = canvasObj.startY + "px";
	
	stopMoveDownPiece();
	startMoveDownPiece();
}

function drawHorse()
{
	var imageObj = new Image();
	var canvas = document.getElementById('horse');
	
	if (canvas.getContext)
	{
		horseCanvas = canvas;
		canvas.width = canvasHipoObj.horse.width;
		canvas.height = canvasHipoObj.horse.height;
		canvas.style.left = canvasHipoObj.startX + canvasHipoObj.horse.startX + "px";
		canvas.style.top = canvasHipoObj.startY + canvasHipoObj.horse.startY + "px";
		var ctx = canvas.getContext('2d');
		horseContext = ctx;
		ctx.translate(0.5, 0.5);
		
		imageObj.onload = function() {
			ctx.drawImage(imageObj, 0, 0, canvasHipoObj.horse.width, canvasHipoObj.horse.height);
		};
		imageObj.src = canvasHipoObj.horse.image;
	}
}

function drawHipo()
{
	var canvas = document.getElementById('hipo');
	if (canvas.getContext)
	{
		hipoCanvas = canvas;
		canvas.width = canvasHipoObj.width;
		canvas.height = canvasHipoObj.height;
		canvas.style.left = canvasHipoObj.startX + "px";
		canvas.style.top = canvasHipoObj.startY + "px";
		var ctx = canvas.getContext('2d');
		hipoContext = ctx;
		ctx.translate(0.5, 0.5);
	}
	
	// Draw the sky
	ctx.fillStyle = canvasHipoObj.sky.color;
	ctx.fillRect(0, 0, canvasHipoObj.width, canvasHipoObj.sky.height);
	
	// Draw the grass
	ctx.fillStyle = canvasHipoObj.grass.color;
	ctx.fillRect(0, canvasHipoObj.sky.height, canvasHipoObj.width, canvasHipoObj.height - canvasHipoObj.sky.height);
	
	// Draw the tracks
	for(var track = 2; track <= canvasHipoObj.track.no + 1; track++)
	{
		for(var x = 1; x <= canvasHipoObj.width / canvasHipoObj.grass.arc.width; x++)
		{
			ctx.beginPath();
			ctx.arc(x * canvasHipoObj.grass.arc.width * 2 - canvasHipoObj.grass.arc.width, track * canvasHipoObj.track.height, canvasHipoObj.grass.arc.radius, 1.32 * Math.PI, 1.67 * Math.PI, false);
			ctx.lineWidth = canvasHipoObj.grass.arc.lineWidth;
			ctx.strokeStyle = canvasHipoObj.grass.arc.lineColor;
			ctx.stroke();
		}
	}
}

function drawBoard()
{
	var boardXSquares = canvasObj.width / boardObj.square.width;
	var boardYSquares = canvasObj.height / boardObj.square.height;
	
	for(i = 0; i <= boardXSquares + 1; i++)
	{
		boardStatus[i] = new Array();
		
		for(z = 0; z <= boardYSquares + 1; z++)
		{
			boardStatus[i].push( i == 0 || i == boardXSquares + 1 ? 1 : ( z == 0 || z == boardYSquares + 1 ? 1 : 0 ) );
		}
		
		if(i > 0 && i < boardXSquares)
		{
			boardContext.beginPath();
			boardContext.moveTo(i * boardObj.square.width,0);
			boardContext.lineTo(i * boardObj.square.width,canvasObj.height);
			boardContext.lineWidth = boardObj.square.lineWidth;
			boardContext.strokeStyle = boardObj.square.lineColor;
			boardContext.stroke();
		}
	}
	for(j = 1; j < boardYSquares; j++)
	{
		boardContext.beginPath();
		boardContext.moveTo(0,j * boardObj.square.height);
		boardContext.lineTo(canvasObj.width,j * boardObj.square.height);
		boardContext.lineWidth = boardObj.square.lineWidth;
		boardContext.strokeStyle = boardObj.square.lineColor;
		boardContext.stroke();
	}
	
	//console.log(boardStatus);
}

function drawNewPiece(piece,position)
{
	var canvas = document.getElementById('newBlock');
	if (canvas.getContext)
	{
		currentPieceCanvas = canvas;
		canvas.width = piece.position[position].width;
		canvas.height = piece.position[position].height;
		var ctx = canvas.getContext('2d');
		currentPieceContext = ctx;
		
		ctx.fillStyle = piece.color;
		for(i = 1; i <= piece.squareNo; i++ )
		{
			ctx.fillRect(
				piece.position[position].square[i].x,
				piece.position[position].square[i].y,
				piece.squareAttributes.width,
				piece.squareAttributes.height
			);
		}
	}
}

function drawNextPiece(piece,position)
{
	var canvas = document.getElementById('nextBlock');
	if (canvas.getContext)
	{
		nextPieceCanvas = canvas;
		canvas.width = piece.position[position].width;
		canvas.height = piece.position[position].height;
		var ctx = canvas.getContext('2d');
		nextPieceContext = ctx;
		
		ctx.fillStyle = piece.color;
		for(i = 1; i <= piece.squareNo; i++ )
		{
			ctx.fillRect(
				piece.position[position].square[i].x,
				piece.position[position].square[i].y,
				piece.squareAttributes.width,
				piece.squareAttributes.height
			);
		}
	}
}

function chooseNewPiece()
{
	var newPiece = new Array();
	var pieces = ['line','zet1','zet2','el1','el2','te','square'];
	var piecesPositions = [[1,2],[1,2],[1,2],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1]];
	var piece = pieces[Math.floor(Math.random() * pieces.length)];
	var position = piecesPositions[pieces.indexOf(piece)][Math.floor(Math.random() * piecesPositions[pieces.indexOf(piece)].length)];
	
	//newPiece.push(boardPieces['zet2']);
	//newPiece.push(1);
	
	newPiece.push(boardPieces[piece]);
	newPiece.push(position);
	
	return newPiece;
}

function handleKeyPress(e)
{
	if(!gameIsOver)
	{
		var key = e.keyCode ? e.keyCode : e.which;
		switch(key)
		{
			case 38:
				rotatePiece();
			break;
			case 37:
				moveLeftPiece();
			break;
			case 39:
				moveRightPiece();
			break;
			case 40:
				moveDownPiece();
			break;
		}
	}
}

function rotatePiece()
{
	var rotate = true;
	
	var leftPosition = parseInt(document.getElementById("newBlock").style.left);
	var topPosition = parseInt(document.getElementById("newBlock").style.top);
	var currentPiecePosition = new Array(2);
	currentPiecePosition = [parseInt(leftPosition - canvasObj.startX + boardObj.square.width) / boardObj.square.width, parseInt(topPosition - canvasObj.startY + boardObj.square.height) / boardObj.square.height];
	var nextPosition = currentPiece[1] < currentPiece[0].positionNo ? currentPiece[1] + 1 : 1;
	
	//console.log(currentPiecePosition);
	
	for(i = 0; i < currentPiece[0].position[nextPosition].rows; i++)
	{
		for(j = 0; j < currentPiece[0].position[nextPosition].columns; j++)
		{
			if(currentPiece[0].position[nextPosition].vector[i][j] && boardStatus[currentPiecePosition[0] + j][currentPiecePosition[1] + i])
			{
				rotate = false;
				break;
			}
		}
		if(!rotate)
		{
			break;
		}
	}
	
	if(rotate)
	{
		currentPieceContext.clearRect(0, 0, currentPiece[0].position[currentPiece[1]].width, currentPiece[0].position[currentPiece[1]].height);
		drawNewPiece(currentPiece[0],nextPosition);
		currentPiece = [currentPiece[0],nextPosition];
	}
}

function moveLeftPiece()
{
	var moveLeft = true;
	
	var leftPosition = parseInt(document.getElementById("newBlock").style.left);
	var topPosition = parseInt(document.getElementById("newBlock").style.top);
	var currentPiecePosition = new Array(2);
	currentPiecePosition = [parseInt(leftPosition - canvasObj.startX + boardObj.square.width) / boardObj.square.width, parseInt(topPosition - canvasObj.startY + boardObj.square.height) / boardObj.square.height];
	
	for(i = 0; i < currentPiece[0].position[currentPiece[1]].rows; i++)
	{
		for(j = 0; j < currentPiece[0].position[currentPiece[1]].columns; j++)
		{
			if(currentPiece[0].position[currentPiece[1]].vector[i][j] && boardStatus[currentPiecePosition[0] + j - 1][currentPiecePosition[1] + i])
			{
				moveLeft = false;
				break;
			}
		}
		if(!moveLeft)
		{
			break;
		}
	}
	
	if(moveLeft)
	{
		document.getElementById("newBlock").style.left = leftPosition - boardObj.square.width + "px";
	}
}

function moveRightPiece()
{
	var moveRight = true;
	
	var leftPosition = parseInt(document.getElementById("newBlock").style.left);
	var topPosition = parseInt(document.getElementById("newBlock").style.top);
	var currentPiecePosition = new Array(2);
	currentPiecePosition = [parseInt(leftPosition - canvasObj.startX + boardObj.square.width) / boardObj.square.width, parseInt(topPosition - canvasObj.startY + boardObj.square.height) / boardObj.square.height];
	
	for(i = 0; i < currentPiece[0].position[currentPiece[1]].rows; i++)
	{
		for(j = 0; j < currentPiece[0].position[currentPiece[1]].columns; j++)
		{
			if(currentPiece[0].position[currentPiece[1]].vector[i][j] && boardStatus[currentPiecePosition[0] + j + 1][currentPiecePosition[1] + i])
			{
				moveRight = false;
				break;
			}
		}
		if(!moveRight)
		{
			break;
		}
	}
	
	if(moveRight)
	{
		document.getElementById("newBlock").style.left = leftPosition + boardObj.square.width + "px";
	}
}

function moveDownPiece()
{
	var moveDown = true;
	
	var leftPosition = parseInt(document.getElementById("newBlock").style.left);
	var topPosition = parseInt(document.getElementById("newBlock").style.top);
	var currentPiecePosition = new Array(2);
	currentPiecePosition = [parseInt(leftPosition - canvasObj.startX + boardObj.square.width) / boardObj.square.width, parseInt(topPosition - canvasObj.startY + boardObj.square.height) / boardObj.square.height];
	
	for(i = 0; i < currentPiece[0].position[currentPiece[1]].rows; i++)
	{
		for(j = 0; j < currentPiece[0].position[currentPiece[1]].columns; j++)
		{
			if(currentPiece[0].position[currentPiece[1]].vector[i][j] && boardStatus[currentPiecePosition[0] + j][currentPiecePosition[1] + i + 1])
			{
				moveDown = false;
				break;
			}
		}
		if(!moveDown)
		{
			break;
		}
	}
	
	if(moveDown)
	{
		document.getElementById("newBlock").style.top = topPosition + boardObj.square.height + "px";
		pieceMovedDown++;
	}
	else
	{
		stopPiece();
		
		// Verify if the game is over
		if(!pieceMovedDown)
		{
			gameOver();
		}
		else
		{
			generateNewPiece();
			
			generateNextPiece();
		}
	}
}

function gameOver()
{
	stopMoveDownPiece();
	gameIsOver = true;
	
	// Draw the last piece on the board canvas
	var leftPosition = parseInt(document.getElementById("newBlock").style.left);
	var topPosition = parseInt(document.getElementById("newBlock").style.top);
	boardContext.imageSmoothingEnabled = false;
	boardContext.drawImage(currentPieceCanvas,leftPosition - 9,topPosition - 9,currentPieceCanvas.width,currentPieceCanvas.height - 1);
	
	// Clear the newBlock canvas
	currentPieceContext.clearRect(0, 0, currentPieceCanvas.width, currentPieceCanvas.height);
	
	// Display a transparent layer above the board canvas
	boardContext.fillStyle = "#FFFFFF";
	boardContext.globalAlpha = 0.75;
	boardContext.fillRect(0.5, 0.5, canvasObj.width, canvasObj.height);
	
	console.log('Game over!');
}

function stopPiece()
{	
	var leftPosition = parseInt(document.getElementById("newBlock").style.left);
	var topPosition = parseInt(document.getElementById("newBlock").style.top);
	var currentPiecePosition = nextPiecePosition = new Array(2);
	currentPiecePosition = [parseInt(leftPosition - canvasObj.startX + boardObj.square.width) / boardObj.square.width, parseInt(topPosition - canvasObj.startY + boardObj.square.height) / boardObj.square.height];
	
	var fullLines = new Array();
	
	for(i = 0; i < currentPiece[0].position[currentPiece[1]].rows; i++)
	{
		for(j = 0; j < currentPiece[0].position[currentPiece[1]].columns; j++)
		{
			if(currentPiece[0].position[currentPiece[1]].vector[i][j])
			{
				boardStatus[currentPiecePosition[0] + j][currentPiecePosition[1] + i] = 1;
			}
		}
	}
	
	boardContext.imageSmoothingEnabled = false;
	boardContext.drawImage(currentPieceCanvas,leftPosition - canvasObj.startX - 1,topPosition - canvasObj.startY - 1,currentPieceCanvas.width,currentPieceCanvas.height - 1);
	
	for(k = currentPiecePosition[1]; k < currentPiecePosition[1] + currentPiece[0].position[currentPiece[1]].rows; k++)
	{
		var fullLine = true;
		
		for(l = 1; l <= canvasObj.width / boardObj.square.width; l++)
		{
			if(!boardStatus[l][k])
			{
				fullLine = false;
			}
		}
		
		if(fullLine)
		{
			fullLines.push(k);
		}
	}
	
	if(fullLines.length)
	{
		linesCompleated(fullLines);
	}
}

function advanceHorse()
{
	var leftPositionHorse = parseInt(document.getElementById("horse").style.left);
	
	document.getElementById("horse").style.left = leftPositionHorse + canvasHipoObj.horse.advance.units + "px";
	
	console.log(leftPositionHorse);
}

function linesCompleated(fullLines)
{
	for(i = 0; i < fullLines.length; i++)
	{
		// Advance the horse
		advanceHorse();
		
		for(j = 1; j <= canvasObj.width / boardObj.square.width; j++)
		{
			boardStatus[j][fullLines[i]] = 0;
			boardContext.imageSmoothingEnabled = false;
			boardContext.fillStyle = "#FFFFFF";
			boardContext.fillRect((j - 1) * boardObj.square.width + 0.5, (fullLines[i] - 1) * boardObj.square.height + 0.5, boardObj.square.width - 1, boardObj.square.height - 1);
		}
		
		// Move down all the above blocks
		moveAboveBlocksDown(fullLines[i]);
	}
}

function moveAboveBlocksDown(startWithLineAbove)
{
	for(let i = startWithLineAbove; i > 1; i--)
	{
		for(let j = 1; j <= canvasObj.width / boardObj.square.width; j++)
		{
			boardStatus[j][i] = boardStatus[j][i-1];
		}
	}
	
	// Get the image data (above the startWithLineAbove) of the canva
	var aboveBlocksImageData = boardContext.getImageData(1, 1, canvasObj.width, (startWithLineAbove - 1) * boardObj.square.height);
	// Clear the canva above the startWithLineAbove line
	boardContext.clearRect(0, 0, canvasObj.width, startWithLineAbove * boardObj.square.height);
	// Insert the above collected data
	boardContext.putImageData(aboveBlocksImageData, 1.5, boardObj.square.height + 1.5);
	
	// Add an empty grid above all the blocks
	// This is actually the line that have been removed
	
	// Add the vertical lines of the grid for each column
	for(let j = 1; j < canvasObj.width / boardObj.square.width; j++)
	{
		boardContext.beginPath();
		boardContext.moveTo(j * boardObj.square.width, 0);
		boardContext.lineTo(j * boardObj.square.width,boardObj.square.height);
		boardContext.lineWidth = boardObj.square.lineWidth;
		boardContext.strokeStyle = boardObj.square.lineColor;
		boardContext.stroke();
	}
	
	// Add the horizontal line of the grid
	boardContext.beginPath();
	boardContext.moveTo(0,boardObj.square.height);
	boardContext.lineTo(canvasObj.width,boardObj.square.height);
	boardContext.lineWidth = boardObj.square.lineWidth;
	boardContext.strokeStyle = boardObj.square.lineColor;
	boardContext.stroke();
}

function startMoveDownPiece()
{
	moveDownPieceAuto = setInterval(moveDownPiece, 1000);
}

function stopMoveDownPiece()
{
	if(moveDownPieceAuto)
	{
		clearInterval(moveDownPieceAuto);
	}
}