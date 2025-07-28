import { useEffect, useRef, useState } from "react";

export function Animation() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [color, setColor] = useState({ r: 255, g: 100, b: 150 });
  const [scale, setScale] = useState(1);
  const animationRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;

      // Circular motion for position
      const angle = (elapsed * 0.002) % (Math.PI * 2);
      const centerX = 200;
      const centerY = 150;
      const radius = 80;

      setPosition({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });

      // Color cycling
      const colorCycle = elapsed * 0.003;
      setColor({
        r: Math.floor(127 + Math.sin(colorCycle) * 127),
        g: Math.floor(127 + Math.sin(colorCycle + Math.PI / 3) * 127),
        b: Math.floor(127 + Math.sin(colorCycle + (2 * Math.PI) / 3) * 127),
      });

      // Pulsing scale
      setScale(1 + Math.sin(elapsed * 0.005) * 0.3);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const ballStyle: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    boxShadow: `0 0 20px rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
  };

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
        border: "2px solid #333",
        borderRadius: "10px",
        position: "relative",
        backgroundColor: "#111",
        margin: "20px auto",
        overflow: "hidden",
      }}
    >
      <div style={ballStyle}></div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "#fff",
          fontSize: "12px",
          fontFamily: "monospace",
        }}
      >
        Position: ({Math.round(position.x)}, {Math.round(position.y)})
        <br />
        Scale: {scale.toFixed(2)}
      </div>
    </div>
  );
}
