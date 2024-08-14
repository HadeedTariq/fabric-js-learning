import { ChangeEvent, useRef, useState } from "react";
import { DrawingActions } from "./utils/constants";
import { TbRectangle } from "react-icons/tb";
import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { v4 as uuid } from "uuid";
import { FaLongArrowAltRight, FaRegCircle } from "react-icons/fa";
import { BsCursor } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";

const App = () => {
  const [action, setAction] = useState(DrawingActions.SELECT);
  const [fillColor, setFillColor] = useState("#0000");
  const [rectangles, setRectAngles] = useState<any>([]);
  const [circles, setCircles] = useState<any>([]);
  const [arrows, setArrows] = useState<any>([]);
  const [scribbles, setScribbles] = useState<any>([]);
  const [selectedElement, setSelectedElement] = useState({
    elementType: "",
    elementId: "",
  });
  const strokeColor = "#000";
  const stageRef = useRef<any>();
  const isPainting = useRef<any>();
  const currentShape = useRef<any>();
  const isDraggable = action === DrawingActions.SELECT;
  const transformerRef = useRef<any>();
  const onPointerDown = () => {
    if (action === DrawingActions.SELECT) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuid();
    currentShape.current = id;
    isPainting.current = true;
    switch (action) {
      case "RECTANGLE":
        setRectAngles([
          ...rectangles,
          {
            id,
            x,
            y,
            width: 20,
            height: 20,
            fillColor,
          },
        ]);
        break;
      case "CIRCLE":
        setCircles([
          ...circles,
          {
            x,
            y,
            id,
            radius: 20,
            fillColor,
          },
        ]);
        break;
      case "ARROW":
        setArrows([
          ...arrows,
          {
            id,
            points: [x, y, x + 20, y + 20],
            fillColor,
          },
        ]);
        break;
      case "SCRIBBLE":
        setScribbles([
          ...scribbles,
          {
            id,
            points: [x, y],
            fillColor,
          },
        ]);
    }
  };
  const onPointerMove = () => {
    if (!isPainting.current) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    switch (action) {
      case "RECTANGLE":
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
        break;
      case "ARROW":
        setArrows((arrows: any) =>
          arrows.map((arrow: any) => {
            if (arrow.id === currentShape.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;
      case "CIRCLE":
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
        break;
      case "SCRIBBLE":
        setScribbles((scribbles: any) =>
          scribbles.map((scribble: any) => {
            if (scribble.id === currentShape.current) {
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          })
        );
        break;
    }
  };
  const onPointerUp = () => {
    isPainting.current = false;
  };
  const onClick = (e: any, elemId: string, elemType: string) => {
    if (action !== DrawingActions.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
    setSelectedElement({
      elementId: elemId,
      elementType: elemType,
    });
  };
  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFillColor(e.target.value);
    if (selectedElement.elementId !== "") {
      switch (selectedElement.elementType) {
        case "rectangle":
          const rectanglesClone = [...rectangles];
          const rectangleIndex = rectanglesClone.findIndex(
            (rect) => rect.id === selectedElement.elementId
          );
          const rectangle = rectanglesClone.find(
            (rect) => rect.id === selectedElement.elementId
          );
          rectangle.fillColor = e.target.value;
          rectanglesClone[rectangleIndex] = rectangle;
          setRectAngles(rectanglesClone);
          break;
        case "circle":
          const circlesClone = [...circles];
          const circleIndex = circlesClone.findIndex(
            (cir) => cir.id === selectedElement.elementId
          );
          const circle = circlesClone.find(
            (cir) => cir.id === selectedElement.elementId
          );
          circle.fillColor = e.target.value;
          circlesClone[circleIndex] = circle;
          setCircles(circlesClone);
          break;

        case "scribble":
          const scribblesClone = [...scribbles];
          const scribbleIndex = scribblesClone.findIndex(
            (sccr) => sccr.id === selectedElement.elementId
          );
          const scribble = scribblesClone.find(
            (sccr) => sccr.id === selectedElement.elementId
          );
          scribble.fillColor = e.target.value;
          scribblesClone[scribbleIndex] = scribble;
          console.log(scribble);

          setScribbles(scribblesClone);
          break;

        case "arrow":
          const arrowsClone = [...arrows];
          const arrowIndex = arrowsClone.findIndex(
            (arr) => arr.id === selectedElement.elementId
          );
          const arrow = arrowsClone.find(
            (arr) => arr.id === selectedElement.elementId
          );
          arrow.fillColor = e.target.value;
          arrowsClone[arrowIndex] = arrow;

          setArrows(arrowsClone);
          break;
      }
    }
  };
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Controls */}
        <div className="absolute top-0 z-10 w-full py-2 ">
          <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
            <button
              className={
                action === DrawingActions.SELECT
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(DrawingActions.SELECT)}
            >
              <BsCursor size={"1.75rem"} />
            </button>
            <button
              className={
                action === DrawingActions.SCRIBBLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(DrawingActions.SCRIBBLE)}
            >
              <LuPencil size={"1.5rem"} />
            </button>
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
            <button
              className={
                action === DrawingActions.ARROW
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(DrawingActions.ARROW)}
            >
              <FaLongArrowAltRight size={"2rem"} />
            </button>
            <input
              type="color"
              value={fillColor}
              onChange={onColorChange}
              className="w-[28px] h-[28px] rounded-md"
            />
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
            <Rect
              x={0}
              y={0}
              height={window.innerHeight}
              width={window.innerWidth}
              fill="#ffffff"
              id="bg"
              onClick={() => {
                transformerRef.current.nodes([]);
                setSelectedElement({
                  elementId: "",
                  elementType: "",
                });
              }}
            />

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
                draggable={isDraggable}
                onClick={(e) => {
                  onClick(e, rectangle.id, "rectangle");
                }}
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
                draggable={isDraggable}
                onClick={(e) => {
                  onClick(e, circle.id, "circle");
                }}
                id={circle.id}
              />
            ))}
            {arrows?.map((arrow: any) => (
              <Arrow
                key={arrow.id}
                points={arrow.points}
                fill={arrow.fillColor}
                stroke={strokeColor}
                strokeWidth={2}
                draggable={isDraggable}
                onClick={(e) => {
                  onClick(e, arrow.id, "arrow");
                }}
              />
            ))}
            {scribbles?.map((scribble: any) => (
              <Line
                key={scribble.id}
                points={scribble.points}
                fill={scribble.fillColor}
                shadowColor={scribble.fillColor}
                lineCap="round"
                lineJoin="round"
                stroke={strokeColor}
                strokeWidth={2}
                draggable={isDraggable}
                onClick={(e) => {
                  onClick(e, scribble.id, "scribble");
                }}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default App;
