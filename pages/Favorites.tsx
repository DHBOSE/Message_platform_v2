import React, { useState } from 'react';
import { Star, Calendar, X, AlertCircle, Paperclip, Download } from 'lucide-react';
import { NotificationItem, Priority } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants';

interface FavoritesProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onToggleFavorite }) => {
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  
  const favoriteItems = MOCK_NOTIFICATIONS.filter(item => favorites.includes(item.id));

  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case Priority.HIGH: return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      case Priority.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
      case Priority.LOW: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      default: return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            <Star className="w-6 h-6 mr-2 text-amber-400 fill-amber-400" /> 
            我的收藏
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">您收藏的重要通知和公告 ({favoriteItems.length})</p>
        </div>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed transition-colors">
           <Star className="w-16 h-16 mx-auto text-slate-200 dark:text-slate-600 mb-4" />
           <p className="text-slate-500 dark:text-slate-400 font-medium">暂无收藏内容</p>
           <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">在通知栏点击星号图标即可收藏</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all p-5 cursor-pointer relative group"
              onClick={() => setSelectedNotification(item)}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="text-amber-400 hover:text-amber-600"
                  title="取消收藏"
                >
                  <Star className="w-5 h-5 fill-amber-400" />
                </button>
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">{item.summary}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
                <span>{item.department}</span>
                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
              <div className="pr-8 flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">{selectedNotification.title}</h3>
                <div className="flex flex-wrap gap-2">
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
              <button onClick={() => setSelectedNotification(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              <div className="prose dark:prose-invert max-w-none">
                 <p className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-lg">摘要：{selectedNotification.summary}</p>
                 <hr className="my-6 border-slate-100 dark:border-slate-700"/>
                 <p>{selectedNotification.content}</p>
                 
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

export default Favorites;