import Conversations from "./Conversations";
import Logoutbutton from "./Logoutbutton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations/>
      
      <Logoutbutton /> 
    </div>
  );
};

export default Sidebar;