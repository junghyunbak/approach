import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../../App";

interface PolylineProps {
  coords: naver.maps.Coord[];
}

export function Polyline({ coords }: PolylineProps) {
  const map = useContext(MapContext);

  const [polyline, setPolyline] = useState<naver.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }

    const polyline = new naver.maps.Polyline({
      map,
      path: coords,
      strokeWeight: 3,
      strokeColor: "#7381FF",
      clickable: true,
    });

    setPolyline(polyline);

    return () => {
      polyline.setMap(null);
    };
  }, [map, coords]);

  return <div>{/* Polyline 함수 컴포넌트 */}</div>;
}
