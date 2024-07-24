import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SideNavbar from './components/SideNavbar.js';
import Home from './Pages/Home.js';
import DiscoverPage from './Pages/DiscoverPage.js';
import { useState } from 'react';
import MovieList from './MovieList.js';
import MovieUpload from './MovieUpload.js';
import SeriesUpload from './SeriesUpload.js';
import Testregister from './components/Testregister.js';
import TestLogin from './components/TestLogin.js'
import AuthProvider from './context/AuthContext';
import Register from './components/Register.js';
import Login from './components/Login.js';
import WatchlistPage from './Pages/WatchlistPage.js';
import CategoryPage from './Pages/CategoryPage.js';
import Trending from './Pages/Trending.js';

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Array of paths where the sidebar should not be shown
  const noSidebarPaths = ['/register', '/login'];

  return (
    <div className="flex">
      {!noSidebarPaths.includes(location.pathname) && <SideNavbar setIsSidebarOpen={setIsSidebarOpen} />}
      <Routes>
        <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} />} />
        <Route path="/discover" element={<DiscoverPage isSidebarOpen={isSidebarOpen} />} />
        <Route path="/list" element={<MovieList />} />
        <Route path="/upload" element={<MovieUpload />} />
        <Route path="/seriesupload" element={<SeriesUpload />} />
        <Route path="/tregister" element={<Testregister />} />
        <Route path="/tlogin" element={<TestLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch" element={<WatchlistPage isSidebarOpen={isSidebarOpen} />} />
        <Route path="/category" element={<CategoryPage isSidebarOpen={isSidebarOpen} />} />
        <Route path="/trending" element={<Trending isSidebarOpen={isSidebarOpen} />} />
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
