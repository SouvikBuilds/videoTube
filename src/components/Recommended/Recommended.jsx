import React, { useEffect, useState } from "react";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import API_KEY from "../../data.js";
import { valueConverter } from "../../data.js";
import { NavLink } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const sideVideos = [
    {
      id: 1,
      image: thumbnail1,
      channel: "Greatstack",
      des: "Best Channel For Web Development",
      views: "199k",
    },
    {
      id: 2,
      image: thumbnail2,
      channel: "Greatstack",
      des: "Best Channel For Django And Backend",
      views: "199k",
    },
    {
      id: 3,
      image: thumbnail3,
      channel: "Greatstack",
      des: "Learn Gen AI",
      views: "199k",
    },
    {
      id: 4,
      image: thumbnail4,
      channel: "AK Vlogs",
      des: "My First Day in South Korea",
      views: "199k",
    },
    {
      id: 5,
      image: thumbnail5,
      channel: "Life Learnings",
      des: "How I Succeded In Life",
      views: "199k",
    },
    {
      id: 6,
      image: thumbnail6,
      channel: "Greatstack",
      des: "Best Channel For Web Development",
      views: "199k",
    },
    {
      id: 7,
      image: thumbnail7,
      channel: "F1 Center",
      des: "Best Cars For Racing",
      views: "199k",
    },
    {
      id: 8,
      image: thumbnail8,
      channel: "SS Backend",
      des: "Best Channel For Fastapi",
      views: "199k",
    },
  ];

  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(relatedVideoUrl);
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended basis-[30%] mt-13 py-3 px-1">
      {apiData.map((video, index) => {
        return (
          <NavLink
            to={`/videos/${video.snippet.categoryId}/${video.id}`}
            className="sideVideo flex justify-between mb-[8px] gap-3 px-4 py-3 rounded-md cursor-pointer hover:bg-[#eeebeb] active:bg-[#d8d3d3] duration-200"
            key={index}
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt="Not Found"
              className="basis-[49%] w-[50%] rounded-md"
            />
            <div className="video_info basis-[49%]">
              <h3 className="text-xm font-semibold">{video.snippet.title}</h3>
              <p>{video.snippet.channelTitle}</p>
              <p>{valueConverter(video.statistics.viewCount)} views</p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Recommended;
