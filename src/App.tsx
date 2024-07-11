import React, { createContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VertexMarker } from "./components/overlays/VertexMarker";
import { Polyline } from "./components/overlays/Polyline";

type MapContextValue = naver.maps.Map | null;

export const MapContext = createContext<MapContextValue>({} as MapContextValue);

interface MapContextProviderProps {
  children: React.ReactNode;
  value: MapContextValue;
}

export function MapContextProvider({
  children,
  value,
}: MapContextProviderProps) {
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

function App() {
  const [map, setMap] = useState<null | naver.maps.Map>(null);

  const [coords, setCoords] = useState<naver.maps.Coord[]>([]);

  /**
   * 지도 초기화
   */
  useEffect(() => {
    const map = new naver.maps.Map("map", {});

    setMap(map);
  }, []);

  /**
   * 마커 & 폴리라인 그리기 예제
   */
  useEffect(() => {
    if (!map) {
      return;
    }

    naver.maps.Event.addListener(map, "click", (e: naver.maps.PointerEvent) => {
      const point = e.coord;

      setCoords((prev) => {
        return [...prev, point];
      });
    });
  }, [map]);

  return (
    <div className="App">
      <div id="map" />

      <MapContextProvider value={map}>
        {coords.map((coord, i) => {
          return (
            <VertexMarker
              i={i}
              setCoords={setCoords}
              coord={coord}
              key={[coord.x, coord.y, i].join("")}
            />
          );
        })}

        <Polyline coords={coords} />
      </MapContextProvider>
    </div>
  );
}

export default App;
