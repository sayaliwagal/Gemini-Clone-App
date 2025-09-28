import React, { useState, useContext } from "react";
import { MdMenu, MdHistory } from "react-icons/md";
import { FaPlus, FaRegQuestionCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { Context } from "../Context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
   const { chatrooms, createChat, deleteChat, switchChat, activeChat } = useContext(Context);

  return (
    <div className="min-h-screen inline-flex flex-col items-center justify-between bg-[#e4e7eb] py-[25px] px-[15px] dark:bg-slate-800 dark:text-white">
       <div>
        {/* menu toggle */}
        <MdMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl block cursor-pointer"
        />

        {/* create new chat */}
        <div
          onClick={createChat}
          className="mt-[10px] inline-flex items-center gap-2 py-[5px] px-[10px] text-[14px] text-gray-500 cursor-pointer bg-gray-300 rounded-full hover:bg-gray-400"
        >
          <FaPlus className="text-xl" />
          {extended && <p>New Chat</p>}
        </div>

        {/* recent chats */}
        {extended && (
          <div className="flex flex-col mt-7">
            <p className="mb-5 font-semibold">Recent</p>
            {chatrooms.length === 0 && (
              <p className="text-sm text-gray-500">No chats yet</p>
            )}
            {chatrooms.map((room) => (
              <div
                key={room.id}
                className={`flex items-center justify-between p-2 pr-3 rounded-lg cursor-pointer mb-2 ${
                  activeChat === room.id
                    ? "bg-gray-400 dark:bg-gray-600"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => switchChat(room.id)}
              >
                <div className="flex items-center gap-3">
                  <FaRegMessage className="text-xl" />
                  <p className="truncate w-28">{room.name}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(room.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">

        <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 dark:text-white cursor-pointer hover:bg-gray-600">
          <FaRegQuestionCircle className="text-2xl" />
          {extended && <p>help</p>}
        </div>
        <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 dark:text-white cursor-pointer hover:bg-gray-600">
          <MdHistory className="text-2xl" />
          {extended && <p>Activity</p>}
        </div>
        <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 dark:text-white cursor-pointer hover:bg-gray-600">
          <IoSettingsOutline className="text-2xl" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
