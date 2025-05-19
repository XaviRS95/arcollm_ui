import './ChatPageStyles.css'
import BannerComponentMain from "../../components/BannerComponent/BannerComponentMain.jsx";
import ChatComponentMain from "../../components/ChatComponent/ChatComponentMain.jsx";
import TextInputComponentMain from "../../components/TextInputComponent/TextInputComponentMain.jsx";
import {useEffect, useState} from "react";
import SidebarComponentMain from "../../components/SidebarComponent/SidebarComponentMain.jsx";
import SidebarButtonComponentMain from "../../components/SidebarButtonComponent/SidebarButtonComponentMain.jsx";
import OptionsFormComponentMain from "../../components/OptionsFormComponent/OptionsFormComponentMain.jsx";
import { useModels } from "../../hooks/getModelsHook.jsx";
import {useConversationsListHook} from "../../hooks/getConversationsListHook.jsx";

export default function ChatPage() {

    const [message, setMessage] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [availableModels, setAvailableModels] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [modelOptions, setModelOptions] = useState({});
    const USER_DATA = {
        "name": "Benito Camela",
        "email": "benitocamela@gmail.com",
    }
    const user_conversations_list = useConversationsListHook(USER_DATA["email"]);
    const [loadedConversation, setLoadedConversation] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        console.log(user_conversations_list)
    }, [user_conversations_list]);

    //Data initialization
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

    const handleOnConversationClick = (state) => {
        setConversationId(state);
    }

    const handleRetrieveConversation = (conversation_id) => {
        //conversation = getConversationHook(conversation_id)
        var conversation = []
        setLoadedConversation(conversation);
    }

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
            <ChatComponentMain message={message} model={selectedModel} options={modelOptions} conversation={loadedConversation} user_mail={USER_DATA['email']} conversation_id={conversationId}/>
            <SidebarComponentMain visibleState={sidebarVisible} user_data={USER_DATA} conversations={user_conversations_list} onConversationClick={handleOnConversationClick}/>
            <TextInputComponentMain onOpenOptions={handleOptionsVisible} onSend={handleMessageSend} />
        </div>
    );
}
