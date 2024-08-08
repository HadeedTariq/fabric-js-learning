import { useEffect, useRef, useState } from "react";

function App() {
  const [mouseData, setMouseData] = useState<any>({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [canvasCTX, setCanvasCTX] = useState<any>(null);
  const [color, setColor] = useState<any>("#000000");
  const [size, setSize] = useState<any>(10);
  const [shapeMode, setShapeMode] = useState(false);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasCTX(ctx);
  }, [canvasRef]);

  const SetPos = (e: any) => {
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const Draw = (e: any) => {
    if (e.buttons !== 1) return;
    const ctx = canvasCTX;
    ctx.beginPath();
    ctx.moveTo(mouseData.x, mouseData.y);
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseEnter={(e) => {
          SetPos(e);
        }}
        onMouseMove={(e) => Draw(e)}
        onMouseDown={(e) => {
          if (!shapeMode) {
            SetPos(e);
          }
        }}
      ></canvas>

      <div
        className="controlpanel"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
      >
        <input
          type="range"
          value={size}
          max={40}
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <button onClick={() => setShapeMode((prev) => !prev)}>
          Shape Mode
        </button>
        <button
          onClick={() => {
            const ctx = canvasCTX;
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
