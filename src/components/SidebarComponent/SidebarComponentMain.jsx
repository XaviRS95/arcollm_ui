import './SidebarComponentStyles.css'
export default function SidebarComponentMain({ visibleState, user_data, conversations, onConversationClick }) {
    const first_name = user_data.name.split(" ")[0];

    return visibleState ? (
        <div id="SidebarComponentMain">
            <div id="nameDisplay">
                <p>Hola {first_name}!</p>
            </div>
            <div id="conversationsHistory">
                {conversations.map((conversation) => (
                    <div className="conversation" key={conversation.id} onClick={() => onConversationClick(conversation.id)}>
                        <p>{conversation.title}</p>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
}