import SideNavbar from './components/SideNavbar.js';
import Dashbord from './components/Dashbord.js';
import {  useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex">
    <SideNavbar setIsSidebarOpen={setIsSidebarOpen} />
    <Dashbord isSidebarOpen={isSidebarOpen} />
    
  </div>
  );
}

export default App;
