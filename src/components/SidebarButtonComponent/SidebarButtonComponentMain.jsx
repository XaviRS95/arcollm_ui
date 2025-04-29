import './SidebarButtonComponentStyles.css'
import sidebar_icon from '/sidebar-icon.png'

export default function SidebarButtonComponentMain({isVisible, onChangeState}) {

    function changeState() {
        onChangeState(!isVisible)
    }

    return (
        <img id={'sidebarIcon'} src={sidebar_icon} onClick={changeState}/>
    )
}