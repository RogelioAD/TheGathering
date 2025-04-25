import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatContext from "../conpro/Context/ChatContext";
import { ChatProvider } from "../conpro/Provider/ChatProvider";
import UserContext from "../conpro/Context/UserContext";
import GroupContext from "../conpro/Context/GroupContext";

const ChatContent = () => {
  const [message, setMessage] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [newUser, setNewUser] = useState("");

  const { user } = useContext(UserContext);
  const { verse, loading, chats, getChatsByGroup, createChat } =
    useContext(ChatContext);
  const { getGroupInfoById, addUserToGroup } = useContext(GroupContext);

  let { groupId } = useParams();

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

  function handleSubmit() {
    // e.preventDefault(); turned off so chat will instantly rerender after comment
    if (message.trim()) {
      createChat(groupId, message);
      setMessage("");
      console.log("button works");
    }
  }

  async function inviteSubmit() {
    const addedUser = newUser.trim();

    if (addedUser && addedUser !== user.username) {
      try {
        await addUserToGroup(addedUser, groupId);
        await createChat(groupId, `${addedUser} has joined the chat`);
        setShowGroupForm(false);
        setNewUser("");
      } catch (err) {
        console.error("Invite failed:", err);
      }
    }
  }

  return (
    <>
      <div>
        {isCreator && (
          <div>
            <button
              type="button"
              onClick={() => setShowGroupForm(!showGroupForm)}
            >
              {showGroupForm ? "Cancel" : "Invite"}
            </button>

            {showGroupForm && (
              <form className="input regfont" onSubmit={inviteSubmit}>
                <span>Enter Username</span>
                <input
                  placeholder="Be careful case sensitive!"
                  type="text"
                  name="groupName"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
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
            name="username"
            value={message}
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
