import React from "react";
import PlayVideo from "../../components/Playvideo/PlayVideo";
import Recommended from "../../components/Recommended/Recommended";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams();
  return (
    <div className="play-container bg-[#f9f9f9] px-[2%] py-[20px] flex justify-between flex-nowrap gap-4">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
