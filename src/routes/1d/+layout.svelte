<script lang="ts">
  import { onMount } from "svelte";
  import { animate, mountCanvas } from "$lib/vis/2d";

  let canvas: HTMLCanvasElement;
  onMount(() => {
    if(canvas && canvas.getContext("2d")){
      mountCanvas(canvas);
      animate(canvas.getContext("2d"));
    }
  });

  const onResize = () => {
    if(canvas) mountCanvas(canvas);
  };
</script>

<svelte:window on:resize={onResize} />

<h1>1-Dimensional Noise Visualization</h1>
<slot canvas={canvas}/>

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
