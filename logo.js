const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// el semicírculo 
ctx.beginPath();
ctx.arc(100, 100, 37.5, 0, Math.PI);
ctx.fillStyle = 'gray';
ctx.fill();

// el palo
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(100, 67.5);
ctx.strokeStyle = 'black';
ctx.stroke();

// el triángulo
ctx.beginPath();
ctx.moveTo(100, 67.5);
ctx.lineTo(115, 81.25);
ctx.lineTo(100, 81.25);
ctx.closePath();
ctx.fillStyle = 'red';
ctx.fill();
