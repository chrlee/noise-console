<script lang="ts">
	import { onMount } from "svelte";
  import { animateLinear, animateCubic, mountCanvas } from "$lib/vis/2d";

  let linearCanvas: HTMLCanvasElement;
  let cubicCanvas: HTMLCanvasElement;
  onMount(() => {
    if(linearCanvas && linearCanvas.getContext("2d")){
      mountCanvas(linearCanvas);
      animateLinear(linearCanvas.getContext("2d"));
    }
    if(cubicCanvas && cubicCanvas.getContext("2d")){
      mountCanvas(cubicCanvas);
      animateCubic(cubicCanvas.getContext("2d"));
    }
  });

  const onResize = () => {
    if(linearCanvas) mountCanvas(linearCanvas);
    if(cubicCanvas) mountCanvas(cubicCanvas);
  };
</script>

<svelte:window on:resize={onResize} />

<h1>2D Visualization of 1-Dimensional Noise</h1>
<h2>Linear Interpolation</h2>
<canvas bind:this={linearCanvas} />

<h2>Cubic Interpolation</h2>
<canvas bind:this={cubicCanvas} />


<style>
  :global(canvas) {
    width: 100%;
    padding: 2rem 0;
    display: block;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>
