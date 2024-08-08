import Konva from "konva";
import { useEffect, useState } from "react";
import { Stage, Layer, Image } from "react-konva";

export default function App() {
  const [image, setImage] = useState(new window.Image());
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
  );
}
