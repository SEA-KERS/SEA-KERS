/* oxlint-disable react/only-export-components */
import type { ComponentProps } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

function DialogRoot(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />;
}

type DialogContentProps = Omit<
  ComponentProps<typeof DialogPrimitive.Popup>,
  "className"
> & {
  className?: string;
};

/** Portal + backdrop + panel in one. Base UI renders role="dialog" but does not
 *  add aria-modal, so it is supplied here for every dialog on the site. The
 *  panel sizes to its content so the full record is visible without scrolling. */
function DialogContent({
  className = "dialog-panel",
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="dialog-backdrop" />
      <DialogPrimitive.Popup
        aria-modal="true"
        className={`dialog-popup ${className}`}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

function DialogTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title {...props} />;
}

function DialogDescription(
  props: ComponentProps<typeof DialogPrimitive.Description>,
) {
  return <DialogPrimitive.Description {...props} />;
}

function DialogClose(props: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />;
}

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
}) as typeof DialogRoot & {
  Root: typeof DialogRoot;
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Close: typeof DialogClose;
};
