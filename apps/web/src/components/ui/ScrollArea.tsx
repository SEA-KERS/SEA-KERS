/* oxlint-disable react/only-export-components */
import type { ComponentProps } from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

function ScrollAreaRoot(
  props: ComponentProps<typeof ScrollAreaPrimitive.Root>,
) {
  return <ScrollAreaPrimitive.Root {...props} />;
}

function ScrollAreaViewport(
  props: ComponentProps<typeof ScrollAreaPrimitive.Viewport>,
) {
  return <ScrollAreaPrimitive.Viewport {...props} />;
}

function ScrollAreaScrollbar(
  props: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>,
) {
  return <ScrollAreaPrimitive.Scrollbar {...props} />;
}

function ScrollAreaThumb(props: ComponentProps<typeof ScrollAreaPrimitive.Thumb>) {
  return <ScrollAreaPrimitive.Thumb {...props} />;
}

function ScrollAreaContent(
  props: ComponentProps<typeof ScrollAreaPrimitive.Content>,
) {
  return <ScrollAreaPrimitive.Content {...props} />;
}

function ScrollAreaCorner(
  props: ComponentProps<typeof ScrollAreaPrimitive.Corner>,
) {
  return <ScrollAreaPrimitive.Corner {...props} />;
}

export const ScrollArea = Object.assign(ScrollAreaRoot, {
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Content: ScrollAreaContent,
  Corner: ScrollAreaCorner,
}) as typeof ScrollAreaRoot & {
  Root: typeof ScrollAreaRoot;
  Viewport: typeof ScrollAreaViewport;
  Scrollbar: typeof ScrollAreaScrollbar;
  Thumb: typeof ScrollAreaThumb;
  Content: typeof ScrollAreaContent;
  Corner: typeof ScrollAreaCorner;
};
