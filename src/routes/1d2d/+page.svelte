<script lang="ts">
	import { onMount } from "svelte";
  import { animate2dLinear, mountCanvas } from "$lib/vis/2d";

  let linearCanvas: HTMLCanvasElement;
  onMount(() => {
    if(linearCanvas && linearCanvas.getContext("2d")){
      mountCanvas(linearCanvas, true);
      animate2dLinear(linearCanvas.getContext("2d"));
    }
  });

  const onResize = () => {
    if(linearCanvas) mountCanvas(linearCanvas);
  };
</script>

<svelte:window on:resize={onResize} />

<h1>2D Visualization of 2D Noise</h1>
<p>2 output dimensions (x, y) are derived from a single input dimension (time).</p>

<canvas bind:this={linearCanvas} />


<style>
  canvas {
    height: 100%;
  }
</style>
