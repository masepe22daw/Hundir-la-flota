const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//  el semicírculo (el cuerpo del barco)
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI);
ctx.fillStyle = 'gray';
ctx.fill();

//  la línea de palo
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(100, 70);
ctx.strokeStyle = 'black';
ctx.stroke();

//  el triángulo (la bandera)
ctx.beginPath();
ctx.moveTo(100, 70);
ctx.lineTo(120, 85);
ctx.lineTo(100, 85);
ctx.closePath();
ctx.fillStyle = 'red';
ctx.fill();