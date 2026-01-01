import React from 'react';
import { MOCK_USERS } from '../constants';
import { Search, Mail, Phone, ChevronRight, User } from 'lucide-react';

const Contacts: React.FC = () => {
  const departments = ['研发部', '离心室', '轴流室', '行政部', '人力资源部', '总成室', '强度计算室'];

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Left Organization Tree */}
      <div className="w-full md:w-1/4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-colors">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
          <h3 className="font-bold text-slate-700 dark:text-slate-200">组织架构</h3>
        </div>
        <div className="p-2 overflow-y-auto flex-1">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg cursor-pointer font-medium">
              <span className="mr-2">📂</span> 陕鼓动力设计研发部
            </div>
            {departments.map(dept => (
               <div key={dept} className="flex items-center px-3 py-2 pl-8 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-lg cursor-pointer text-sm">
                  <span className="mr-2 text-slate-400">└</span> {dept}
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right User Grid */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* Search */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索姓名、职位、电话..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {MOCK_USERS.map(user => (
            <div key={user.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate">{user.name}</h4>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                    {user.status === 'Active' ? '在职' : '离职'}
                  </span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">{user.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{user.department}</p>
                
                <div className="space-y-1">
                   <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                     <Mail className="w-3 h-3 mr-1.5 text-slate-400 dark:text-slate-500" />
                     <span className="truncate">{user.email}</span>
                   </div>
                   <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                     <Phone className="w-3 h-3 mr-1.5 text-slate-400 dark:text-slate-500" />
                     <span>138-0000-000{user.id}</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
          {/* Add more placeholders to fill grid */}
          {[1,2,3,4,5].map(i => (
             <div key={`p-${i}`} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 opacity-60">
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                   <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-3/4"></div>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;