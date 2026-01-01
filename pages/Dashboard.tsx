import React, { useState } from 'react';
import { Bell, ChevronRight, X, Calendar, AlertCircle, Star, Download, Paperclip } from 'lucide-react';
import { Category, NotificationItem, Priority } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants';

interface DashboardProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ favorites, onToggleFavorite }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const categories = Object.values(Category);

  const getNotificationsByCategory = (cat: Category) => 
    MOCK_NOTIFICATIONS.filter(n => n.category === cat);

  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case Priority.HIGH: return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      case Priority.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
      case Priority.LOW: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      default: return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">通知公告栏</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">最新设计研发动态与部门通知</p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
          今天是 2024年5月22日 星期三
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const items = getNotificationsByCategory(cat);
          const topItems = items.slice(0, 3);
          
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-6 rounded-full ${idx % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
                  <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg">{cat}</h3>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1">
                <ul className="space-y-3">
                  {topItems.map(item => (
                    <li 
                      key={item.id} 
                      className="group cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors relative"
                      onClick={() => setSelectedNotification(item)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                          {item.priority === Priority.HIGH ? '紧急' : item.priority}
                        </span>
                        <div className="flex items-center space-x-2">
                           <span className="text-xs text-slate-400">{item.date}</span>
                           <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(item.id);
                              }}
                              className="text-slate-300 dark:text-slate-600 hover:text-amber-400 dark:hover:text-amber-400 transition-colors"
                           >
                              <Star className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                           </button>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-6">
                        {item.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 text-center">
                <button 
                  onClick={() => setSelectedCategory(cat)}
                  className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-center w-full transition-colors"
                >
                  查看更多 <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category List Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/80 rounded-t-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{selectedCategory} - 所有通知</h3>
              <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {getNotificationsByCategory(selectedCategory).map(item => (
                  <div 
                    key={item.id} 
                    className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm cursor-pointer transition-all bg-white dark:bg-slate-800 group"
                    onClick={() => setSelectedNotification(item)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{item.title}</h4>
                      <div className="flex items-center space-x-3">
                         <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                          <Calendar className="w-4 h-4 mr-1"/> {item.date}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(item.id);
                          }}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
                        >
                          <Star className={`w-5 h-5 ${isFavorite(item.id) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'}`} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                        {item.department}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
              <div className="pr-8 flex-1">
                <div className="flex items-start justify-between">
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">{selectedNotification.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                   <span className={`text-xs px-2 py-1 rounded font-medium ${getPriorityColor(selectedNotification.priority)}`}>
                    {selectedNotification.priority} 优先级
                  </span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded font-medium">
                    发布部门: {selectedNotification.department}
                  </span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded font-medium">
                    {selectedNotification.date}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onToggleFavorite(selectedNotification.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite(selectedNotification.id) 
                      ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-500 border border-amber-200 dark:border-amber-800' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
                  title={isFavorite(selectedNotification.id) ? "取消收藏" : "收藏通知"}
                >
                  <Star className={`w-6 h-6 ${isFavorite(selectedNotification.id) ? 'fill-current' : ''}`} />
                </button>
                <button onClick={() => setSelectedNotification(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                  <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-8 overflow-y-auto text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {/* Simulated Rich Content */}
              <div className="prose dark:prose-invert max-w-none">
                 <p className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-lg">摘要：{selectedNotification.summary}</p>
                 <hr className="my-6 border-slate-100 dark:border-slate-700"/>
                 <p>{selectedNotification.content}</p>
                 <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                 
                 {/* Attachment Section */}
                 <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                       <Paperclip className="w-4 h-4 mr-2" /> 附件列表
                    </h4>
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                       <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded">
                             <div className="text-xs font-bold text-red-600 dark:text-red-400">PDF</div>
                          </div>
                          <div>
                             <div className="text-sm font-medium text-slate-700 dark:text-slate-200">相关技术规范文件_v2.0.pdf</div>
                             <div className="text-xs text-slate-500 dark:text-slate-400">2.4 MB</div>
                          </div>
                       </div>
                       <button className="flex items-center px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all">
                          <Download className="w-3 h-3 mr-1.5" /> 下载附件
                       </button>
                    </div>
                 </div>

                 <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg flex items-center text-blue-800 dark:text-blue-300 text-sm">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    请注意：本通知内容包含内部机密信息，请勿对外传播。
                 </div>
              </div>
            </div>
             <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 rounded-b-xl flex justify-end">
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                >
                  关闭
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;