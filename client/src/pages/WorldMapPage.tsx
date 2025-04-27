import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

// Import the TopoJSON file
import worldAtlas from "world-atlas/countries-110m.json";

// Cast the whole thing once
const geoData = feature(
  worldAtlas as unknown as Topology, // ✅ full cast once
  (worldAtlas as any).objects.countries // ✅ access .objects.countries without retyping
);

export default function WorldMapPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">World Map</h1>

      <div className="bg-slate-800 rounded-2xl shadow-md p-6 w-full max-w-6xl">
        <ComposableMap
          projection="geoEqualEarth"
          width={800}
          height={500}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#334155",
                      outline: "none",
                    },
                    hover: {
                      fill: "#38bdf8",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#0ea5e9",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}
