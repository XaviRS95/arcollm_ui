import './ChatPageStyles.css'
import BannerComponentMain from "../../components/BannerComponent/BannerComponentMain.jsx";
import ChatComponentMain from "../../components/ChatComponent/ChatComponentMain.jsx";
import TextInputComponentMain from "../../components/TextInputComponent/TextInputComponentMain.jsx";
import {useEffect, useState} from "react";
import SidebarComponentMain from "../../components/SidebarComponent/SidebarComponentMain.jsx";
import SidebarButtonComponentMain from "../../components/SidebarButtonComponent/SidebarButtonComponentMain.jsx";
import OptionsFormComponentMain from "../../components/OptionsFormComponent/OptionsFormComponentMain.jsx";
import { useModels } from "../../hooks/getModelsHook.jsx";

export default function ChatPage() {

    const [message, setMessage] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [availableModels, setAvailableModels] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [modelOptions, setModelOptions] = useState({});

    const { model: defaultModel, availableModels: newAvailableModels } = useModels();

    // Fetch models and selected model from the custom hook
    useEffect(() => {
        setSelectedModel(defaultModel);
        setAvailableModels(newAvailableModels);
    }, [defaultModel, newAvailableModels]);

    const handleMessageSend = (msg) => {
        setMessage(msg);
    };

    const handleModelChange = (newModel) => {
        setSelectedModel(newModel); // this gets triggered from OptionsFormComponentMain
    };

    const handleSidebarVisible = (state) => {
        setSidebarVisible(state);
    };

    const handleOptionsVisible = (state) => {
        setOptionsVisible(state);
    };

    const handleOptionsChange = (state) => {
        setModelOptions(state);
    };

    return (
        <div id="ChatPage">
            <BannerComponentMain />
            {availableModels.length > 0 && selectedModel &&
                <OptionsFormComponentMain
                    isVisible={optionsVisible}
                    availableModels={availableModels}
                    selectedModel={selectedModel}
                    onModelChange={handleModelChange}
                    onOptionsChange={handleOptionsChange}
                />
            }
            <SidebarButtonComponentMain isVisible={sidebarVisible} onChangeState={handleSidebarVisible} />
            <ChatComponentMain message={message} model={selectedModel} options={modelOptions} />
            <SidebarComponentMain visibleState={sidebarVisible} />
            <TextInputComponentMain onOpenOptions={handleOptionsVisible} onSend={handleMessageSend} />
        </div>
    );
}
