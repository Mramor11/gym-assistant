import React, { useEffect, useRef } from "react";
import "../App.css"; // Подключаем стили

function BackgroundParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Устанавливаем размер холста
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Создаём массив частиц
        const particles = [];
        const numParticles = 50;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 2,
                speed: Math.random() * 0.5 + 0.2,
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < numParticles; i++) {
                const p = particles[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(150, 150, 150, 0.3)";
                ctx.fill();

                p.y -= p.speed;
                if (p.y < 0) p.y = canvas.height;
            }

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <canvas ref={canvasRef} className="background-canvas"></canvas>;
}

export default BackgroundParticles;