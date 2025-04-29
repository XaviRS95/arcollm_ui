import './SidebarComponentStyles.css'
export default function SidebarComponentMain({ visibleState }) {
    return visibleState ? (
        <div id="SidebarComponentMain">
            <div id={"nameDisplay"}>
                <p>Hola Javier!</p>
            </div>
            <div id={"conversationsHistory"}>
                <div className="conversation">
                    <p>Conversation 1</p>
                </div>
                <div className="conversation">
                    <p>Conversation 2</p>
                </div>
                <div className="conversation">
                    <p>Conversation 3 de meme</p>
                </div>
            </div>
        </div>
    ) : null;
}