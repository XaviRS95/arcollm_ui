import './ChatPageStyles.css'
import BannerComponentMain from "../../components/BannerComponent/BannerComponentMain.jsx";
import ChatComponentMain from "../../components/ChatComponent/ChatComponentMain.jsx";
import TextInputComponentMain from "../../components/TextInputComponent/TextInputComponentMain.jsx";
import {useState} from "react";
import SidebarComponentMain from "../../components/SidebarComponent/SidebarComponentMain.jsx";
import SidebarButtonComponentMain from "../../components/SidebarButtonComponent/SidebarButtonComponentMain.jsx";
import OptionsFormComponentMain from "../../components/OptionsFormComponent/OptionsFormComponentMain.jsx";

export default function ChatPage() {

    const [message, setMessage] = useState("");
    var [sidebarVisible, setSidebarVisible] = useState(false);


    const handleMessageSend = (msg) => {
        setMessage(msg)
    };

    const handleSidebarVisible = (state) => {
        setSidebarVisible(state)
    };

    return (
        <div id={'ChatPage'}>
            <BannerComponentMain/>
            <OptionsFormComponentMain/>
            <SidebarButtonComponentMain isVisible={sidebarVisible} onChangeState={handleSidebarVisible}/>
            <ChatComponentMain message={message}/>
            <SidebarComponentMain visibleState={sidebarVisible}/>
            <TextInputComponentMain onSend={handleMessageSend}/>
        </div>
    )
}