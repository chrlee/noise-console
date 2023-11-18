<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { Grid, MeshLineGeometry, MeshLineMaterial, OrbitControls } from '@threlte/extras';
  import { Color, Vector3 } from 'three';

  let maxPoints = 1000;
  let dashOffset = 0;
  let color = new Color()
  const orange = new Color('#F5F5F5')
  const purple = new Color('#D32F2F');
  let positions: Vector3[] = Array.from({ length: maxPoints }, () => new Vector3());
  let i = 0;

  function getPoint() {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random());
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);
    const x = r * sinPhi * cosTheta * 5;
    const y = r * sinPhi * sinTheta* 5;
    const z = r * cosPhi* 5;
    return new Vector3(x, y, z);
  }

  useFrame((state, delta) => {
    // every frame we:
    // increase the dash offset
    dashOffset += delta / 2
    // transition between two colors
    color.lerpColors(orange, purple, Math.sin(dashOffset * 2) / 2 + 0.5); 
    positions[i++] = getPoint()
  })  
</script>

<T.PerspectiveCamera
  makeDefault
  on:create={({ ref }) => {
    ref.position.set(15, 10, 15)
  }}
>
  <OrbitControls
    autoRotate={true}
    autoRotateSpeed={1}
    enableDamping
    target.y={5}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh position={[0, 8, 0]}>
  <MeshLineGeometry points={positions} />
  <MeshLineMaterial
    color={color}
    lineWidth={0.001}
    attenuate={false}
    {dashOffset}
  />
</T.Mesh>

<Grid
  gridSize={[12, 12]}
  cellColor={'#46536b'}
  sectionThickness={0}
/>
