<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
  import { Color, PlaneGeometry } from 'three';
  import noise from '$lib/noise/perlin';
  /*
  let geometry: PlaneGeometry;

  let n = 24;
  let maxPoints = Math.pow(n, 2);
  let positions: Float32Array = new Float32Array(maxPoints * 3);
  let x = 0;
  let z = 0;
  let i = 0;

  useFrame(() => {
    const y = noise(x/10, z/10)*10;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    console.log(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    z += 1;
    if(z >= n) {
      z = 0;
      x += 1;
    }
    if(i < maxPoints)i += 1;
    else{
      i = 0;
      x = 0;
      z = 0;
    }
  })  
  */

  const color = new Color('#F5F5F5')
  const geometry = new PlaneGeometry(10, 10, 50, 50)
  const vertices = geometry.getAttribute('position').array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]
    // @ts-ignore
    vertices[i + 2] = noise(x / 3, y / 3)*6
  }
</script>

<T.PerspectiveCamera
  makeDefault
  on:create={({ ref }) => {
    ref.position.set(15, 20, 15)
  }}
>
  <OrbitControls
    autoRotate={true}
    autoRotateSpeed={0.5}
    enableDamping
    target.y={0}
  />
</T.PerspectiveCamera>

<T.Mesh {geometry} rotation={[-Math.PI / 2, 0, 0]}>
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
