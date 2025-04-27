import React, { useContext, useEffect } from "react";
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
    editGroupName,
    deleteGroup
  } = useContext(GroupContext);

  const { username } = useParams();

  useEffect(() => {
    getProfile(username);
    getGroupsCreatedByUser(username);
    getGroupsUserIsIn(username);
  }, [username]);

  async function handleCreateGroup() {
    const groupName = prompt("Enter a name for your new group:");

    if (groupName && groupName.trim()) {
      const newGroup = await createGroup(groupName.trim());
      if (newGroup) {
        getGroupsCreatedByUser(username);
      }
    }
  }

  async function editSubmit(groupId, groupname) {
    const newGroupName = prompt("Enter new group name:", groupname);

    if (newGroupName && newGroupName.trim()) {
      const editingGroupName = await editGroupName(groupId, newGroupName.trim());
      if (editingGroupName) {
        getGroupsCreatedByUser(username);
      }
    }
  }

  async function handleDelete(groupId) {
    await deleteGroup(groupId);
    getGroupsCreatedByUser(username);
    getGroupsUserIsIn(username);
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
              <Link to={`group/${group.groupId}`}>{group.groupname}</Link>
              <> </>
              <button onClick={() => editSubmit(group.groupId, group.groupname)}>
                Edit
              </button>
              <button onClick={() => handleDelete(group.groupId)}>
                Delete
              </button>
            </p>
          ))
        ) : (
          <p>Try creating one!</p>
        )}
      </div>

      <div>
        <button type="button" onClick={handleCreateGroup}>
          Create Group
        </button>
      </div>
    </>
  );
};

export default Profile;
