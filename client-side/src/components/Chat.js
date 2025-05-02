import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ChatContext from "../conpro/Context/ChatContext";
import { ChatProvider } from "../conpro/Provider/ChatProvider";
import UserContext from "../conpro/Context/UserContext";
import GroupContext from "../conpro/Context/GroupContext";

const ChatContent = () => {
  const [message, setMessage] = useState("");
  const [randMessage, setRandMessage] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  const { user } = useContext(UserContext);
  const { verse, loading, chats, getChatsByGroup, createChat } =
    useContext(ChatContext);
  const {
    getGroupInfoById,
    addUserToGroup,
    getUsersInGroup,
    removeUserFromGroup,
  } = useContext(GroupContext);

  const { groupId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (groupId && user?.username) {
        const info = await getGroupInfoById(groupId);
        setIsCreator(info?.createdBy === user.username);
        getChatsByGroup(groupId);
        randomMessage();
      }
    };
    fetchData();
  }, [groupId, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (message.trim()) {
      await createChat(groupId, message.trim());
      setMessage("");
      getChatsByGroup(groupId);
    }
  }

  async function handleInvite(e) {
    e.preventDefault();
    const usernameToInvite = prompt(
      "Enter the username you want to invite (case-sensitive):"
    );
    if (usernameToInvite && usernameToInvite !== user.username) {
      try {
        await addUserToGroup(usernameToInvite, groupId);
      } catch (err) {
        console.error("Invite failed:", err);
      }
    }
    getChatsByGroup(groupId);
    console.log(user);

  }

  async function handleMembers(groupId) {
    setShowMembers((prevShowMembers) => {
      const newState = !prevShowMembers;
      if (newState) {
        getUsersInGroup(groupId).then((members) => {
          setGroupMembers(members);
        });
      }
      return newState;
    });
    //always showing up to date members list
  }

  async function handleRemoveUser(username) {
    await removeUserFromGroup(username, groupId);
    const updatedMembers = await getUsersInGroup(groupId);
    setGroupMembers(updatedMembers);
  }

  function randomMessage() {
    const messages = [
      "Waiting for the first spark of today’s reflection...",
      "Start the day with a word—and a word with your circle.",
      "No messages yet—maybe you're the one with the insight today!",
      "Every great conversation starts with a verse.",
      "Silence is golden... but sharing is better.",
      "Your thoughts could be the encouragement someone needs today.",
      "A quiet circle is just one message away from community.",
      "Got thoughts? Your circle is listening.",
      "Nothing yet—why not share what stood out to you?",
      "Like the verse? Say something, even if it’s just an amen.",
    ];
    const randIndex = Math.floor(Math.random() * messages.length);
    setRandMessage(messages[randIndex]);
  }

  return (
    <div className="profileCard two-section-chat">
      {/* Verse Section */}
      <div className="verse-container">
        <div className="verse-section">
          {loading ? (
            <p className="space-mono-regular-small">Loading...</p>
          ) : (
            <div className="verse-word-container">
              <p className="space-mono-bold-italic verse-line">
                {verse?.reference}
              </p>
              <p className="space-mono-regular-small verse-line">
                {verse?.translation}
              </p>
              <p className="space-mono-regular verse-line">{verse?.text}</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-content">
        <div className="inv-memb">
          {isCreator && (
            <>
              <button className="invite-button" onClick={handleInvite}></button>
              <button
                className="members-button"
                onClick={() => handleMembers(groupId)}
              ></button>
            </>
          )}
        </div>

        <div className="lower-half">
          {chats.length > 0 ? (
            chats.map((chat, i) => {
              const isUserMessage =
                chat.username?.toLowerCase() === user?.username?.toLowerCase();
              const containerClass = isUserMessage
                ? "message-container-user"
                : "message-container-guest";
              const userClass = isUserMessage
                ? "message-user space-mono-bold"
                : "message-guest space-mono-bold";
              const chatClass = isUserMessage
                ? "message-chat-user space-mono-regular"
                : "message-chat-guest space-mono-regular";

              return (
                <div className="chat-container" key={i}>
                  {chat.username === "system" ? (
                    <p>{chat.message}</p>
                  ) : (
                    <div className={containerClass}>
                      <b className={userClass}>{chat.username}</b>
                      <p className={chatClass}>{chat.message}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="chat-container-no-chat space-mono-regular-small">
              {randMessage}
            </p>
          )}
        </div>

        {/* Message Input */}
        <form
          className="input space-mono-regular inputBoxChat"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Type your message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="share-button" type="submit"></button>
        </form>

        {/* Group Members (if shown) */}
        {showMembers && (
          <div className="all-members">
            {groupMembers.map((member, i) => (
              <p className="member-circle space-mono-regular-italic" key={i}>
                <Link
                  className="links"
                  onClick={() => handleRemoveUser(member.username)}
                >
                  {member.username}
                </Link>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
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
