import { createContext, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Context = createContext();

const run = (p) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Fake AI reply to: ${p}`);
    }, 1000);
  });
};

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // 🔹 NEW: chatroom states
  const [chatrooms, setChatRooms] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // throttle handling
  const lastCallRef = useRef(0);
  const throttleDelay = 3000;

  // 🔹 Load chatrooms from localStorage on mount
  useEffect(() => {
    const storedChats = localStorage.getItem("chatrooms");
    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      setChatRooms(parsedChats);
      if (parsedChats.length > 0) {
        setActiveChat(parsedChats[0].id);
        setPrevPrompt(parsedChats[0].messages);
        setShowResult(parsedChats[0].messages.length > 0);
        setResultData(parsedChats[0].messages[parsedChats[0].messages.length - 1]?.response || "");
      }
    }
  }, []);

  // 🔹 Save chatrooms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatrooms", JSON.stringify(chatrooms));
  }, [chatrooms]);

  const onSent = async (prompt) => {
    const now = Date.now();
    if (now - lastCallRef.current < throttleDelay) {
      console.log("Throttled! wait before sending again");
      return;
    }
    lastCallRef.current = now;

    setLoading(true);
    setRecentPrompt(prompt);

    try {
      const response = await run(prompt);
      setResultData(response);
      setPrevPrompt((prev) => [...prev, { prompt, response }]);
      setShowResult(true);

      // 🔹 Save to active chat
      if (activeChat) {
        setChatRooms((prev) =>
          prev.map((room) =>
            room.id === activeChat
              ? {
                  ...room,
                  messages: [...room.messages, { prompt, response }],
                }
              : room
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create a new chatroom
  const createChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Chat ${chatrooms.length + 1}`,
      messages: [],
    };
    setChatRooms([...chatrooms, newChat]);
    setActiveChat(newChat.id);
    setPrevPrompt([]);
    setResultData("");
    setShowResult(false);
    toast.success("Chatroom created!");
  };

  // 🔹 Delete a chatroom
  const deleteChat = (id) => {
    setChatRooms(chatrooms.filter((room) => room.id !== id));
    if (activeChat === id) {
      setActiveChat(null);
      setPrevPrompt([]);
      setResultData("");
      setShowResult(false);
    }
    toast.info("Chatroom deleted!");
  };

  // 🔹 Switch between chats
  const switchChat = (id) => {
    setActiveChat(id);
    const chat = chatrooms.find((room) => room.id === id);
    if (chat) {
      setPrevPrompt(chat.messages);
      setShowResult(chat.messages.length > 0);
      setResultData(chat.messages[chat.messages.length - 1]?.response || "");
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    // new chat features
    chatrooms,
    activeChat,
    createChat,
    deleteChat,
    switchChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
