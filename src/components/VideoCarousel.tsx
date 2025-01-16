import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { replay, pause, play1 } from "../assets";
import { hightlightsSlidesProject1 } from "../constants";

gsap.registerPlugin(ScrollTrigger);

interface VideoCarouselProps {
  projectVideos: typeof hightlightsSlidesProject1;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ projectVideos }) => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const [video, setVideo] = useState({
    videoId: 0,
    playStart: false,
    isPlaying: false,
    isEnd: false,
    isLastVideo: false,
  });

  const { videoId, isPlaying, isLastVideo } = video;
  // Define proper type for loadedData state
  const [loadedData, setLoadedData] = useState<React.SyntheticEvent<HTMLVideoElement, Event>[]>([]);

  const handleLoadedMetadata = (i: number, e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setLoadedData((pre) => [...pre, e]);
  };

  const handleVideoEnd = (i: number) => {
    if (i !== projectVideos.length - 1) {
      handleProcess("video-end", i);
      if (isPlaying) {
        const nextVideo = videoRef.current[i + 1];
        if (nextVideo) {
          nextVideo.play();
        }
      }
    } else {
      handleProcess("video-last");
    }
  };

  useEffect(() => {
    if (loadedData.length > 0) {
      if (!isPlaying) {
        videoRef.current.forEach(video => {
          if (video) {
            video.pause();
          }
        });
      } else if (videoRef.current[videoId]) {
        videoRef.current[videoId]?.play();
      }
    }
  }, [loadedData, isPlaying, videoId]);

  useEffect(() => {
    videoRef.current.forEach(video => {
      if (video) {
        video.muted = false;
        video.volume = 0.5;
      }
    });
  }, []);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          playStart: true,
        }));
      },
    });
  }, [videoId]);

  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case "video-reset":
        setVideo((pre) => ({ 
          ...pre, 
          videoId: 0, 
          isLastVideo: false,
          isPlaying: true 
        }));
        if (videoRef.current[0]) {
          videoRef.current[0].play();
        }
        break;

      case "play":
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        if (videoRef.current[videoId]) {
          if (video.isPlaying) {
            videoRef.current[videoId]?.pause();
          } else {
            videoRef.current[videoId]?.play();
          }
        }
        break;

      case "video-end":
        setVideo((pre) => ({ 
          ...pre, 
          isEnd: true, 
          videoId: i! + 1,
          isPlaying: true 
        }));
        const nextVideo = videoRef.current[i! + 1];
        if (nextVideo) {
          nextVideo.play();
        }
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="mt-12 flex items-center text-white px-4 sm:px-10 md:px-20 lg:px-32 overflow-x-hidden overflow-y-hidden">
        {projectVideos.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video__carousel__container relative">
              <div className="w-full h-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[3/1] flex__center rounded-3xl overflow-hidden bg-black">
              <video
									className="pointer-events-none"
									id="video"
									muted
									playsInline
									preload="auto"
									ref={(el) => (videoRef.current[i] = el)}
									onPlay={() =>
										setVideo((pre) => ({
											...pre,
											isPlaying: true,
										}))
									}
									onEnded={() => {
										i !== 3
											? handleProcess("video-end", i)
											: handleProcess("video-last");
									}}
									onLoadedMetadata={(e) =>
										handleLoadedMetadata(i, e)
									}
								>
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textListsH.map((text, j) => (
                  <p key={j} className="text-xl md:text-3xl font-medium">
                    {text}
                  </p>
                ))}
                {list.textLists.map((text, j) => (
                  <p key={j} className="text-xl md:text-xl font-medium mt-2">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 relative flex__center">
        <div className="flex__center px-7 py-5 border border-gray-100 rounded-full backdrop-blur">
          {videoRef.current.map((_, i) => (
            <div
              key={i}
              className={`mx-2 w-3 h-3 rounded-full ${
                i === videoId 
                  ? 'bg-white' 
                  : i < videoId 
                    ? 'bg-blue-400' 
                    : 'bg-gray-500'
              }`}
              aria-label={`Video ${i + 1} ${i === videoId ? '(current)' : i < videoId ? '(played)' : '(upcoming)'}`}
            />
          ))}
        </div>
        <button className="ml-4 p-4 border border-gray-300 rounded-full  backdrop-blur flex__center ">
					<img
						src={
							isLastVideo
								? replay
								: !isPlaying
								? play1
								: pause
						}
						alt={
							isLastVideo
								? "replay"
								: !isPlaying
								? "play"
								: "pause"
						}
						onClick={
							isLastVideo
								? () => handleProcess("video-reset")
								: !isPlaying
								? () => handleProcess("play")
								: () => handleProcess("pause")
						}
					/>
				</button>
      </div>
    </>
  );
};

export default VideoCarousel;