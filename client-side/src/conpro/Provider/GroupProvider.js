import axios from "axios";
import { useState } from "react";
import GroupContext from "../Context/GroupContext";

export const GroupProvider = (props) => {
  const [group, setGroup] = useState("");
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const baseurl = "http://localhost:5000/groupsapi/";

  async function getGroupsCreatedByUser(username) {
    console.log(username); //test
    try {
      const response = await axios.get(`${baseurl}created/${username}`);
      setCreatedGroups(response.data);
    } catch (error) {
      console.error("Error fetching Groups:", error);
    }
  }

  async function getGroupsUserIsIn(username) {
    try {
      const response = await axios.get(`${baseurl}in/${username}`);
      setJoinedGroups(response.data)
      console.log("Groups user is in:", response.data);
    } catch (error) {
      console.error("Error fetching groups user is in:", error);
    }
  }

  return (
    <GroupContext.Provider
      value={{
        getGroupsCreatedByUser,
        getGroupsUserIsIn,
        group,
        createdGroups,
        joinedGroups
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};
