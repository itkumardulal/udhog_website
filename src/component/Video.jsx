import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../context/TranslationContext";

const VIDEO_ID = "pSR50TramFI";

function Video() {
  const { t } = useTranslation();
  const playerRef = useRef(null);
  const iframeContainerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = initPlayer;
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player(iframeContainerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          mute: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            setIsMuted(true);
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING)
              setIsPlaying(true);
            if (event.data === window.YT.PlayerState.PAUSED)
              setIsPlaying(false);
          },
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <section className="relative w-full h-[400px] sm:h-screen overflow-hidden text-white text-center">
      {/* Cropped YouTube Iframe */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full scale-[2] sm:scale-[1.25] origin-center">
          <div
            ref={iframeContainerRef}
            className="w-full h-full"
            id="player"
          ></div>
        </div>
      </div>

      {/* Overlay for better text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10 pointer-events-none" />

      {/* Text Content - hidden on mobile */}
      <div className="hidden sm:block absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 space-y-4 w-full">
        <h1 className="font-light text-[clamp(1.5rem,5vw,3.5rem)] leading-tight">
          {t("videoTitle")}
        </h1>
        <h3 className="font-light text-[clamp(1rem,3vw,2rem)] max-w-3xl mx-auto leading-relaxed">
          {t("videoDescription")}
        </h3>
      </div>
    </section>
  );
}

export default Video;
