import React, { useEffect, useState } from "react";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import API_KEY from "../../data.js";
import { valueConverter } from "../../data.js";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = ({ videoId }) => {
  const videoDetails = [
    {
      id: 1,
      video: video1,
      channelDes: "Best Youtube Channel To Learn Development",
      videoDes: "1525 views &bull ; 2 days ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      dislikes: 2,
      shareImage: share,
      shareText: "Share",
      saveImage: save,
      saveText: "Save",
    },
  ];
  const comments = [
    {
      id: 1,
      member: "Nicholas Johnson",
      comment: "Best Channel For Coding",
      image: user_profile,
      day: "1 day ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      // dislikes: 2,
    },
    {
      id: 2,
      member: "Souvik Chatterjee",
      comment: "Best Channel For React",
      image: user_profile,
      day: "1 day ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      // dislikes: 2,
    },
    {
      id: 3,
      member: "Hitesh Choudhary",
      comment: "Best Channel For React And Django And Cpp",
      image: user_profile,
      day: "1 day ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      // dislikes: 2,
    },
    {
      id: 4,
      member: "Suman Choudhary",
      comment: "Best Channel For Beginner Coder",
      image: user_profile,
      day: "1 day ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      // dislikes: 2,
    },
    {
      id: 5,
      member: "Sumedha Chatterjee",
      comment: "I love This Channel",
      image: user_profile,
      day: "1 day ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      // dislikes: 2,
    },
    {
      id: 6,
      member: "John Doe",
      comment: "I love This Channel",
      image: user_profile,
      day: "1 day ago",
      likeImage: like,
      likes: 125,
      dislikeImage: dislike,
      // dislikes: 2,
    },
  ];

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetailsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;
      const response = await fetch(videoDetailsURL);
      const data = await response.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchOtherData = async () => {
    try {
      const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channelDataUrl);
      const data = await response.json();
      setChannelData(data.items[0]);
    } catch (error) {
      console.error("Error fetching other data:", error);
    }
  };

  useEffect(() => {
    if (apiData) fetchOtherData();
  }, [apiData]);

  const fetchCommentData = async () => {
    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(commentUrl);
      const data = await response.json();
      setCommentData(data.items);
    } catch (error) {
      console.error("Error fetching comment data:", error);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [videoId]);

  return (
    <div className="play-video basis-[69%] pl-10 pr-1 pt-10 mt-8">
      {videoDetails.map((video) => {
        return (
          <div key={video.id}>
            {/* <video
              src={video.video}
              controls
              autoPlay
              muted
              className="w-full rounded-md"
            ></video> */}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full rounded-md h-[37vw]"
            ></iframe>
            <h3 className="text-xl font-semibold mt-3">
              {apiData ? apiData.snippet.title : "Title Here"}
            </h3>
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm mt-3">
                {apiData
                  ? `${valueConverter(
                      apiData.statistics.viewCount
                    )} views . ${moment(apiData.snippet.publishedAt).fromNow()}`
                  : video.videoDes}
              </p>
              <div className="flex flex-row items-center  gap-6 mt-4">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={video.likeImage}
                    alt=""
                    className="w-5 cursor-pointer"
                  />
                  <p className="text-sm">
                    {apiData
                      ? valueConverter(apiData.statistics.likeCount)
                      : video.likes}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={video.dislikeImage}
                    alt=""
                    className="w-5 cursor-pointer"
                  />
                  {/* <p className="text-sm">{video.dislikes}</p> */}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={video.shareImage}
                    alt=""
                    className="w-5 cursor-pointer"
                  />
                  <p className="text-sm">{video.shareText}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={video.saveImage}
                    alt=""
                    className="w-5 cursor-pointer"
                  />
                  <p className="text-sm">{video.saveText}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <hr className="p-0 w-full border-[#c3c2c2] mt-3" />
      <div className="publisher flex flex-row items-start justify-between mt-6">
        <div className="flex flex-row items-start gap-3">
          <img
            src={
              channelData ? channelData.snippet.thumbnails.default.url : jack
            }
            className="w-10 rounded-full"
          />
          <div className="flex flex-col items-start">
            <div>
              <p className="font-bold">
                {apiData ? apiData.snippet.channelTitle : "Channel Name Here"}
              </p>
              <span>
                {channelData
                  ? valueConverter(channelData.statistics.subscriberCount)
                  : ""}{" "}
                subscribers
              </span>
            </div>
            <div className="mt-3">
              <h2 className="text-sm">
                {apiData
                  ? apiData.snippet.description.slice(0, 250)
                  : "Description Here"}
              </h2>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="bg-red-600 text-white active:bg-red-700 px-5 py-2 cursor-pointer rounded-md"
        >
          Subscribe
        </button>
      </div>

      <hr className="p-0 w-full border-[#c3c2c2] mt-3" />

      <h2 className="text-xl font-semibold mt-5 ml-2">
        {apiData ? valueConverter(apiData.statistics.commentCount) : 6} comments
      </h2>
      <div className="commentSection">
        {commentData &&
          commentData.map((comment, index) => {
            return (
              <div key={index} className="p-3 mt-4">
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={
                      commentData
                        ? comment.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        : user_profile
                    }
                    className="w-7 rounded-full"
                  />
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-semibold">
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </p>
                    <span>
                      {moment(
                        comment.snippet.topLevelComment.snippet.publishedAt
                      ).fromNow()}
                    </span>
                  </div>
                </div>
                <p className="mt-2 ml-10">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className="flex flex-row items-center justify-start ml-10 mt-4 gap-4">
                  <div className="flex flex-row items-center gap-2">
                    <img src={like} alt="" className="w-5 cursor-pointer" />
                    <p className="text-sm">
                      {valueConverter(
                        comment.snippet.topLevelComment.snippet.likeCount
                      )}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <img src={dislike} alt="" className="w-5 cursor-pointer" />
                    {/* <p className="text-sm">{comment.dislikes}</p> */}
                  </div>

                  <p className="text-sm cursor-pointer">Reply</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayVideo;
