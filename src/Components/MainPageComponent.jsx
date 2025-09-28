import React, { useContext } from "react";
import { FaRegUserCircle, FaCompass } from "react-icons/fa";
import { GoLightBulb, GoSun, GoMoon } from "react-icons/go";
import { MdOutlineTravelExplore, MdAddAPhoto } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { IoIosMic, IoMdSend } from "react-icons/io";
import { SiGooglegemini } from "react-icons/si";
import { useTheme } from "../Context/ThemeContext";
import { Context } from "../Context/Context";

const MainPageComponent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    prevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    activeChat,
  } = useContext(Context);

  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative ">
      {/* header */}
      <div className="flex items-center justify-between text-2xl p-5 text-slate-800 dark:text-slate-500">
        <p className="font-bold">Gemini</p>
        <div className="flex gap-5 mt-10">
          <FaRegUserCircle className="text-4xl" />
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className="px-4 py-1 rounded-full border text-yellow-600 dark:text-white dark:border-gray-600 bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <GoMoon /> : <GoSun />}
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto ">
        {!showResult ? (
          // welcome screen
          <>
            <div className="my-12 text-[56px] text-slate-500 dark:text-white font-semibold p-5">
              <p>
                <span className="bg-gradient-to-r from-[#7f71cc] to-[#e90f74] bg-clip-text text-transparent">
                  Hello, Bob
                </span>
              </p>
              <p className="text-gray-400">How can I Help you today?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-col md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300 dark:bg-gray-600 dark:text-slate-300 dark:hover:bg-gray-500">
                <p className="text-slate-700 text-lg dark:text-slate-300">
                  Suggest top 20 latest Movies
                </p>
                <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>
              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300 dark:bg-gray-600 dark:text-slate-300 dark:hover:bg-gray-500">
                <p className="text-slate-700 text-lg dark:text-slate-300">
                  What is loop in JavaScript and how many types?
                </p>
                <GoLightBulb className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>
              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300 dark:bg-gray-600 dark:text-slate-300 dark:hover:bg-gray-500">
                <p className="text-slate-700 text-lg dark:text-slate-300">
                  Give the trip plan for Manali.
                </p>
                <MdOutlineTravelExplore className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>
              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300 dark:bg-gray-600 dark:text-slate-300 dark:hover:bg-gray-500">
                <p className="text-slate-700 text-lg dark:text-slate-300">
                  Who sits on the Iron Throne at the end?
                </p>
                <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />
              </div>
            </div>
          </>
        ) : (
          // chatroom messages
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            {prevPrompt.map((msg, idx) => (
              <div key={idx}>
                {/* user */}
                <div className="my-10 mx-10 flex item-center gap-5">
                  <FaRegUserCircle className="text-3xl dark:text-white" />
                  <p className="text-lg font-[400] leading-[1.8] dark:text-white">
                    {msg.prompt}
                  </p>
                </div>
                {/* bot */}
                <div className="flex item-center gap-5">
                  <SiGooglegemini className="text-3xl dark:text-white" />
                  {loading && idx === prevPrompt.length - 1 ? (
                    <div className="w-full flex flex-col gap-2">
                      <hr className="rounded-md border-none bg-gradient-to-r from-[#0780d6] via-[#ffffff] to-[#0780d6] p-4 animate-scroll-bg" />
                      <hr className="rounded-md border-none bg-gradient-to-r from-[#0780d6] via-[#ffffff] to-[#0780d6] p-4 animate-scroll-bg" />
                      <hr className="rounded-md border-none bg-gradient-to-r from-[#0780d6] via-[#ffffff] to-[#0780d6] p-4 animate-scroll-bg" />
                    </div>
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: msg.response }}
                      className="text-lg font-[400] leading-[1.8] dark:text-white"
                    ></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* input box */}
          <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto">
            <div className="flex items-center justify-between gap-20 bg-gray-200 py-2 px-5 m-10 rounded-full dark:bg-gray-700">
              <input
                type="text"
                placeholder="Ask Me"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="flex-1 bg-transparent border-none p-2 text-lg focus:outline-none dark:text-white"
              />
              <div className="flex gap-4 dark:text-slate-300  items-center">
                <MdAddAPhoto className="text-2xl cursor-pointer" />
                <IoIosMic className="text-2xl cursor-pointer" />
                {input && (
                  <IoMdSend
                    className="text-2xl cursor-pointer"
                    onClick={() => onSent(input)}
                  />
                )}
              </div>
            </div>
            {input && (
              <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-700 dark:text-white">
                Gemini can make mistakes, so double-check it
              </p>
            )}
          </div>
        
      </div>
    </div>
  );
};

export default MainPageComponent;
