// import { useState, useRef, useEffect } from 'react';
// import VideoFile from '../assets/for website.mp4';
// import { useTranslation } from '../context/TranslationContext';

// function Video() {
//   const { t } = useTranslation();
//   const videoRef = useRef(null);


//   return (
//     <section className="relative w-full flex items-center justify-center text-center text-white overflow-hidden">
//       {/* Video Background */}
//       <video
//         ref={videoRef}
//         className="w-full h-[400px] sm:h-screen object-cover"
//         src={VideoFile}
//         type="video/mp4"
//         loop
//         muted
//         playsInline
//         controls
//         autoPlay
//       />

//       {/* Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 pointer-events-none"></div>

    
//       <div className="absolute z-20 text-center px-4 space-y-4">
//           <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{t('videoTitle')}</h1>
//           <h3 className="font-light text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto">{t('videoDescription')}</h3>
//         </div>
//     </section>
//   );
// }

// export default Video;


import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

const VIDEO_ID = 'pSR50TramFI'; // YouTube video ID

function Video() {
  const { t } = useTranslation();
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.body.appendChild(tag);
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = initPlayer;
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0, // hide native controls
          modestbranding: 1,
          rel: 0,
          loop: 1,
          mute: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            setIsMuted(true);
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
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

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <section className="relative w-full flex items-center justify-center text-center text-white overflow-hidden h-[400px] sm:h-screen">
      {/* YouTube Player Iframe */}
      <div
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        id="player"
      ></div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 pointer-events-none"></div>

      {/* Video Content Text */}
      <div className="absolute z-20 text-center px-4 space-y-4 w-full">
        <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{t('videoTitle')}</h1>
        <h3 className="font-light text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto">
          {t('videoDescription')}
        </h3>
      </div>

      {/* Custom Controls - Similar to HTML video controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-6 bg-black/50 backdrop-blur px-4 py-2 rounded-lg">
        <button
          onClick={togglePlay}
          className="text-white text-2xl"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          onClick={toggleMute}
          className="text-white text-2xl"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </section>
  );
}

export default Video;





  // function Video() {
  //   const { t } = useTranslation();

  //   return (
  //     <section className="relative w-full flex items-center justify-center text-center text-white overflow-hidden">
  //       {/* YouTube Video Background */}
  //       <iframe
  //         className="w-full h-[400px] sm:h-screen object-cover"
  //         src="https://www.youtube.com/embed/pSR50TramFI?autoplay=1&mute=1&controls=1&loop=1&playlist=pSR50TramFI"
  //         title="YouTube video"
  //         frameBorder="0"
  //         allow="autoplay; encrypted-media"
  //         allowFullScreen
  //       ></iframe>

  //       {/* Overlay */}
  //       <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 pointer-events-none"></div>

  //       {/* Text Content */}
  //       <div className="absolute z-20 text-center px-4 space-y-4">
  //         <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  //           {t('videoTitle')}
  //         </h1>
  //         <h3 className="font-light text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto">
  //           {t('videoDescription')}
  //         </h3>
  //       </div>
  //     </section>
  //   );
  // }

  // export default Video;



