import { type Dispatch, type ReactNode, type SetStateAction, useState } from "react";
import { Sheet } from "tamagui";

export function SheetModal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<any>>;
  children: ReactNode;
}) {
  const [position, setPosition] = useState(0);
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="fit"
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="medium"
    >
      <Sheet.Overlay
        animation="lazy"
        bg="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame justify="center" items="center" p="$3">
        {children}
      </Sheet.Frame>
    </Sheet>
  );
}
