import Konva from "konva";
import { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import { DrawingActions } from "./utils/constants";
import { GiArrowCursor } from "react-icons/gi";
import { TbRectangle } from "react-icons/tb";
import { FaLongArrowAltRight, FaRegCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

export default function App() {
  const [image, setImage] = useState(new window.Image());
  const [action, setAction] = useState(DrawingActions.SELECT);
  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.target.setAttrs({
      shadowOffSet: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };
  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };

  useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
    setImage(img);
  }, []);

  return (
    <div className="relative w-full h-full ">
      <div className="absolute w-fit h-[50px] border-2 top-0  flex items-center mx-[45%]  p-2 gap-3 z-50">
        <button
          className={`cursor-pointer hover:border-2 ${
            action === DrawingActions.SELECT
              ? "bg-violet-300 p-1 rounded-md"
              : "p-1 bg-violet-100"
          }`}
          onClick={() => {
            setAction(DrawingActions.SELECT);
          }}
        >
          <GiArrowCursor size={25} className="cursor-pointer" />
        </button>
        <button
          className={`cursor-pointer hover:border-2 ${
            action === DrawingActions.RECTANGLE
              ? "bg-violet-300 p-1 rounded-md"
              : "p-1 bg-violet-100"
          }`}
          onClick={() => {
            setAction(DrawingActions.RECTANGLE);
          }}
        >
          <TbRectangle size={25} className="cursor-pointer" />
        </button>
        <button
          className={`cursor-pointer hover:border-2 ${
            action === DrawingActions.CIRCLE
              ? "bg-violet-300 p-1 rounded-md"
              : "p-1 bg-violet-100"
          }`}
          onClick={() => {
            setAction(DrawingActions.CIRCLE);
          }}
        >
          <FaRegCircle size={25} className="cursor-pointer" />
        </button>
        <button
          className={`cursor-pointer hover:border-2 ${
            action === DrawingActions.PENCIL
              ? "bg-violet-300 p-1 rounded-md"
              : "p-1 bg-violet-100"
          }`}
          onClick={() => {
            setAction(DrawingActions.PENCIL);
          }}
        >
          <GoPencil size={25} className="cursor-pointer" />
        </button>
        <button
          className={`cursor-pointer hover:border-2 ${
            action === DrawingActions.ARROW
              ? "bg-violet-300 p-1 rounded-md"
              : "p-1 bg-violet-100"
          }`}
          onClick={() => {
            setAction(DrawingActions.ARROW);
          }}
        >
          <FaLongArrowAltRight size={25} className="cursor-pointer" />
        </button>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            x={50}
            y={50}
            width={200}
            height={200}
            image={image}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        </Layer>
      </Stage>
    </div>
  );
}
