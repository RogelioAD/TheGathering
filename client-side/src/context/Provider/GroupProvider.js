import axios from "axios";
import {useState} from "react";
import GroupContext from "../Context/GroupContext";

export const UserProvider = (props) => {

    const [group, setGroup] = useState("");
    const baseurl = "http://localhost:5000/groupsapi/"

}