import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`absolute right-2 bottom-3 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 tranlate-y-2 groupr-hover:translate-y-0  ${isCurrentSong ? "opacity-100" : "opicty-0 group-hover:opacity-100"}`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="w-7 h-7 text-black" />
      ) : (
        <Play className="w-7 h-7 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;
