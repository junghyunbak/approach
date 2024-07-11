import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../App";

interface VertexMarkerProps {
  i: number;
  coord: naver.maps.Coord;
  setCoords: React.Dispatch<React.SetStateAction<naver.maps.Coord[]>>;
}

export function VertexMarker({ coord, i, setCoords }: VertexMarkerProps) {
  const map = useContext(MapContext);

  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }

    const marker = new naver.maps.Marker({ map, position: coord });

    marker.addListener("click", (e) => {
      setCoords((prev) => {
        const next = [...prev];

        next.splice(i, 1);

        return next;
      });
    });

    setMarker(marker);
  }, [map, setCoords, i, coord]);

  useEffect(() => {
    if (!marker) {
      return;
    }

    return () => {
      marker.setMap(null);
    };
  }, [marker]);

  return <div>{/* VertexMarker 함수 컴포넌트 */}</div>;
}
