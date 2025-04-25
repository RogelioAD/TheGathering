import React, { useContext, useEffect, useState } from "react";
import UserContext from "../conpro/Context/UserContext";
import { useParams, Link } from "react-router-dom";
import GroupContext from "../conpro/Context/GroupContext";

const Profile = () => {
  const { user, getProfile } = useContext(UserContext);
  const {
    createGroup,
    joinedGroups,
    createdGroups,
    getGroupsCreatedByUser,
    getGroupsUserIsIn,
  } = useContext(GroupContext);

  const [showGroupForm, setShowGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  let { username } = useParams();

  useEffect(() => {
    console.log("params are: " + username); //test
    getProfile(username);
    getGroupsCreatedByUser(username);
    getGroupsUserIsIn(username);
  }, [username]);

  function handleSubmitGroup(event) {
    console.log("New group created!"); //test
    event.preventDefault();
    if (newGroupName.trim()) {
      createGroup(newGroupName);
      setNewGroupName("");
      setShowGroupForm(false);
    }
  }

  function editSubmit(event){
    event.preventDefault()
  }

  return (
    <>
      <div>
        <p>{user.username}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </div>

      <div>
        <h3>Current Groupchats:</h3>
        {joinedGroups.length > 0 || createdGroups.length > 0 ? (
          <>
            {joinedGroups.map((group, i) => (
              <p key={`joined-${i}`}>
                <Link to={`group/${group.groupId}`}>{group.groupname}</Link>
              </p>
            ))}
            {createdGroups.map((group, i) => (
              <p key={`created-${i}`}>
                <Link to={`group/${group.groupId}`}>{group.groupname}</Link>
              </p>
            ))}
          </>
        ) : (
          <p>Ask your friends to join!</p>
        )}
      </div>

      <div>
        <h3>Groups Created:</h3>
        {createdGroups.length > 0 ? (
          createdGroups.map((group, i) => (
            <p key={i}>
              <Link to={`group/${group.groupId}`}>{group.groupname}</Link><> </><button onClick={editSubmit}>Edit</button>
            </p>
          ))
        ) : (
          <p>Try creating one!</p>
        )}
      </div>

      <div>
        <button type="button" onClick={() => setShowGroupForm(!showGroupForm)}>
          {showGroupForm ? "Cancel" : "Create Group"}
        </button>

        {showGroupForm && (
          <form className="input regfont" onSubmit={handleSubmitGroup}>
            <span>Group Name</span>
            <input
              placeholder="Enter group name"
              type="text"
              name="groupName"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Profile;
