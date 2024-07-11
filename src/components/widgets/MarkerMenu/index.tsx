import React from "react";

interface MarkerMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  x: number;
  y: number;
  handleRemoveButtonClick?: () => void;
  handlePosMoveButtonClick?: () => void;
}

export function MarkerMenu({
  isOpen,
  setIsOpen,
  x,
  y,
  handlePosMoveButtonClick = () => {},
  handleRemoveButtonClick = () => {},
}: MarkerMenuProps) {
  const handleMenuCloseButtonClick = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {/* MarkerMenu 함수 컴포넌트 */}
      <div
        style={{
          zIndex: 9999,
          position: "fixed",
          top: `${y}px`,
          left: `${x}px`,
        }}
      >
        <button type="button" onClick={handleRemoveButtonClick}>
          삭제
        </button>
        <button type="button" onClick={handlePosMoveButtonClick}>
          위치변경
        </button>
        <button type="button" onClick={handleMenuCloseButtonClick}>
          x
        </button>
      </div>
    </div>
  );
}
