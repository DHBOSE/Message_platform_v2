import React, { useState, Suspense, useEffect } from 'react';
import Sidebar from './components/Sidebar';

// Lazy load page components
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const Publish = React.lazy(() => import('./pages/Publish'));
const Management = React.lazy(() => import('./pages/Management'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Contacts = React.lazy(() => import('./pages/Contacts'));
const Forum = React.lazy(() => import('./pages/Forum'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Stats = React.lazy(() => import('./pages/Stats'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(fid => fid !== id));
    } else {
      setFavorites(prev => [...prev, id]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications': return <Dashboard favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'favorites': return <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'publish': return <Publish />;
      case 'management': return <Management />;
      case 'resources': return <Resources />;
      case 'contacts': return <Contacts />;
      case 'forum': return <Forum />;
      case 'profile': return <Profile />;
      case 'stats': return <Stats />;
      default: return <Dashboard favorites={favorites} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <div className={`${theme} h-screen w-full`}>
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
        {/* Sidebar - 1/4 width (approx 250px-300px fixed or percentage) */}
        <aside className="w-64 flex-shrink-0 z-20 shadow-xl">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </aside>

        {/* Main Content - 3/4 width */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 shadow-sm z-10 transition-colors duration-300">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {activeTab === 'notifications' && '通知中心'}
              {activeTab === 'favorites' && '我的收藏'}
              {activeTab === 'publish' && '发布通知'}
              {activeTab === 'management' && '系统管理'}
              {activeTab === 'resources' && '知识库'}
              {activeTab === 'contacts' && '通讯录'}
              {activeTab === 'forum' && '技术社区'}
              {activeTab === 'profile' && '个人中心'}
              {activeTab === 'stats' && '数据分析'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200">张工</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">高级工程师 | 离心压缩机室</div>
              </div>
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                张
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-8 relative scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
            <Suspense fallback={<LoadingSpinner />}>
              {renderContent()}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;