import './ChatPageStyles.css'
import BannerComponentMain from "../../components/BannerComponent/BannerComponentMain.jsx";
import ChatComponentMain from "../../components/ChatComponent/ChatComponentMain.jsx";
import TextInputComponentMain from "../../components/TextInputComponent/TextInputComponentMain.jsx";
import {useState} from "react";

export default function ChatPage() {

    const [message, setMessage] = useState("");

    const handleSend = (msg) => {
        console.log("User sent:", msg);
        setMessage(msg)
    };

    return (
        <div id={'ChatPage'}>
            <BannerComponentMain/>
            <ChatComponentMain message={message}/>
            <TextInputComponentMain onSend={handleSend}/>
        </div>
    )
}