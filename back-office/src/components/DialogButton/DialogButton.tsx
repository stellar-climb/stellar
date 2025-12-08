import React, { useCallback, useState } from 'react';

type RenderFn = (args: { onOpen: () => void }) => React.ReactNode;
type ChildrenFn = (args: { onClose: () => void; onKeyDown: React.KeyboardEventHandler }) => React.ReactNode;

function DialogButton(props: { children: ChildrenFn; render: RenderFn; className?: string }) {
  // props destructure
  const { children, render, className } = props;

  // lib hooks
  // state hooks
  const [open, setOpen] = useState(false);

  // handlers
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleKeyDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  // component
  return (
    <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} className={className}>
      {render({ onOpen: handleOpen })}
      {open && children({ onClose: handleClose, onKeyDown: handleKeyDown })}
    </div>
  );
}

export { DialogButton };
