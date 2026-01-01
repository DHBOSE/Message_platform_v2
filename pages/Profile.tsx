import React, { useState } from 'react';
import { User, Mail, Shield, Bell, Lock, LogOut, Edit2, List, MessageSquare } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';

const Profile: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'notifications' | 'posts'>('notifications');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative transition-colors">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
             <div className="flex items-end">
                <div className="w-24 h-24 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-lg transition-colors">
                   <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-2xl font-bold text-slate-400 dark:text-slate-500">
                      张
                   </div>
                </div>
                <div className="ml-4 mb-1">
                   <h2 className="text-2xl font-bold text-slate-800 dark:text-white">张工</h2>
                   <p className="text-slate-500 dark:text-slate-400">离心压缩机室 | 高级工程师</p>
                </div>
             </div>
             <button 
               onClick={() => setShowEditModal(true)}
               className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium flex items-center transition-colors"
             >
                <Edit2 className="w-4 h-4 mr-2" /> 编辑资料
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
             <div className="flex items-center text-slate-600 dark:text-slate-400">
                <Mail className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                <span>zhang@shaangu.com</span>
             </div>
             <div className="flex items-center text-slate-600 dark:text-slate-400">
                <Shield className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                <span>工号: 2024001</span>
             </div>
             <div className="flex items-center text-slate-600 dark:text-slate-400">
                <Lock className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                <span>上次登录: 2小时前</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Settings */}
         <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
               <h3 className="font-bold text-slate-800 dark:text-white mb-4">快捷设置</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-600 dark:text-slate-400">邮件通知</span>
                     <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-600 dark:text-slate-400">桌面推送</span>
                     <div className="w-10 h-5 bg-slate-200 dark:bg-slate-600 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
                     </div>
                  </div>
                  <hr className="border-slate-100 dark:border-slate-700" />
                  <button className="w-full py-2 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                     <LogOut className="w-4 h-4 mr-2" /> 退出登录
                  </button>
               </div>
            </div>
         </div>

         {/* My Activities */}
         <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
               <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center">
                     {activeTab === 'notifications' ? <Bell className="w-5 h-5 mr-2 text-blue-500" /> : <MessageSquare className="w-5 h-5 mr-2 text-green-500" />} 
                     我的动态
                  </h3>
                  <div className="flex space-x-2">
                     <button 
                        onClick={() => setActiveTab('notifications')}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${activeTab === 'notifications' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                     >
                        未读通知
                     </button>
                     <button 
                        onClick={() => setActiveTab('posts')}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${activeTab === 'posts' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                     >
                        我的发帖
                     </button>
                  </div>
               </div>
               
               <div className="space-y-3 min-h-[200px]">
                  {activeTab === 'notifications' ? (
                     <>
                        {[1, 2, 3].map(i => (
                           <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg flex justify-between items-start hover:bg-blue-50 dark:hover:bg-blue-900/10 cursor-pointer transition-colors">
                              <div>
                                 <div className="flex items-center space-x-2 mb-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <h4 className="font-medium text-slate-700 dark:text-slate-200 text-sm">【紧急】关于服务器维护的通知</h4>
                                 </div>
                                 <p className="text-xs text-slate-500 dark:text-slate-400 pl-4">信息中心 | 2024-05-22</p>
                              </div>
                           </div>
                        ))}
                        <button className="w-full mt-4 text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">查看全部未读</button>
                     </>
                  ) : (
                     <>
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50">
                           <h4 className="font-medium text-slate-700 dark:text-slate-200 text-sm mb-1">关于高转速下轴承油膜振荡的抑制方法探讨</h4>
                           <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
                              <span>回复: 45</span>
                              <span>浏览: 1205</span>
                              <span>2024-05-20</span>
                           </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50">
                           <h4 className="font-medium text-slate-700 dark:text-slate-200 text-sm mb-1">【求助】ASPEN模拟数据收敛性问题</h4>
                           <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
                              <span>回复: 12</span>
                              <span>浏览: 340</span>
                              <span>2024-05-18</span>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
               <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">编辑个人资料</h3>
                  <button onClick={() => setShowEditModal(false)} className="hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full p-1 transition-colors">
                     <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">联系电话</label>
                     <input type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="138-0000-0001" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">办公地点</label>
                     <input type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="研发大楼 305" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">个人简介</label>
                     <textarea rows={3} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none" defaultValue="专注离心压缩机气动设计10年..." />
                  </div>
                  <div className="flex justify-end pt-4">
                     <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg mr-2 transition-colors">取消</button>
                     <button onClick={() => setShowEditModal(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">保存更改</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Profile;