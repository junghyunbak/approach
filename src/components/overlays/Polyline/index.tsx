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

    if (polyline) {
      polyline.setMap(null);
    }

    setPolyline(
      new naver.maps.Polyline({
        map,
        path: coords,
      })
    );
  }, [map, coords]);

  return <div>{/* Polyline 함수 컴포넌트 */}</div>;
}
