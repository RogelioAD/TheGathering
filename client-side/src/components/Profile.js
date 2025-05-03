import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserContext from "../conpro/Context/UserContext";
import GroupContext from "../conpro/Context/GroupContext";
import "../styles/styles.css";

const Profile = () => {
  const { user, getProfile, logout } = useContext(UserContext);
  const {
    createGroup,
    joinedGroups,
    createdGroups,
    getGroupsCreatedByUser,
    getGroupsUserIsIn,
    editGroupName,
    deleteGroup,
  } = useContext(GroupContext);

  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getProfile(username);
      await getGroupsCreatedByUser(username);
      await getGroupsUserIsIn(username);
      setLoading(false);
    }
    fetchData();
  }, [username]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  async function handleCreateGroup() {
    const groupName = prompt("What's your Circle called?");
    if (groupName && groupName.trim()) {
      const newGroup = await createGroup(groupName.trim());
      if (newGroup) {
        getGroupsCreatedByUser(username);
      }
    }
  }

  async function handleEditGroup(groupId, currentName) {
    const newGroupName = prompt("Rename your Circle", currentName);
    if (newGroupName && newGroupName.trim()) {
      const success = await editGroupName(groupId, newGroupName.trim());
      if (success) {
        getGroupsCreatedByUser(username);
      }
    }
  }

  async function handleDeleteGroup(groupId) {
    await deleteGroup(groupId);
    getGroupsCreatedByUser(username);
    getGroupsUserIsIn(username);
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <div className="profileCardHome centerAlign">
          <div className="profile-info">
            <div className="profile-name">
              <h2 className="username space-mono-bold-italic">
                {user.username}
              </h2>
              <p className="fullname space-mono-regular">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <div className="all-chats scroll-component">
            <div className="current-chats">
              <h3 className="space-mono-bold">Circles You're In</h3>
              {joinedGroups.length > 0 || createdGroups.length > 0 ? (
                <>
                  {joinedGroups.map((group) => (
                    <p
                      className="space-mono-regular-italic"
                      key={`joined-${group.groupId}`}
                    >
                      <Link className="links" to={`group/${group.groupId}`}>
                        {group.groupname}
                      </Link>
                    </p>
                  ))}
                  {createdGroups.map((group) => (
                    <p
                      className="space-mono-regular-italic"
                      key={`created-${group.groupId}`}
                    >
                      <Link className="links" to={`group/${group.groupId}`}>
                        {group.groupname}
                      </Link>
                    </p>
                  ))}
                </>
              ) : (
                <p className="space-mono-regular-small">
                  No Circles yet — you’ll need an invite to join.
                </p>
              )}
            </div>

            <div className="created-chats">
              <h3 className="space-mono-bold">Circles You Started</h3>
              {createdGroups.length > 0 ? (
                createdGroups.map((group) => (
                  <p
                    className="space-mono-regular-italic created-chats-line"
                    key={group.groupId}
                  >
                    <Link className="links" to={`group/${group.groupId}`}>
                      {group.groupname}
                    </Link>
                    <> </>
                    <button
                      className="profilebutton"
                      onClick={() =>
                        handleEditGroup(group.groupId, group.groupname)
                      }
                    >
                      {" "}
                    </button>
                    <button
                      className="deletebutton"
                      onClick={() => handleDeleteGroup(group.groupId)}
                    ></button>
                  </p>
                ))
              ) : (
                <p className="space-mono-regular-small">Create a Circle!</p>
              )}
            </div>
          </div>
          <div className="duodot">
          <button
            className="logout"
            type="button"
            onClick={handleLogout}
          ></button>

          <button
            className="create"
            type="button"
            onClick={handleCreateGroup}
          ></button>
        </div>
        </div>


    </>
  );
};

export default Profile;
