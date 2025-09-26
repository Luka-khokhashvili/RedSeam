const getHiddenPages = (
  pages: (number | "...")[],
  ellipsisIndex: number
): number[] => {
  let prevVisible: number | null = null;
  for (let i = ellipsisIndex - 1; i >= 0; i--) {
    const v = pages[i];
    if (typeof v === "number") {
      prevVisible = v;
      break;
    }
  }

  let nextVisible: number | null = null;
  for (let i = ellipsisIndex + 1; i < pages.length; i++) {
    const v = pages[i];
    if (typeof v === "number") {
      nextVisible = v;
      break;
    }
  }

  if (prevVisible == null || nextVisible == null) return [];

  const start = prevVisible + 1;
  const end = nextVisible - 1;
  if (start > end) return [];

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default getHiddenPages;
