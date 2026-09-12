import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PageTransition from './components/layout/PageTransition';
import LandingPage from './pages/LandingPage';
import GroupByPage from './pages/GroupByPage';
import RollupPage from './pages/RollupPage';
import CubePage from './pages/CubePage';
import PlaygroundPage from './pages/PlaygroundPage';
import LearnPage from './pages/LearnPage';
import HelpPage from './pages/HelpPage';
import DevelopedByPage from './pages/DevelopedByPage';
import DownloadPage from './pages/DownloadPage';
import NotFoundPage from './pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/"               element={<LandingPage />} />
        <Route path="/group-by"       element={<GroupByPage />} />
        <Route path="/rollup"         element={<RollupPage />} />
        <Route path="/cube"           element={<CubePage />} />
        <Route path="/playground"     element={<PlaygroundPage />} />
        <Route path="/learn"          element={<LearnPage />} />
        <Route path="/help"           element={<HelpPage />} />
        <Route path="/developed-by"   element={<DevelopedByPage />} />
        <Route path="/download"       element={<DownloadPage />} />
        <Route path="*"               element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
