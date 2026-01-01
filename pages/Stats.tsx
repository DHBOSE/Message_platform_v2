import React from 'react';
import { BarChart2, PieChart, TrendingUp, Download, Users } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Summary Cards */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
               <BarChart2 className="w-8 h-8" />
            </div>
            <div>
               <p className="text-sm text-slate-500 dark:text-slate-400">本月发布通知</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">24 <span className="text-sm font-normal text-green-500">+12%</span></h3>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
               <Download className="w-8 h-8" />
            </div>
            <div>
               <p className="text-sm text-slate-500 dark:text-slate-400">资料下载总量</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">1,205 <span className="text-sm font-normal text-green-500">+5%</span></h3>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
               <Users className="w-8 h-8" />
            </div>
            <div>
               <p className="text-sm text-slate-500 dark:text-slate-400">活跃用户数</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white">342 <span className="text-sm font-normal text-red-500">-2%</span></h3>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Chart 1: Notification Distribution (Simulated) */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center">
               <PieChart className="w-5 h-5 mr-2 text-slate-500 dark:text-slate-400" />
               通知类型分布
            </h3>
            <div className="space-y-4">
               {[
                  { label: '综合管理', val: '35%', color: 'bg-blue-500' },
                  { label: '离心技术', val: '25%', color: 'bg-indigo-500' },
                  { label: '轴流透平', val: '20%', color: 'bg-purple-500' },
                  { label: '空分专项', val: '10%', color: 'bg-amber-500' },
                  { label: '其他', val: '10%', color: 'bg-slate-300 dark:bg-slate-600' },
               ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                     <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                        <span>{item.label}</span>
                        <span>{item.val}</span>
                     </div>
                     <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.val }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Chart 2: Download Trend (Simulated) */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center">
               <TrendingUp className="w-5 h-5 mr-2 text-slate-500 dark:text-slate-400" />
               月度资料访问趋势
            </h3>
            <div className="flex items-end justify-between h-48 pt-4 space-x-2">
               {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                     <div 
                        className="w-full bg-blue-100 dark:bg-blue-900/40 rounded-t-sm group-hover:bg-blue-500 transition-colors relative"
                        style={{ height: `${h}%` }}
                     >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                           {h * 10}
                        </div>
                     </div>
                     <span className="text-xs text-slate-400 dark:text-slate-500 mt-2">{i + 1}月</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Stats;