import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User, Shield, CheckCircle, XCircle, Search, Plus, Save, Filter } from 'lucide-react';

const Management: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'audit'>('users');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Mock permission data for visual matrix
  const permissions = [
    { module: '通知公告', admin: true, manager: true, user: true },
    { module: '发布通知', admin: true, manager: true, user: false },
    { module: '通知审核', admin: true, manager: true, user: false },
    { module: '用户管理', admin: true, manager: false, user: false },
    { module: '公开资料上传', admin: true, manager: true, user: true },
    { module: '技术论坛管理', admin: true, manager: false, user: false },
  ];

  const tabs = [
    { id: 'users', label: '用户管理', icon: User },
    { id: 'roles', label: '权限管理', icon: Shield },
    { id: 'audit', label: '通知审核', icon: CheckCircle },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col transition-colors">
      {/* Tab Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 overflow-auto">
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="搜索用户..." 
                  className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4 mr-2" /> 新增用户
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3">姓名</th>
                    <th className="px-4 py-3">部门</th>
                    <th className="px-4 py-3">职位</th>
                    <th className="px-4 py-3">状态</th>
                    <th className="px-4 py-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {MOCK_USERS.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-200">{user.name}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{user.department}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{user.role}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {user.status === 'Active' ? '在职' : '离职'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">编辑</button>
                        <button className="text-red-600 dark:text-red-400 hover:underline">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
           <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white">角色权限配置矩阵</h3>
               <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center">
                 <Save className="w-4 h-4 mr-2" /> 保存配置
               </button>
             </div>
             
             <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
                     <tr>
                        <th className="px-6 py-4">功能模块</th>
                        <th className="px-6 py-4 text-center">系统管理员</th>
                        <th className="px-6 py-4 text-center">部门经理</th>
                        <th className="px-6 py-4 text-center">普通员工</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                     {permissions.map((perm, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                           <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">{perm.module}</td>
                           <td className="px-6 py-4 text-center">
                              <input type="checkbox" defaultChecked={perm.admin} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                           </td>
                           <td className="px-6 py-4 text-center">
                              <input type="checkbox" defaultChecked={perm.manager} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                           </td>
                           <td className="px-6 py-4 text-center">
                              <input type="checkbox" defaultChecked={perm.user} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
                </table>
             </div>
           </div>
        )}

        {activeTab === 'audit' && (
           <div className="space-y-6">
             <div className="flex items-center space-x-2 pb-4 border-b border-slate-200 dark:border-slate-700">
                <button className="px-3 py-1 bg-slate-800 dark:bg-white dark:text-slate-900 text-white text-xs rounded-full">待审核 (2)</button>
                <button className="px-3 py-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs rounded-full">已通过</button>
                <button className="px-3 py-1 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs rounded-full">已驳回</button>
             </div>

             <div className="space-y-4">
               {[1, 2].map(i => (
                 <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                   <div className="mb-4 md:mb-0">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 rounded border border-amber-200 dark:border-amber-800">待审核</span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">关于开展2024年夏季高温补贴申报的通知</h4>
                     </div>
                     <p className="text-sm text-slate-500 dark:text-slate-400">发布人：王经理 | 部门：人力资源部 | 提交时间：2024-05-22 09:30</p>
                   </div>
                   <div className="flex gap-2">
                     <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center transition-colors">
                       <CheckCircle className="w-4 h-4 mr-1" /> 通过
                     </button>
                     <button className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm rounded hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-300 transition-colors flex items-center">
                       <XCircle className="w-4 h-4 mr-1" /> 驳回
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-700/50">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">新增用户</h3>
              <button onClick={() => setShowAddUserModal(false)} className="hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full p-1 transition-colors">
                <XCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">姓名</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="请输入姓名" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">邮箱</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="请输入企业邮箱" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">部门</label>
                   <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>离心压缩机室</option>
                      <option>轴流透平室</option>
                      <option>研发管理部</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">角色</label>
                   <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>普通员工</option>
                      <option>部门经理</option>
                      <option>管理员</option>
                   </select>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg mr-2 transition-colors">取消</button>
                <button onClick={() => setShowAddUserModal(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">确认添加</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;