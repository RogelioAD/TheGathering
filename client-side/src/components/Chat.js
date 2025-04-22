import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ChatContext from "../conpro/Context/ChatContext";
import { ChatProvider } from "../conpro/Provider/ChatProvider";
import UserContext from "../conpro/Context/UserContext";

const ChatContent = () => {
  const { user } = useContext(UserContext);
  const { verse, loading } = useContext(ChatContext);

  return (
    <>
      <div>
        <strong>Verse:</strong>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>{verse.reference}</p>
            <p>"{verse.text}"</p>
          </>
        )}
      </div>
      <div>hi {user.username}</div>
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
