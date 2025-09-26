const getColorStyle = (color: string): React.CSSProperties => {
  switch (color.toLowerCase()) {
    case "white":
      return {
        backgroundColor: "white",
        border: "1px solid #ccc",
      };
    case "navy blue":
      return {
        backgroundColor: "#000080",
      };
    case "cream":
      return {
        backgroundColor: "#FFFDD0",
      };
    case "peach":
      return {
        backgroundColor: "#FFD3AC",
      };
    case "off white":
      return {
        backgroundColor: "#FAF9F6",
        border: "1px solid #ccc",
      };
    case "mauve":
      return {
        backgroundColor: "#E0B0FF",
        border: "1px solid #ccc",
      };
    case "multi":
      return {
        background:
          "linear-gradient(45deg, yellow 0%, brown 20%, green 60%, blue 80%)",
      };
    default:
      return {
        backgroundColor: color.toLowerCase(),
      };
  }
};

export default getColorStyle;
