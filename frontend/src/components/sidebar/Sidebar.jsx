import Conversations from "./Conversations";
import Logoutbutton from "./Logoutbutton";
import SearchInput from "./SearchInput";
import useNotificationListener from "../../hooks/useNotificationListener";

const Sidebar = () => {
  useNotificationListener();

  return (
    <div className='flex flex-col h-full'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      <Logoutbutton />
    </div>
  );
};

export default Sidebar;