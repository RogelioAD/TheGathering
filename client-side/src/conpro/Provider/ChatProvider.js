import { useEffect, useState } from "react";
import axios from "axios";
import ChatContext from "../Context/ChatContext";

export const ChatProvider = ({ children, groupId }) => {
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
  

  useEffect(() => {
    if (!groupId) return;
    const lastFetchTime = localStorage.getItem(`lastVerseFetch_${groupId}`);
    const currentTime = Date.now();
  
    if (!lastFetchTime || currentTime - lastFetchTime > 86400000) {
      postDailyVerse(groupId); 
    } else {
      const savedVerse = localStorage.getItem(`verse_${groupId}`); 
      if (savedVerse) {
        setVerse(JSON.parse(savedVerse));
      }
    }
  }, [groupId]);
  

  return (
    <ChatContext.Provider value={{ verse, postDailyVerse, loading }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
