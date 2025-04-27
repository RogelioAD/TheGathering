import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatContext from "../conpro/Context/ChatContext";
import { ChatProvider } from "../conpro/Provider/ChatProvider";
import UserContext from "../conpro/Context/UserContext";
import GroupContext from "../conpro/Context/GroupContext";

const ChatContent = () => {
  const [message, setMessage] = useState("");
  const [isCreator, setIsCreator] = useState(false);

  const { user } = useContext(UserContext);
  const { verse, loading, chats, getChatsByGroup, createChat } = useContext(ChatContext);
  const { getGroupInfoById, addUserToGroup } = useContext(GroupContext);

  const { groupId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const info = await getGroupInfoById(groupId);
      setIsCreator(info?.createdBy === user.username);
    };

    if (groupId) {
      getChatsByGroup(groupId);
      fetchData();
    }
  }, [groupId, user.username]);

  function handleSubmit(e) {
    e.preventDefault()
    if (message.trim()) {
      createChat(groupId, message.trim());
      setMessage("");
    }
  }

  async function handleInvite(e) {
    e.preventDefault()

    const usernameToInvite = prompt("Enter the username you want to invite (case-sensitive):");

    if (usernameToInvite && usernameToInvite.trim() && usernameToInvite.trim() !== user.username) {
      try {
        await addUserToGroup(usernameToInvite.trim(), groupId);
        await createChat(groupId, `${usernameToInvite.trim()} has joined the chat`);
      } catch (err) {
        console.error("Invite failed:", err);
      }
    }
  }

  return (
    <>
      <div>
        {isCreator && (
          <button type="button" onClick={handleInvite}>
            Invite
          </button>
        )}
      </div>

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
              {chat.username === "system" ? (
                <p style={{ fontStyle: "italic", color: "gray" }}>
                  {chat.message}
                </p>
              ) : (
                <>
                  <b>{chat.username}</b>
                  <p>{chat.message}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p>Pray, read, and spark up a conversation!</p>
        )}
      </div>

      <div>
        <form className="input regfont" onSubmit={handleSubmit}>
          <input
            placeholder="Type your message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Share</button>
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
