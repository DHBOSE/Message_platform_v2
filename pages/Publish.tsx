import React, { useState } from 'react';
import { Category, Priority } from '../types';
import { Send, Upload, Clock } from 'lucide-react';

const Publish: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('通知发布成功！需等待管理员审核。');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">发布新通知</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">请填写以下信息，带 * 为必填项</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">通知标题 *</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="请输入通知标题"
              />
            </div>
            
            <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">所属分类 *</label>
               <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                 {Object.values(Category).map(c => (
                   <option key={c} value={c}>{c}</option>
                 ))}
               </select>
            </div>
            
             <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">优先级</label>
               <div className="flex space-x-4">
                 {Object.values(Priority).map(p => (
                   <label key={p} className="flex items-center space-x-2 cursor-pointer">
                     <input type="radio" name="priority" value={p} className="text-blue-600 focus:ring-blue-500" defaultChecked={p === Priority.MEDIUM} />
                     <span className="text-sm text-slate-600 dark:text-slate-400">{p}</span>
                   </label>
                 ))}
               </div>
            </div>

            <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">有效期至</label>
               <input 
                 type="date" 
                 className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
               />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">发布范围</label>
            <select className="w-full md:w-1/2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option>全体设计研发人员</option>
              <option>仅部门经理</option>
              <option>离心压缩机室</option>
              <option>轴流透平室</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">通知内容 (富文本) *</label>
            <textarea 
              required
              rows={8}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none font-mono text-sm"
              placeholder="# 支持 Markdown 语法..."
              defaultValue="请在此处输入详细内容..."
            ></textarea>
            <div className="text-xs text-slate-400 text-right">已输入 12 字</div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">附件上传</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">点击上传</span> 或拖拽文件至此</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">支持 PDF, DOC, XLS (最大 10MB)</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
               <input type="checkbox" id="schedule" className="rounded text-blue-600 focus:ring-blue-500" />
               <label htmlFor="schedule" className="text-sm flex items-center cursor-pointer">
                 <Clock className="w-4 h-4 mr-1" /> 定时发布
               </label>
             </div>
             
             <div className="flex space-x-4">
               <button type="button" className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                 存草稿
               </button>
               <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
               >
                 {loading ? '提交中...' : <><Send className="w-4 h-4 mr-2" /> 立即发布</>}
               </button>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;