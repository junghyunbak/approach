import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../App";
import { MarkerMenu } from "../MarkerMenu";

const wrapIcon = (content: string) => {
  return `<div style="position:absolute; top:-10px; left:-10px">${content}</div>`;
};

const MARKER_SVG =
  wrapIcon(`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V18C0 19.1046 0.895431 20 2 20H18C19.1046 20 20 19.1046 20 18V2C20 0.895431 19.1046 0 18 0H2ZM15 5H5V15H15V5Z" fill="#7381FF"/>
</svg>
`);

const MARKER_ACTIVE_SVG =
  wrapIcon(`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V18C0 19.1046 0.895431 20 2 20H18C19.1046 20 20 19.1046 20 18V2C20 0.895431 19.1046 0 18 0H2ZM15 5H5V15H15V5Z" fill="#FFCF73"/>
</svg>
`);

interface VertexMarkerProps {
  i: number;
  coord: naver.maps.Coord;
  editable?: boolean;
  setCoords: React.Dispatch<React.SetStateAction<naver.maps.Coord[]>>;

  /**
   * 마커 위치 변경 시 새로운 마커 생성을 막기 위한 상태
   */
  isMarkerEditing: boolean;
  setIsMarkerEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VertexMarker({
  i,
  coord,
  editable = false,
  setCoords,
  isMarkerEditing,
  setIsMarkerEditing,
}: VertexMarkerProps) {
  const map = useContext(MapContext);

  const [marker, setMarker] = useState<null | naver.maps.Marker>(null);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuX, setMenuX] = useState<number>(0);
  const [menuY, setMenuY] = useState<number>(0);

  /**
   * 현재 마커가 편집중인지를 나타내는 상태
   */
  const [isMarkerPosEditing, setIsMarkerPosEditing] = useState<boolean>(false);

  /**
   * 마커 생성 및 초기화
   */
  useEffect(() => {
    if (!map) {
      return;
    }

    const marker = new naver.maps.Marker({ map, position: coord });

    setMarker(marker);

    return () => {
      marker.setMap(null);
    };
  }, [map, coord]);

  /**
   * 메뉴 영역 이외를 클릭했을 경우, 메뉴 닫기
   */
  useEffect(() => {
    const handleOutOfMenuClick = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("click", handleOutOfMenuClick);

    return () => {
      window.removeEventListener("click", handleOutOfMenuClick);
    };
  }, []);

  /**
   * 마커 클릭하였을 경우 메뉴 창 활성화
   */
  useEffect(() => {
    if (!map || !marker) {
      return;
    }

    marker.addListener("click", (e: naver.maps.PointerEvent) => {
      const domEvent = e.pointerEvent as MouseEvent;

      domEvent.stopPropagation();

      if (!editable) {
        return;
      }

      setIsMenuOpen(true);
      setMenuX(domEvent.clientX);
      setMenuY(domEvent.clientY);
    });

    return () => {
      marker.clearListeners("click");
    };
  }, [map, marker, i, editable]);

  /**
   * 마커의 위치가 변경중인 상태에서, 지도 클릭 시 마커이동
   */
  useEffect(() => {
    if (!map || !marker || !isMarkerEditing || !isMarkerPosEditing) {
      return;
    }

    const listener = map.addListener("click", (e) => {
      setCoords((prev) => {
        const next = [...prev];

        next[i] = e.coord;

        return next;
      });

      setIsMarkerPosEditing(false);
      setIsMarkerEditing(false);
    });

    return () => {
      map.removeListener(listener);
    };
  }, [
    map,
    marker,
    isMarkerPosEditing,
    isMarkerEditing,
    setIsMarkerEditing,
    coord,
    i,
    setCoords,
  ]);

  /**
   * 마커 위치가 편집중인 상태에서 마커 스타일 변경
   */
  useEffect(() => {
    if (!marker) {
      return;
    }

    if (isMarkerPosEditing) {
      marker.setIcon({
        content: MARKER_ACTIVE_SVG,
      });
    } else {
      marker.setIcon({
        content: MARKER_SVG,
      });
    }
  }, [marker, isMarkerPosEditing]);

  /**
   * 마커 삭제, 위치이동 시 동작 함수
   */
  const handlePosMoveButtonClick = () => {
    setIsMenuOpen(false);

    setIsMarkerPosEditing(true);
    setIsMarkerEditing(true);
  };

  const handleRemoveButtonClick = () => {
    setCoords((prev) => {
      const next = [...prev];

      next.splice(i, 1);

      return next;
    });
  };

  return (
    <div>
      <MarkerMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        x={menuX}
        y={menuY}
        handleRemoveButtonClick={handleRemoveButtonClick}
        handlePosMoveButtonClick={handlePosMoveButtonClick}
      />
    </div>
  );
}
