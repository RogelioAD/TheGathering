import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatContext from "../conpro/Context/ChatContext";
import { ChatProvider } from "../conpro/Provider/ChatProvider";
import UserContext from "../conpro/Context/UserContext";

const ChatContent = () => {
  const [message, setMessage] = useState("");

  const { user } = useContext(UserContext);
  const { verse, loading, chats, getChatsByGroup, createChat } =
    useContext(ChatContext);

  let { groupId } = useParams();

  useEffect(() => {
    getChatsByGroup(groupId);
    console.log(groupId);
  }, [groupId]);

  function handleSubmit(e) {
    // e.preventDefault();
    //Turned off to automaticaly refresh chat after sharing comment
    createChat(groupId, message);
    console.log("button works");
  }

  return (
    <>
      <div>
        <strong>Verse:</strong>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{verse?.reference}</p>
            <p>{verse?.text}</p>
            <p>{verse?.translation}</p>
          </>
        )}
      </div>

      <div>hi {user.username}</div>
      <div>
        {chats.length > 0 ? (
          chats.map((chat, i) => (
            <div key={i}>
              <b>{chat.username}</b>
              <p>{chat.message}</p>
            </div>
          ))
        ) : (
          <p>Pray, read, and spark up a conversation!</p>
        )}
      </div>

      <div>
        <form className="input regfont" onSubmit={handleSubmit}>
          <input
            placeholder=""
            type="text"
            name="username"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Share</button>
        </form>
      </div>
    </>
  );
};

const Chat = () => {
  const { groupId } = useParams();

  return (
    <ChatProvider groupId={groupId}>
      <ChatContent />
    </ChatProvider>
  );
};

export default Chat;
