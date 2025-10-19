import React from "react";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jack from "../../assets/jack.png";
import simon from "../../assets/simon.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import cameron from "../../assets/cameron.png";
import entertainment from "../../assets/entertainment.png";

const AnotherSideBar = ({ category, setCategory }) => {
  const sideBarFields = [
    {
      id: 0,
      name: "Home",
      image: home,
    },
    {
      id: 20,
      name: "Gaming",
      image: game_icon,
    },
    {
      id: 2,
      name: "Automobiles",
      image: automobiles,
    },
    {
      id: 17,
      name: "Sports",
      image: sports,
    },
    {
      id: 28,
      name: "Tech",
      image: tech,
    },
    {
      id: 10,
      name: "Music",
      image: music,
    },
    {
      id: 22,
      name: "Blogs",
      image: blogs,
    },
    {
      id: 25,
      name: "News",
      image: news,
    },
    {
      id: 24,
      name: "Entertainment",
      image: entertainment,
    },
  ];

  const subsCribedFields = [
    {
      id: 1,
      name: "PewDiePie",
      image: jack,
    },
    {
      id: 2,
      name: "MrBeast",
      image: simon,
    },
    {
      id: 3,
      name: "Justin Bieber",
      image: tom,
    },
    {
      id: 4,
      name: "5 min craft",
      image: megan,
    },
    {
      id: 5,
      name: "Nas Daily",
      image: cameron,
    },
  ];

  return (
    <div className="fixed left-0 top-[88px] bg-white h-[calc(100vh-88px)] w-[3%] shadow overflow-y-auto pb-4">
      <div className="flex flex-col gap-6 pl-3 pt-5 items-start">
        {sideBarFields.map((field) => {
          return (
            <div
              key={field.id}
              className={`flex flex-col items-center gap-3 ${
                category === field.id ? "text-red-600" : ""
              }`}
              onClick={() => setCategory(field.id)}
            >
              <img
                src={field.image}
                alt="Image Not Found"
                className={`w-5 cursor-pointer ${
                  category === field.id ? "border-b-2 border-red-600" : ""
                }`}
              />
            </div>
          );
        })}
        <hr className="p-0 w-full border-[#e3e2e2] mt-1" />
        {subsCribedFields.map((field) => {
          return (
            <div key={field.id} className="flex flex-row items-center gap-3">
              <img
                src={field.image}
                alt="Image Not Found"
                className="w-6 cursor-pointer rounded-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnotherSideBar;
