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

<h1>2D Visualization of 2-Dimensional Noise</h1>
<canvas bind:this={linearCanvas} />


<style>
  canvas {
    height: 100%;
  }
</style>
