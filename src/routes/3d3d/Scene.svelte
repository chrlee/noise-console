<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
  import { Color, PlaneGeometry } from 'three';
  import noise from '$lib/noise/perlin';

  const color = new Color('#F5F5F5');
  let geometry = new PlaneGeometry(10, 10, 50, 50);
  let vertices = geometry.getAttribute('position').array;
  let maxFrames = 1000;
  let t = 0;

  useTask(() => {
    geometry = new PlaneGeometry(10, 10, 50, 50);
    vertices = geometry.getAttribute('position').array;
    for (let i = 0; i < vertices.length; i+=3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      // @ts-ignore
      vertices[i + 2] = noise(x / 3, y / 3, Math.sin((t / 1000) * 2 * Math.PI)) * 6;
    }
    if (t < maxFrames) {
      t++;
    } else {
      t = 0;
    }
  });
</script>

<T.PerspectiveCamera
  makeDefault
  on:create={({ ref }) => {
    ref.position.set(15, 15, 15)
  }}
>
  <OrbitControls
    enableDamping
    target.y={0}
  />
</T.PerspectiveCamera>

<T.Mesh bind:geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
  <T.MeshBasicMaterial
    wireframe={true}
    color={color}
  />
</T.Mesh>

<Grid
  gridSize={[12, 12]}
  cellColor={'#46536b'}
  sectionThickness={0}
/>
