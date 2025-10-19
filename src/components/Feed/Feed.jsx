import React, { useEffect, useState } from "react";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import react from "../../assets/react.jpg";
import { NavLink } from "react-router-dom";
import API_KEY from "../../data.js";
import { valueConverter } from "../../data.js";
import moment from "moment";

const Feed = ({ isSidebarCollapsed = false, category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    // Use default category if not provided
    const videoCategory = category || "0"; // 0 = all categories

    if (!videoCategory) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${videoCategory}&key=${API_KEY}`;

    try {
      const response = await fetch(videoListUrl);

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      // Check if the API returned an error
      if (json.error) {
        throw new Error(json.error.message);
      }

      // Ensure items is an array, default to empty array
      setData(json.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setData([]); // Ensure data is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Category prop received:", category);
    console.log("API Key:", API_KEY ? "Present" : "Missing");
    fetchData();
  }, [category]);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 overflow-y-auto bg-gray-50 transition-all duration-300`}
      style={{
        left: isSidebarCollapsed ? "5%" : "15%",
        width: isSidebarCollapsed ? "95%" : "85%",
      }}
    >
      {/* Content starts below navbar */}
      <div className="pt-20">
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="text-lg text-gray-600">Loading videos...</div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="p-6 m-6 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">
              <strong>Error loading videos:</strong> {error}
            </p>
            <p className="text-red-700 text-sm mt-2">
              Please check your API key and ensure the YouTube Data API v3 is
              enabled.
            </p>
          </div>
        )}

        {/* Videos grid */}
        {!loading && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {data.map((item, index) => {
              return (
                <NavLink
                  to={`/videos/${item.snippet.categoryId}/${item.id}`}
                  className="card-container flex flex-col gap-2 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  key={index}
                >
                  <div className="relative">
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      alt="Thumbnail Not Found"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-sm font-medium text-black line-clamp-2 mb-2">
                      {item.snippet.title}
                    </h2>
                    <h3 className="text-sm text-[#808484] font-medium mb-1">
                      {item.snippet.channelTitle}
                    </h3>
                    <p className="text-sm text-[#808484]">
                      {valueConverter(item.statistics.viewCount)} views .{" "}
                      {moment(item.snippet.publishedAt).fromNow()}
                    </p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ) : (
          !loading && (
            <div className="flex justify-center items-center h-96">
              <div className="text-lg text-gray-600">No videos found</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
