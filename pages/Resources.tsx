import React, { useState } from 'react';
import { MOCK_DOCS } from '../constants';
import { Search, FileText, Download, Filter, FileSpreadsheet } from 'lucide-react';

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'PDF' | 'DOC' | 'XLS'>('ALL');

  const filteredDocs = MOCK_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    if (type === 'XLS') return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
    return <FileText className="w-8 h-8 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索标准、规范、文档..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-2" />
          {['ALL', 'PDF', 'DOC', 'XLS'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                filterType === type 
                  ? 'bg-slate-800 dark:bg-blue-600 text-white' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {type === 'ALL' ? '全部' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">文件名称</th>
                <th className="px-6 py-4">类型</th>
                <th className="px-6 py-4">大小</th>
                <th className="px-6 py-4">上传日期</th>
                <th className="px-6 py-4">下载次数</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-600 group-hover:shadow-sm transition-all">
                        {getIcon(doc.type)}
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {doc.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs font-bold rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{doc.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{doc.downloads}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDocs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    未找到相关文档
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Resources;