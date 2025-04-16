import axios from "axios";
import {useState} from "react";
import ChatContext from "../Context/ChatContext";

export const UserProvider = (props) => {

    const [chat, setChat] = useState("");
    const baseurl = "http://localhost:5000/chatapi/"

}