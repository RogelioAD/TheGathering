import React, { useContext, useState, useEffect } from "react";
import UserContext from "../conpro/Context/UserContext";
import { useParams, Link } from "react-router-dom";
import GroupContext from "../conpro/Context/GroupContext";

const Profile = () => {
  const { user, getProfile } = useContext(UserContext);
  const {
    joinedGroups,
    createdGroups,
    getGroupsCreatedByUser,
    getGroupsUserIsIn,
  } = useContext(GroupContext);

  let { username } = useParams();

  useEffect(() => {
    console.log(username); //test
    getProfile(username);
    getGroupsCreatedByUser(username);
    getGroupsUserIsIn(username);
  }, [username]);

  return (
    <>
      <div>
        <p>{user.username}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </div>

      <div>
        <h3>Current Groupchats:</h3>
        {joinedGroups.length > 0 ? (
          joinedGroups.map((group, i) => (
            <p key={i}>
              <Link to={`group/${group.groupId}`}>{group.groupname}</Link>
            </p>
          ))
        ) : (
          <Link to={``}>Click to join group</Link>
        )}
      </div>

      <div>
        <h3>Groups Created:</h3>
        {createdGroups.length > 0 ? (
          createdGroups.map((group, i) => (
            <p key={i}>
              <Link to={`group/${group.groupId}`}>{group.groupname}</Link>
            </p>
          ))
        ) : (
          <Link to={``}>Click to create group</Link>
        )}
      </div>
    </>
  );
};

export default Profile;
