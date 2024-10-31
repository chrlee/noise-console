<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<h1>3D Visualization of 3D Noise</h1>
<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    width: 100%;
    height: 100%;  
  }
</style>
