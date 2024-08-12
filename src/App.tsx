import { useRef, useState } from "react";
import { DrawingActions } from "./utils/constants";
import { TbRectangle } from "react-icons/tb";
import { Circle, Layer, Rect, Stage } from "react-konva";
import { v4 as uuid } from "uuid";
import { FaRegCircle } from "react-icons/fa";

const App = () => {
  const [action, setAction] = useState(DrawingActions.SELECT);
  const [rectangles, setRectAngles] = useState<any>([]);
  const [circles, setCircles] = useState<any>([]);
  const strokeColor = "#000";
  const stageRef = useRef<any>();
  const isPainting = useRef<any>();
  const currentShape = useRef<any>();
  const onPointerDown = () => {
    if (action === DrawingActions.SELECT) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuid();
    currentShape.current = id;
    isPainting.current = true;
    if (action === DrawingActions.RECTANGLE) {
      setRectAngles([
        ...rectangles,
        {
          id,
          x,
          y,
          height: 20,
          width: 20,
          fillColor: "#ff0000",
        },
      ]);
    } else {
      setCircles([
        ...circles,
        {
          id,
          x,
          y,
          radius: 20,
          fillColor: "#ff0000",
        },
      ]);
    }
  };

  const onPointerMove = () => {
    if (!isPainting.current || action === DrawingActions.SELECT) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    if (action === DrawingActions.RECTANGLE) {
      setRectAngles((rectangles: any) =>
        rectangles.map((rectangle: any) => {
          if (rectangle.id === currentShape.current) {
            return {
              ...rectangle,
              width: x - rectangle.x,
              height: y - rectangle.y,
            };
          }
          return rectangle;
        })
      );
    } else {
      setCircles((circles: any) =>
        circles.map((circle: any) => {
          if (circle.id === currentShape.current) {
            return {
              ...circle,
              radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
            };
          }
          return circle;
        })
      );
    }
  };
  const onPointerUp = () => {
    isPainting.current = false;
  };
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Controls */}
        <div className="absolute top-0 z-10 w-full py-2 ">
          <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
            <button
              className={
                action === DrawingActions.RECTANGLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(DrawingActions.RECTANGLE)}
            >
              <TbRectangle size={"2rem"} />
            </button>
            <button
              className={
                action === DrawingActions.CIRCLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(DrawingActions.CIRCLE)}
            >
              <FaRegCircle size={"1.5rem"} />
            </button>
          </div>
        </div>
        <Stage
          ref={stageRef as any}
          height={window.innerHeight}
          width={window.innerWidth}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <Layer>
            {/* <Rect
              x={0}
              y={0}
              height={window.innerHeight}
              width={window.innerWidth}
              fill="#ffffff"
              id="bg"
            /> */}

            {rectangles?.map((rectangle: any) => (
              <Rect
                key={rectangle.id}
                x={rectangle.x}
                y={rectangle.y}
                stroke={strokeColor}
                strokeWidth={2}
                fill={rectangle.fillColor}
                height={rectangle.height}
                width={rectangle.width}
                // draggable={isDraggable}
                // onClick={onClick}
              />
            ))}
            {circles.map((circle: any) => (
              <Circle
                key={circle.id}
                x={circle.x}
                y={circle.y}
                radius={circle.radius}
                fill={circle.fillColor}
                stroke={strokeColor}
                strokeWidth={2}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default App;
