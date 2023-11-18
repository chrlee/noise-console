export const mountCanvas = (canvas: HTMLCanvasElement) => {
  const dpi = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpi;
  canvas.height = canvas.offsetHeight * dpi;
}

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  delta: number,
  x: number,
  y1: number,
  y2: number
) => {
  ctx.moveTo(x,y1); 
  ctx.lineTo(x+delta,y2);
  ctx.stroke();
}

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  delta: number,
  x: number,
  y1: number,
  y2: number,
) => {
  ctx.moveTo(x,y1); 
  ctx.bezierCurveTo(x+(delta/2),y1,x+(delta/2),y2,x+delta,y2);
  ctx.stroke();
}

export const animateLinear = (ctx: CanvasRenderingContext2D, x?: number, y?: number, steps?: number, loops?: number) => {
  x = x || 0;
  steps = steps || 100;
  const delta = ctx.canvas.width / steps;
  y = y || 0;
  loops = loops || 0;
  const rand = Math.random()*ctx.canvas.height;
  ctx.strokeStyle = `rgba(${255-loops}, ${255-loops}, ${255-loops}, 1)`;
  drawLine(ctx, delta, x, y, rand);
  if(x<ctx.canvas.width) {
    requestAnimationFrame(function() {
      animateLinear(ctx, x + delta, rand, steps, loops);
    });
  } else {
    x = 0;
    loops = ((loops || 0)+20) % 255;
    ctx.beginPath();
    requestAnimationFrame(function() {
      animateLinear(ctx, x, rand, steps, loops);
    });
  }
}

export const animateCubic = (ctx: CanvasRenderingContext2D, x?: number, y?: number, steps?: number, loops?: number) => {
  x = x || 0;
  steps = steps || 100;
  const delta = ctx.canvas.width / steps;
  y = y || 0;
  loops = loops || 0;
  const rand = Math.random()*ctx.canvas.height;
  ctx.strokeStyle = `rgba(${255-loops}, ${255-loops}, ${255-loops}, 1)`;
  drawCurve(ctx, delta, x, y, rand);
  if(x<ctx.canvas.width) {
    requestAnimationFrame(function() {
      animateCubic(ctx, x + delta, rand, steps, loops);
    });
  } else {
    x = 0;
    loops = ((loops || 0)+20) % 255;
    ctx.beginPath();
    requestAnimationFrame(function() {
      animateCubic(ctx, x, rand, steps, loops);
    });
  }
}
