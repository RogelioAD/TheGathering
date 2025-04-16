import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../conpro/Context/UserContext";
import { useParams } from "react-router-dom";

const Profile = () => {
    const {user, getProfile} = useContext(UserContext);
    //get state for groupchats
    let {username} = useParams();

    useEffect(() => {
        getProfile(username);
    }, [username])


  return <>
  <div>
    <p>{user.username}</p>
    <p>{user.firstName}</p>
    <p>{user.lastName}</p>
  </div>
  </>
};

export default Profile;
