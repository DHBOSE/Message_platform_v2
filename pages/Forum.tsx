import React, { useState } from 'react';
import { MOCK_FORUM_POSTS } from '../constants';
import { MessageSquare, Eye, PlusCircle, Flame, User, Send, X, ThumbsUp } from 'lucide-react';
import { ForumPost } from '../types';

const Forum: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
        <div className="flex space-x-2">
          {['全部话题', '技术讨论', '问题求助', '经验分享'].map((tab, idx) => (
             <button 
               key={tab} 
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${idx === 0 ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
             >
               {tab}
             </button>
          ))}
        </div>
        <button 
          onClick={() => setIsNewPostModalOpen(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          发起新话题
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Post List */}
        <div className="lg:col-span-3 space-y-4">
          {MOCK_FORUM_POSTS.map(post => (
            <div 
              key={post.id} 
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {post.tag}
                    </span>
                    {post.isHot && (
                      <span className="flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800">
                        <Flame className="w-3 h-3 mr-1" /> 热门
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 space-x-4">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>2小时前</span>
                  </div>
                </div>
                <div className="flex space-x-4 text-slate-400 dark:text-slate-500">
                   <div className="flex flex-col items-center">
                      <MessageSquare className="w-5 h-5 mb-1" />
                      <span className="text-xs">{post.replies}</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <Eye className="w-5 h-5 mb-1" />
                      <span className="text-xs">{post.views}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Dummy extra posts */}
          {[1, 2, 3].map(i => (
             <div key={`d-${i}`} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 opacity-75">
                <div className="flex items-center space-x-2 mb-2">
                   <span className="w-16 h-5 bg-slate-100 dark:bg-slate-700 rounded"></span>
                </div>
                <div className="w-3/4 h-6 bg-slate-100 dark:bg-slate-700 rounded mb-3"></div>
                <div className="w-1/4 h-4 bg-slate-100 dark:bg-slate-700 rounded"></div>
             </div>
          ))}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           {/* Hot Tags */}
           <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                <Flame className="w-4 h-4 mr-2 text-red-500" /> 热门标签
              </h4>
              <div className="flex flex-wrap gap-2">
                 {['离心机', 'ANSYS', '密封', '转子动力学', 'TRT', 'ASPEN', '国标'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                      #{tag}
                    </span>
                 ))}
              </div>
           </div>

           {/* Active Users */}
           <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4">活跃用户</h4>
              <ul className="space-y-3">
                 {[1,2,3,4].map(i => (
                    <li key={i} className="flex items-center space-x-3">
                       <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                       <div className="flex-1">
                          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-20 mb-1"></div>
                          <div className="h-2 bg-slate-50 dark:bg-slate-800 rounded w-12"></div>
                       </div>
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
             {/* Modal Header */}
             <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start bg-slate-50 dark:bg-slate-700/50 rounded-t-xl">
                <div>
                   <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{selectedPost.title}</h3>
                   <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">{selectedPost.tag}</span>
                      <span className="flex items-center"><User className="w-3 h-3 mr-1"/> {selectedPost.author}</span>
                      <span>2024-05-22 14:30</span>
                      <span className="flex items-center"><Eye className="w-3 h-3 mr-1"/> {selectedPost.views} 阅读</span>
                   </div>
                </div>
                <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors">
                   <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </button>
             </div>

             {/* Modal Content */}
             <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/50">
                {/* Main Topic Content (Mocked) */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      这里是楼主发布的内容详情。针对{selectedPost.title}，我遇到了一些技术难点，希望大家能一起讨论一下。
                      <br/><br/>
                      具体情况如下：
                      1. 工况参数输入异常
                      2. 计算结果不收敛
                      <br/>
                      是否有人遇到过类似情况？附件中有具体的计算日志。
                   </p>
                   <div className="flex justify-end space-x-4 mt-6">
                      <button className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                         <ThumbsUp className="w-4 h-4 mr-1" /> 点赞 (5)
                      </button>
                      <button className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                         <MessageSquare className="w-4 h-4 mr-1" /> 回复
                      </button>
                   </div>
                </div>

                {/* Comments List (Mocked) */}
                <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 px-1">共 {selectedPost.replies} 条回复</h4>
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                         <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-2">
                               <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-300">
                                  User
                               </div>
                               <div>
                                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">技术达人_{i}</div>
                                  <div className="text-xs text-slate-400 dark:text-slate-500">{i + 1}楼 • 1小时前</div>
                               </div>
                            </div>
                         </div>
                         <p className="text-sm text-slate-600 dark:text-slate-300 pl-10">
                            我觉得可以尝试调整一下边界条件，特别是出口压力的设置。之前我也遇到过类似的不收敛情况，改了湍流模型就好了。
                         </p>
                      </div>
                   ))}
                </div>
             </div>

             {/* Reply Input */}
             <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 rounded-b-xl">
                <div className="relative">
                   <textarea 
                     className="w-full pl-4 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm dark:bg-slate-700 dark:text-white"
                     placeholder="撰写您的回复..."
                     rows={2}
                   ></textarea>
                   <button className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Send className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {isNewPostModalOpen && (
         <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
               <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">发起新话题</h3>
                  <button onClick={() => setIsNewPostModalOpen(false)} className="hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full p-1 transition-colors">
                     <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">标题</label>
                     <input type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="请输入简明扼要的标题" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">板块</label>
                     <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                        <option>技术讨论</option>
                        <option>问题求助</option>
                        <option>经验分享</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">内容</label>
                     <textarea rows={6} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="详细描述您的问题或观点..."></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                     <button onClick={() => setIsNewPostModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg mr-2 transition-colors">取消</button>
                     <button onClick={() => { setIsNewPostModalOpen(false); alert("发布成功"); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">发布</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Forum;