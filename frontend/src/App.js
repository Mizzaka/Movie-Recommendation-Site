import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavbar from './components/SideNavbar.js';
import Home from './Pages/Home.js';
import DiscoverPage from './Pages/DiscoverPage.js';
import {  useState } from 'react';
import MovieList from './MovieList.js';
import MovieUpload from './MovieUpload.js';
import SeriesUpload from './SeriesUpload.js';
import Testregister from './components/Testregister.js';
import AuthProvider from './context/AuthContext';
import Register from './components/Register.js';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (


<AuthProvider>
  <Router>
    <div className="flex">
     
    {/* <SideNavbar setIsSidebarOpen={setIsSidebarOpen} />    */}
     
    {/* <Dashbord isSidebarOpen={isSidebarOpen} /> */}
    <Routes>
            <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
            <Route path="/discover" element={<DiscoverPage isSidebarOpen={isSidebarOpen} />} />
            <Route path="/list" element={<MovieList />} />
            <Route path="/upload" element={<MovieUpload />} />
            <Route path="/seriesupload" element={<SeriesUpload />} />
            <Route path="/tregister" element={<Testregister/>} />
            <Route path="/register" element={<Register/>} />
            
            
          </Routes>
  </div>
  </Router>
 </AuthProvider >
  );
}

export default App;
