import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavbar from './components/SideNavbar.js';
import Home from './Pages/Home.js';
import DiscoverPage from './Pages/DiscoverPage.js';
import {  useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (

  <Router>
    <div className="flex">
    <SideNavbar setIsSidebarOpen={setIsSidebarOpen} />
    {/* <Dashbord isSidebarOpen={isSidebarOpen} /> */}
    <Routes>
            <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
            <Route path="/discover" element={<DiscoverPage />} />
            
          </Routes>
  </div>
  </Router>
  );
}

export default App;
