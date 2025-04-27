import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { fetchChallenges, submitFlag } from "../services/challenge";
import { categoryHexColors, Challenge } from "../../../shared/types/challenge";
import worldAtlas from "world-atlas/countries-110m.json";
import { useAuth } from "../context/AuthContext";
import { parseErrorMessage } from "../utils/parseErrorMessage";
import ChallengeCard from "../components/challenge/ChallengeCard";

const geoData = feature(
  worldAtlas as unknown as Topology,
  (worldAtlas as any).objects.countries
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

const solvedColor = "#f9fafb"; // light gray/white

export default function WorldMapPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const data = await fetchChallenges(token);
        setChallenges(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleFlagSubmit = async (challengeId: string, flag: string) => {
    try {
      const result = await submitFlag(challengeId, flag);

      setChallenges(prev =>
        prev.map(ch => (ch._id === challengeId ? { ...ch, completed: true } : ch))
      );

      await refreshUser();

      return {
        success: true,
        message: result.message || "🎉 Correct! You solved the challenge",
      };
    } catch (err: any) {
      return {
        success: false,
        message: parseErrorMessage(err) || "❌ Incorrect flag. Try again.",
      };
    }
  };

  const findChallengeByCountry = (countryName: string) => {
    return challenges.find((c) =>
      countryName.toLowerCase().includes(c.title.trim().toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-0 m-0">
      {/* Removed the World Map Title */}
      
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-lg">
            <ChallengeCard
              challenge={selectedChallenge}
              solved={selectedChallenge.completed ?? false}
              onSubmit={handleFlagSubmit}
              isLoggedIn={true}
            />
            <button
              className="mt-4 text-sm text-gray-400 hover:text-white"
              onClick={() => setSelectedChallenge(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-400 text-center py-20">Loading challenges...</div>
      ) : (
        <div className="w-full">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 100 }}
            width={700}
            height={650}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoData} key={challenges.length}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties?.name !== "Antarctica") // ✅ Remove Antarctica
                  .map((geo) => {
                    const countryName = geo.properties?.name || "Unknown";
                    const challenge = findChallengeByCountry(countryName);

                    let fillColor = "#334155"; // Default color

                    if (challenge) {
                      fillColor = challenge.completed
                        ? solvedColor
                        : categoryHexColors[challenge.category] || "#f87171"; // fallback red
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => challenge && setSelectedChallenge(challenge)}
                        style={{
                          default: {
                            fill: fillColor,
                            outline: "none",
                            transition: "all 0.3s ease-in-out",
                          },
                          hover: {
                            fill: fillColor,
                            outline: "none",
                            cursor: challenge ? "pointer" : "default",
                            filter: "brightness(1.2)", 
                          },
                          pressed: {
                            fill: "#0ea5e9",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ComposableMap>
        </div>
      )}
    </div>
  );
}
