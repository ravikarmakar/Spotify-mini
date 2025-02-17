import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusic";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection.tsx";
import SectionGrid from "./components/SectionGrid.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";

const HomePage = () => {
  const {
    isLoading,
    featuredSongs,
    fetchFeaturedSongs,
    treadingSongs,
    fetchTreadingSongs,
    madeForYouSongs,
    fetchMadeForYouSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTreadingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTreadingSongs, fetchMadeForYouSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      treadingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...treadingSongs, ...madeForYouSongs];
      initializeQueue(allSongs);
    }
  }, [madeForYouSongs, featuredSongs, treadingSongs, initializeQueue]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Morning</h1>
          <FeaturedSection />

          <div>
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={treadingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
