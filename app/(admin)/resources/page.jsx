'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, UploadCloud, File, FileText, Download, 
  Trash2, ExternalLink, X, Plus, Check, Filter 
} from 'lucide-react';

const INITIAL_FILES = [
  { id: 'res-1', name: 'Q4 Financial Planner.xlsx', category: 'Finance', size: '1.2 MB', date: 'Oct 20, 2026', version: 'v2', downloads: 142 },
  { id: 'res-2', name: 'Standard Operating Procedures.pdf', category: 'Operations', size: '3.4 MB', date: 'Oct 18, 2026', version: 'v1', downloads: 89 },
  { id: 'res-3', name: 'Brand Guidelines 2026.pdf', category: 'Marketing', size: '5.1 MB', date: 'Oct 10, 2026', version: 'v3', downloads: 310 },
  { id: 'res-4', name: 'Sales Script & Objection Handling.docx', category: 'Sales', size: '850 KB', date: 'Oct 05, 2026', version: 'v1', downloads: 54 },
];

const CATEGORIES = ['All', 'Finance', 'Operations', 'Marketing', 'Sales'];

export default function ResourcesPage() {
  const router = useRouter();
  const [files, setFiles] = useState(INITIAL_FILES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // New File Form State
  const [newFileName, setNewFileName] = useState('');
  const [newFileCategory, setNewFileCategory] = useState('Finance');

  // Filter Logic
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handlers
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newFileName) return;

    const ext = newFileName.includes('.') ? '' : '.pdf';
    const newFile = {
      id: `res-${Date.now()}`,
      name: `${newFileName}${ext}`,
      category: newFileCategory,
      size: '2.4 MB',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      version: 'v1',
      downloads: 0,
    };

    setFiles([newFile, ...files]);
    setNewFileName('');
    setIsUploadOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setFiles(files.filter((f) => f.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Resource Library Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Centralized document management, file uploads, and version tracking.</p>
        </div>
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md shadow flex items-center space-x-2 transition-colors shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Resource</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center bg-white border border-slate-200 rounded-md p-2 shadow-sm max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 ml-2 mr-2" />
          <input 
            type="text" 
            placeholder="Search resources by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none placeholder-slate-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0 hidden sm:block" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Table */}
      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-stone-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-4">File Name & Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Version</th>
              <th className="p-4">Size</th>
              <th className="p-4">Uploaded Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredFiles.map((file) => {
              const isPdf = file.name.toLowerCase().includes('.pdf');
              return (
                <tr key={file.id} className="hover:bg-stone-50/80 transition-colors group">
                  <td className="p-4 font-medium text-slate-900">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${isPdf ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {isPdf ? <FileText className="w-4 h-4" /> : <File className="w-4 h-4" />}
                      </div>
                      <div>
                        <Link 
                          href={`/resources/${file.id}`}
                          className="hover:text-blue-900 hover:underline font-semibold block"
                        >
                          {file.name}
                        </Link>
                        <span className="text-xs text-slate-400 font-normal font-mono">ID: {file.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200">
                      {file.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">{file.version}</td>
                  <td className="p-4 font-mono text-xs text-slate-500">{file.size}</td>
                  <td className="p-4 text-slate-500">{file.date}</td>
                  <td className="p-4 text-right space-x-1 flex items-center">
                    {/* Enter / Manage Specific Resource */}
                    <Link
                      href={`/resources/${file.id}`}
                      className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-slate-100 rounded inline-block transition-colors"
                      title="Manage Specific Resource Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Download File */}
                    <button 
                      onClick={() => alert(`Downloading ${file.name}...`)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                      title="Download Asset"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {/* Delete Resource */}
                    <button 
                      onClick={() => setDeleteTarget(file)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Resource"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan="6" className="p-12 text-center text-slate-500">
                  <File className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-medium text-slate-700">No resources found</p>
                  <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or upload a new file.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal Popup */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-stone-50">
              <h3 className="font-semibold text-slate-900">Upload New Resource</h3>
              <button 
                onClick={() => setIsUploadOpen(false)} 
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Resource Title / Filename</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Q4 Growth Roadmap.pdf"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={newFileCategory}
                  onChange={(e) => setNewFileCategory(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
                >
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">File Attachment</label>
                <div className="border-2 border-dashed border-slate-300 rounded-md p-6 text-center cursor-pointer hover:bg-stone-50 transition-colors">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-sm text-blue-900 font-medium">Click to choose PDF, XLSX, or DOCX</span>
                  <p className="text-xs text-slate-400 mt-1">Maximum file size: 50MB</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsUploadOpen(false)} 
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md shadow transition-colors"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden border border-slate-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Delete Resource?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.name}"</span>? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="w-1/2 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="w-1/2 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium text-white shadow transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}