type Actions = {
  [key in
    | "SELECT"
    | "RECTANGLE"
    | "CIRCLE"
    | "SCRIBBLE"
    | "ARROW"
    | "PENCIL"
    | "ERASER"]: string;
};

export const DrawingActions: Actions = {
  SELECT: "SELECT",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  SCRIBBLE: "SCRIBBLE",
  ARROW: "ARROW",
  PENCIL: "PENCIL",
  ERASER: "ERASER",
};
