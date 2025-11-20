import { useState } from "react";
import { Maximize, Minimize } from "lucide-react";

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <button
      onClick={handleToggleFullscreen}
      className="hidden sm:flex w-10 h-10 hover:bg-[#cfecfc] text-(--text-icons)  items-center justify-center rounded-full duration-200 transition-colors cursor-pointer"
    >
      {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
    </button>
  );
}
