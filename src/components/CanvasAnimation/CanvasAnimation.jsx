import React, { useEffect } from 'react';

const CanvasAnimation = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 500;
    canvas.height = 700;

    // Append canvas to the component
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.appendChild(canvas);

    // Realistic Neon Purple Flames Logic
    const particles = [];
    const trailParticles = [];

    function createParticle() {
      const particle = {
        x: canvas.width / 2 + (Math.random() - 0.5) * 20,
        y: canvas.height,
        radius: Math.random() * 8 + 5,
        color: `rgba(148, 0, 211, ${Math.random()})`,
        speed: Math.random() * 8 + 5,
        angle: Math.random() * 120 - 70,
      };

      particles.push(particle);

      // Create trailing particles for a more realistic effect
      for (let i = 0; i < 5; i++) {
        const trailParticle = {
          x: particle.x,
          y: particle.y,
          radius: particle.radius * 0.8,
          color: `rgba(148, 0, 211, ${Math.random() * 0.5})`,
        };
        trailParticles.push(trailParticle);
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.y -= particle.speed;
        particle.angle += 0.02;

        particle.x += Math.sin(particle.angle) * 2;

        if (particle.radius > 0.2) particle.radius -= 0.1;

        if (particle.radius <= 0.2) {
          particles.splice(index, 1);
        }
      });

      // Draw trailing particles
      trailParticles.forEach((trailParticle, index) => {
        ctx.beginPath();
        ctx.arc(trailParticle.x, trailParticle.y, trailParticle.radius, 0, Math.PI * 2);
        ctx.fillStyle = trailParticle.color;
        ctx.fill();

        trailParticle.radius *= 0.6;

        if (trailParticle.radius < 0.1) {
          trailParticles.splice(index, 1);
        }
      });
    }

    function animate() {
      createParticle();
      drawParticles();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      canvasContainer.removeChild(canvas);
    };
  }, []);

  return (
    <div id="canvas-container" style={{ height: '300px', width: '500px', position: 'relative' }} />
  );
};

export default CanvasAnimation;
