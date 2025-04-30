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
    var [model,setModel] = useState("");
    var [sidebarVisible, setSidebarVisible] = useState(false);
    var [optionsVisible, setOptionsVisible] = useState(false);
    var [modelOptions, setModelOptions] = useState({});





    var handleMessageSend = (msg) => {
        setMessage(msg)
    };

    var handleModelChange = (state) => {
        setModel(state)
    }

    var handleSidebarVisible = (state) => {
        setSidebarVisible(state)
    };

    var handleOptionsVisible = (state) => {
        setOptionsVisible(state)
    };

    var handleOptionsChange = (state) => {
        setModelOptions(state)
    };

    return (
        <div id={'ChatPage'}>
            <BannerComponentMain/>
            <OptionsFormComponentMain isVisible={optionsVisible} onModelChange={handleModelChange} onOptionsChange={handleOptionsChange}/>
            <SidebarButtonComponentMain isVisible={sidebarVisible} onChangeState={handleSidebarVisible}/>
            <ChatComponentMain message={message} model={model} options={modelOptions}/>
            <SidebarComponentMain visibleState={sidebarVisible}/>
            <TextInputComponentMain onOpenOptions={handleOptionsVisible} onSend={handleMessageSend}/>
        </div>
    )
}