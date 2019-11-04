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

			ctx.font = '14px sans-serif';
			ctx.fillStyle = 'rgba(256, 256, 256, .4)';
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

    ctx.font = '14px sans-serif';
    ctx.fillStyle = 'rgba(256, 256, 256, .4)';
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

function printWorkingSpace() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	printGrid(scaleFactor);
	printGrid(scaleFactor / 5);
  printNumbers(scaleFactor);
  
  Triangle.store.forEach((triangle) => {
    triangle.draw();
  });

}

class Triangle {

    constructor(vertices, options) {

      Triangle.store.push(this);

        this.vertices = [vertices[0], vertices[1], vertices[2]];

        this.vertexRadius = options.vertexRadius;
        this.edgesColor = options.edgesColor;
        this.vertexColor = options.vertexColor;

    }

    draw() {

  			ctx.save()

        ctx.scale(scaleFactor, scaleFactor);

        ctx.beginPath();
        ctx.moveTo(this.vertices[0][0], this.vertices[0][1]);
        ctx.lineTo(this.vertices[1][0], this.vertices[1][1]);
        ctx.lineTo(this.vertices[2][0], this.vertices[2][1]);
        ctx.closePath();
        
        ctx.lineWidth = `${this.vertexRadius / 2}`;
        ctx.strokeStyle = this.edgesColor;
        ctx.lineJoin = 'round';
        ctx.stroke(); 

        ctx.fillStyle = 'rgba(256, 256, 256, .1)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.vertices[0][0], this.vertices[0][1]);
        ctx.arc(this.vertices[0][0], this.vertices[0][1], this.vertexRadius, 0, Math.PI * 2, true);
        ctx.moveTo(this.vertices[1][0], this.vertices[1][1]);
        ctx.arc(this.vertices[1][0], this.vertices[1][1], this.vertexRadius, 0, Math.PI * 2, true);
        ctx.moveTo(this.vertices[2][0], this.vertices[2][1]);
        ctx.arc(this.vertices[2][0], this.vertices[2][1], this.vertexRadius, 0, Math.PI * 2, true);

        ctx.fillStyle = this.vertexColor;
        ctx.fill();
        
        ctx.restore();
        
    }

}

Triangle.store = [];

triangleOptions = {
  vertexRadius: 5 / 50,
  edgesColor: 'black',
  vertexColor: 'black'
};

function onMove(triangle, vertexIndex, e, event) {

  mouse = {
    x: event.clientX / scaleFactor,
    y: event.clientY / scaleFactor
  };

  triangle.vertices[vertexIndex][0] = mouse.x;
  triangle.vertices[vertexIndex][1] = mouse.y;

	printWorkingSpace();

}

let onMoveListener;

window.onload = function() {

  document.addEventListener('mousedown', (e) => {

  mouse = {
    x: e.clientX / scaleFactor,
    y: e.clientY / scaleFactor
  };

  Triangle.store.forEach((triangle) => {
    triangle.vertices.forEach((vertex, vertexIndex) => {
      if ( Math.abs(mouse.x - vertex[0]) <= triangle.vertexRadius && Math.abs(mouse.y - vertex[1]) <= triangle.vertexRadius ) {
        document.addEventListener('mousemove', onMoveListener = onMove.bind(null, triangle, vertexIndex, e));
      }
    });
  });

});

document.addEventListener('mouseup', () => {

    document.removeEventListener('mousemove', onMoveListener);
  
});

}

const triangle = new Triangle([[10.16, 8.1], [2, 5], [10.54, 5.66]], triangleOptions);
const triangle1 = new Triangle([[5.92, 4.2], [8.6, 2.4], [11.62, 4.3]], triangleOptions);
const triangle2 = new Triangle([[13, 1], [18.2, 5], [13.36, 7.52]], triangleOptions);
const triangle3 = new Triangle([[4.54, 9.64], [7.62, 8.86], [18.8, 12.48]], triangleOptions);
const triangle4 = new Triangle([[14, 12], [7.72, 11.3], [15.14, 16.18]], triangleOptions);
const triangle5 = new Triangle([[8.66, 13.64], [3, 14], [2.9, 11.4]], triangleOptions);

printWorkingSpace();
