const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scaleFactor = 50;

function toWorkingOrigin() {
  ctx.translate(scaleFactor, scaleFactor);
}

function lineTo(x, y) {
  ctx.lineTo(x * scaleFactor, y * scaleFactor);
}

const functions = {

    linear: (x, k = 1, b = 0) => k * x + b,

    quadratic: (x, a = 1, b = 0, c = 0) => a * x * x + b * x + c,

    sin: (x) => Math.sin(x)

};

function printGrid(scaleFactor) {

	const lineStyle = 'rgba(256, 256, 256, .1)';

  for (let i = 0; i <= canvas.height; i += scaleFactor) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.strokeStyle = lineStyle;
    ctx.stroke();
  } 

  for (let i = 0; i <= canvas.width; i += scaleFactor) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.strokeStyle = lineStyle;
    ctx.stroke();
  } 

}

function printNumbers(scaleFactor) {   

  let numberY = 0;
  let numberX = 0;

    for (let i = 0; i <= canvas.height; i += scaleFactor) {

			if (i == 0) {
				numberY++;
				continue;
			}

			ctx.font = '12px sans-serif';
			ctx.fillStyle = 'rgba(256, 256, 256, 1)';
			ctx.textAlign = 'left';
			ctx.textBaseline = 'middle';
			ctx.fillText(`${numberY}`, 0, i);

			numberY++;
			
    } 

  for (let i = 0; i <= canvas.width; i += scaleFactor) {

		if (i == 0) {
			numberX++;
			continue;
		}

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'rgba(256, 256, 256, 1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`${numberX}`, i, 0);

    numberX++;
  } 

}

function printGraph() {

  ctx.beginPath();

  for (let x = 0; x <= canvas.width; x += 1) {
    ctx.lineTo(x, 100 * functions.sin(x / 10) + 500);
  }

  ctx.strokeStyle = 'rgba(256, 256, 256, 1)';
  ctx.lineWidth = '2';
	ctx.stroke();

}

function printStatisticalGraph() {
  ctx.beginPath();
      ctx.moveTo(0, 0);
      lineTo(1, 1);
      lineTo(2, 4);
      lineTo(5, 3);
      lineTo(10, 8);
      lineTo(12, 3);
      lineTo(15, 11);
  lineTo(16, 1);
      lineTo(21, 4);
      lineTo(25, 3);
      lineTo(30, 8);
      lineTo(32, 3);
      lineTo(34, 11);

      ctx.lineWidth = '3';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
      ctx.strokeStyle = 'white';
      ctx.stroke();

  lineTo(34, 0);
  ctx.closePath();

  ctx.fillStyle = 'rgba(256, 256, 256, .4)';
  ctx.fill();
}

function printWorkSpace() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	printGrid(scaleFactor);
	printGrid(scaleFactor / 5);
	printNumbers(scaleFactor);

}

class Triangle {

    constructor(coordinates) {

        this.firstVertex = coordinates[0];
        this.secondVertex = coordinates[1]; 
        this.thirdVertex = coordinates[2];

        this.coordinates = [this.firstVertex, this.secondVertex, this.thirdVertex];

        this.vertexRadius = 5 / 50;
        this.linesColor = 'white';
        this.vertexColor = 'white';

        this.init();

    }

    draw() {

  			ctx.save()

        ctx.scale(scaleFactor, scaleFactor);

        ctx.beginPath();
        ctx.moveTo(this.firstVertex[0], this.firstVertex[1]);
        ctx.arc(this.firstVertex[0], this.firstVertex[1], this.vertexRadius, 0, Math.PI * 2, true);
        ctx.moveTo(this.secondVertex[0], this.secondVertex[1]);
        ctx.arc(this.secondVertex[0], this.secondVertex[1], this.vertexRadius, 0, Math.PI * 2, true);
        ctx.moveTo(this.thirdVertex[0], this.thirdVertex[1]);
        ctx.arc(this.thirdVertex[0], this.thirdVertex[1], this.vertexRadius, 0, Math.PI * 2, true);

        ctx.fillStyle = this.vertexColor;
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.firstVertex[0], this.firstVertex[1]);
        ctx.lineTo(this.secondVertex[0], this.secondVertex[1]);
        ctx.lineTo(this.thirdVertex[0], this.thirdVertex[1]);
        ctx.closePath();
        
        ctx.lineWidth = `${this.vertexRadius / 2}`;
        ctx.strokeStyle = this.linesColor;
        ctx.lineJoin = 'round';
        ctx.stroke(); 

        ctx.fillStyle = 'rgba(256, 256, 256, .5)';
        ctx.fill();
        
        ctx.restore();
        
    }

    init() {
        this.draw();
    }

}

printWorkSpace();

const triangle = new Triangle([[5, 10], [7.5, 5], [10, 10]]);

function onMove(vertex, e) {

  mouse = {
    x: e.clientX / scaleFactor,
    y: e.clientY / scaleFactor
  };

  vertex[0] = mouse.x;
	vertex[1] = mouse.y;

	printWorkSpace();

  triangle.draw();

}

function firstVertexMove(e) {
  onMove(triangle.firstVertex, e);
}

function secondVertexMove(e) {
  onMove(triangle.secondVertex, e);
}

function thirdVertexMove(e) {
  onMove(triangle.thirdVertex, e);
}

window.onload = function() {

  window.addEventListener('mousedown', (e) => {

  mouse = {
    x: e.clientX / scaleFactor,
    y: e.clientY / scaleFactor
  };

  if ( Math.abs(mouse.x - triangle.firstVertex[0]) <= triangle.vertexRadius && Math.abs(mouse.y - triangle.firstVertex[1]) <= triangle.vertexRadius ) {
    window.addEventListener('mousemove', firstVertexMove);
  } else if ( Math.abs(mouse.x - triangle.secondVertex[0]) <= triangle.vertexRadius && Math.abs(mouse.y - triangle.secondVertex[1]) <= triangle.vertexRadius ) {
    window.addEventListener('mousemove', secondVertexMove);
  } else if ( Math.abs(mouse.x - triangle.thirdVertex[0]) <= triangle.vertexRadius && Math.abs(mouse.y - triangle.thirdVertex[1]) <= triangle.vertexRadius ) {
    window.addEventListener('mousemove', thirdVertexMove);
  }
});

window.addEventListener('mouseup', () => {

    window.removeEventListener('mousemove', firstVertexMove);
    window.removeEventListener('mousemove', secondVertexMove);
    window.removeEventListener('mousemove', thirdVertexMove); 
  
});

}