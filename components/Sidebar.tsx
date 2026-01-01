import React from 'react';
import { 
  Bell, Edit3, Settings, Database, 
  Users, MessageSquare, User, BarChart2,
  Star, Sun, Moon
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const menuItems = [
    { id: 'notifications', label: '通知栏', icon: Bell },
    { id: 'favorites', label: '我的收藏', icon: Star },
    { id: 'publish', label: '发布通知', icon: Edit3 },
    { id: 'management', label: '管理平台', icon: Settings },
    { id: 'resources', label: '公开资料', icon: Database },
    { id: 'contacts', label: '部门通讯录', icon: Users },
    { id: 'forum', label: '技术论坛', icon: MessageSquare },
    { id: 'profile', label: '个人中心', icon: User },
    { id: 'stats', label: '数据统计', icon: BarChart2 },
  ];

  return (
    <div className="h-full bg-slate-800 dark:bg-slate-950 text-slate-100 flex flex-col shadow-xl transition-colors duration-300 border-r border-slate-700 dark:border-slate-800">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-700 dark:border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/50">
          S
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight text-white">陕鼓动力</h1>
          <p className="text-xs text-slate-400">设计研发部宣贯平台</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                      : 'text-slate-400 hover:bg-slate-700 dark:hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer & Theme Toggle */}
      <div className="p-4 border-t border-slate-700 dark:border-slate-800">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-center space-x-2 bg-slate-700 dark:bg-slate-900 hover:bg-slate-600 dark:hover:bg-slate-800 text-slate-300 py-2 rounded-lg transition-colors mb-4"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-4 h-4" />
              <span className="text-sm">切换至暗夜模式</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-sm">切换至日光模式</span>
            </>
          )}
        </button>
        <div className="text-xs text-slate-500 text-center">
          &copy; 2024 陕鼓动力 v1.1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;