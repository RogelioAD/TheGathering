import { useEffect, useState } from "react";
import axios from "axios";
import ChatContext from "../Context/ChatContext";

export const ChatProvider = ({ children, groupId }) => {
  const [chats, setChats] = useState({});
  const [verse, setVerse] = useState({});
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:5000/chatapi/";

  async function postDailyVerse(groupId) {
    if (!groupId || loading) return;
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}dailyVerse/${groupId}`);
      const payload = response.data.verse.payload;

      const verseObject = {
        reference: `${payload.book.name} ${payload.chapter}:${payload.verse}`,
        text: payload.text,
        translation: payload.translation.name,
      };

      const groupVerseKey = `verse_${groupId}`;

      const savedVerse = localStorage.getItem(groupVerseKey);
      const currentVerse = savedVerse ? JSON.parse(savedVerse) : null;

      if (JSON.stringify(currentVerse) !== JSON.stringify(verseObject)) {
        localStorage.setItem(groupVerseKey, JSON.stringify(verseObject));
        localStorage.setItem(`lastVerseFetch_${groupId}`, Date.now());
        setVerse(verseObject);
      }
    } catch (error) {
      console.error("Error fetching Daily Verse:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getChatsByGroup(groupId) {
    try {
      const response = await axios.get(`${baseUrl}group/${groupId}`);
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  }

  async function deleteChatsByGroup(groupId) {
    try {
        const response = await axios.delete(`${baseUrl}group/${groupId}`);
        setChats(response.data);
      } catch (error) {
        console.error("Error deleting chats:", error);
      }
  }

  async function createChat(groupId, message) {
    const token = localStorage.getItem("authToken");

    console.log("Posted a message: <" + message + "> in group: [" + groupId + "]"); //testing

    const response = await axios.post(baseUrl, {groupId, message},         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return await new Promise((resolve) => resolve(response.data));
  }


//86400000 24hrs
//60000 1min
  useEffect(() => {
    if (!groupId) return;
    const lastFetchTime = localStorage.getItem(`lastVerseFetch_${groupId}`);
    const currentTime = Date.now();

    if (!lastFetchTime || currentTime - lastFetchTime > 600000) {
      postDailyVerse(groupId);
      deleteChatsByGroup(groupId)
    } else {
      const savedVerse = localStorage.getItem(`verse_${groupId}`);
      if (savedVerse) {
        setVerse(JSON.parse(savedVerse));
      }
    }
  }, [groupId]);

  return (
    <ChatContext.Provider
      value={{
        verse,
        postDailyVerse,
        loading,
        getChatsByGroup,
        chats,
        createChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
