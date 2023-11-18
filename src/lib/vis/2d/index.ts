export const mountCanvas = (canvas: HTMLCanvasElement, fullScreen?: boolean) => {
  const dpi = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpi;
  if(fullScreen) canvas.height = canvas.offsetHeight * dpi;
}

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  ctx.moveTo(x1,y1); 
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cpx1: number,
  cpy1: number,
  cpx2: number,
  cpy2: number,
) => {
  ctx.moveTo(x1,y1); 
  ctx.bezierCurveTo(cpx1,cpy1,cpx2,cpy2,x2,y2);
  ctx.stroke();
}

export const animateLinear = (ctx: CanvasRenderingContext2D, x?: number, y?: number, steps?: number, loops?: number) => {
  x = x || 0;
  steps = steps || 50;
  const delta = ctx.canvas.width / steps;
  y = y || 0;
  loops = loops || 0;
  const rand = Math.random()*ctx.canvas.height;
  ctx.strokeStyle = `rgba(${255-loops}, ${255-loops}, ${255-loops}, 1)`;
  drawLine(ctx, x, y, x + delta, rand);
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

export const animate2dLinear = (ctx: CanvasRenderingContext2D, x?: number, y?: number, loops?: number) => {
  x = x || (Math.random()*ctx.canvas.width/2) + ctx.canvas.width/4;
  y = y || (Math.random()*ctx.canvas.height/2) + ctx.canvas.height/4;
  loops = loops || 0;
  const randX = (Math.random()*ctx.canvas.width/2) + ctx.canvas.width/4;
  const randY = (Math.random()*ctx.canvas.height/2) + ctx.canvas.height/4;
  ctx.strokeStyle = `rgba(${255-loops}, ${255-loops}, ${255-loops}, 1)`;
  drawLine(ctx, x, y, randX, randY);
  if(loops >= 255) {
    loops = 0;
    ctx.beginPath();
  }
  requestAnimationFrame(function() {
    animate2dLinear(ctx, randX, randY, ++loops);
  });
}

export const animateCubic = (ctx: CanvasRenderingContext2D, x?: number, y?: number, steps?: number, loops?: number) => {
  x = x || 0;
  steps = steps || 50;
  const delta = ctx.canvas.width / steps;
  y = y || 0;
  loops = loops || 0;
  const rand = Math.random()*ctx.canvas.height;
  ctx.strokeStyle = `rgba(${255-loops}, ${255-loops}, ${255-loops}, 1)`;
  drawCurve(ctx, x, y, x + delta, rand, x + (delta/2), y, x + (delta/2), rand);
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
