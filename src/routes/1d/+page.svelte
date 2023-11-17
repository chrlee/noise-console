<script lang="ts">
	import { onMount } from "svelte";
  import { animate, mountCanvas } from "$lib/vis/2d";

  export let canvas: HTMLCanvasElement;
  onMount(() => {
    if(canvas && canvas.getContext("2d")){
      mountCanvas(canvas);
      animate(canvas.getContext("2d"));
    }
  });

  const onResize = () => {
    console.log("resize");
    if(canvas) mountCanvas(canvas);
  };
</script>

<svelte:window on:resize={onResize} />

<canvas bind:this={canvas} />


