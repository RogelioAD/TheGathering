import axios from "axios";
import { useState } from "react";
import GroupContext from "../Context/GroupContext";

export const GroupProvider = (props) => {
  const [group, setGroup] = useState("");
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const baseUrl = "http://localhost:5000/groupsapi/";

  async function getGroupsCreatedByUser(username) {
    console.log("object passed from profile to group provider is: " + username); //test
    try {
      const response = await axios.get(`${baseUrl}created/${username}`);
      setCreatedGroups(response.data);
    } catch (error) {
      console.error("Error fetching Groups:", error);
    }
  }

  async function getGroupsUserIsIn(username) {
    try {
      const response = await axios.get(`${baseUrl}in/${username}`);
      setJoinedGroups(response.data);
      console.log("Groups user is in:", response.data);
    } catch (error) {
      console.error("Error fetching groups user is in:", error);
    }
  }

  async function createGroup(groupname) {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${baseUrl}`,
        { groupname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newGroup = res.data.group;
      setCreatedGroups((prev) => [...prev, newGroup]);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  }

  return (
    <GroupContext.Provider
      value={{
        getGroupsCreatedByUser,
        getGroupsUserIsIn,
        createGroup,
        group,
        createdGroups,
        joinedGroups,
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};
