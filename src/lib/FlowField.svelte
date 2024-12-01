<!-- lib/FlowField.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { noise2 } from './noise/perlin';
  
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let animationId: number;
    let width: number;
    let height: number;
  
    // Particle system parameters
    const maxParticles = 5000; // Increased max particles
    const emissionRate = 20;   // Increased emission rate
    const particleLifespan = 150;
    const noiseScale = 0.003;
    const speed = 1;
    let zoff = 0;
  
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      lifespan: number;
    };
  
    const particles: Particle[] = [];
  
    // Emit particles across the canvas
    function emitParticles() {
      for (let i = 0; i < emissionRate; i++) {
        if (particles.length < maxParticles) {
          // Create particles at random positions across the canvas
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            age: 0,
            lifespan: particleLifespan * (0.8 + Math.random() * 0.4)
          });
        }
      }
    }
  
    onMount(() => {
      ctx = canvas.getContext('2d')!;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
  
      // Initial particle seeding
      for (let i = 0; i < maxParticles / 2; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          age: Math.floor(Math.random() * particleLifespan), // Random initial age
          lifespan: particleLifespan * (0.8 + Math.random() * 0.4)
        });
      }
  
      animate();
  
      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', handleResize);
      };
    });
  
    function animate() {
      // Lighter trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
  
      // Emit new particles
      emitParticles();
  
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.age++;
  
        if (particle.age >= particle.lifespan) {
          particles.splice(i, 1);
          continue;
        }
  
        // Calculate alpha based on particle age
        // Fade in and out
        const alpha = Math.min(
          1 - (particle.age / particle.lifespan),
          particle.age / (particle.lifespan * 0.1)
        );
  
        // Update movement
        let noiseValue = noise2(
          particle.x * noiseScale, 
          particle.y * noiseScale + zoff
        );
        let angle = noiseValue * Math.PI * 4;
  
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;
  
        particle.x += particle.vx;
        particle.y += particle.vy;
  
        // Wrap particles around the screen instead of removing them
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;
  
        // Draw particle with fade effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`;
        ctx.fill();
      }
  
      zoff += 0.0003;
      animationId = requestAnimationFrame(animate);
    }
  </script>
  
  <canvas
    bind:this={canvas}
    style="background: black;"
  />
  
  <style>
    canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>