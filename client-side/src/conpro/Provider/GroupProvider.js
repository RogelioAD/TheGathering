import axios from "axios";
import { useContext, useState } from "react";
import GroupContext from "../Context/GroupContext";
import UserContext from "../Context/UserContext";

export const GroupProvider = (props) => {
  const [group] = useState("");
  const [groupInfo, setGroupInfo] = useState(null);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const baseUrl = "http://localhost:5000/groupsapi/";
  const baseGroupUrl = "http://localhost:5000/groupmembersapi/";

  const { getProfile } = useContext(UserContext);

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

  async function addUserToGroup(username, groupId) {
    try {
      let findUser = await getProfile(username, false); 
  
      if (findUser && username.toLowerCase() === findUser.username.toLowerCase()) {
        const token = localStorage.getItem("authToken");
  
        await axios.post(
          `${baseGroupUrl}`,
          { username, groupId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        return true;
      } else {
        console.log(`User not found or invalid username: ${username}`);
        return false;
      }
    } catch (error) {
      console.error("Error joining groups:", error);
      return false;
    }
  }

  async function getGroupInfoById(groupId) {
    try {
      const res = await axios.get(`${baseUrl}group/${groupId}`);
      setGroupInfo(res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching group info:", err);
      return null;
    }
  }

  async function getUsersInGroup(groupId) {
    console.log("GetusersInGroup is being called");
    try {
      const res = await axios.get(`${baseGroupUrl}group/${groupId}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching group info:", err);
      return null;
    }
  }

  async function removeUserFromGroup(username, groupId) {
    console.log("removeUser is being called");
    try {
      const res = await axios.delete(
        `${baseGroupUrl}${groupId}/user/${username}`
      );
      return res.data;
    } catch (err) {
      console.error("Error fetching removeUser:", err);
      return null;
    }
  }

  async function editGroupName(groupId, groupname) {
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.put(
        `${baseUrl}group/${groupId}`,
        { groupname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error("Error editing group name:", err);
      return null;
    }
  }

  async function deleteGroup(groupId) {
    const token = localStorage.getItem("authToken");

    try {
      const res = await axios.delete(`${baseUrl}group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("Error editing group name:", err);
    }
  }

  return (
    <GroupContext.Provider
      value={{
        getGroupsCreatedByUser,
        getGroupsUserIsIn,
        createGroup,
        addUserToGroup,
        getGroupInfoById,
        editGroupName,
        deleteGroup,
        getUsersInGroup,
        removeUserFromGroup,
        group,
        createdGroups,
        joinedGroups,
        groupInfo
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};
