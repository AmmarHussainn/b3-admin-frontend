'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, Plus, BookOpen, MoreVertical, X, 
  Layers, FileVideo, Edit3, Trash2, Eye, ExternalLink, Check 
} from 'lucide-react';

const DUMMY_MODULES = [
  { id: 'c1', title: 'Course 1 - Market Fundamentals', lessons: 8, status: 'Published', container: 'Core Training' },
  { id: 'c2', title: 'Course 2 - Product Led Growth', lessons: 6, status: 'Published', container: 'Core Training' },
  { id: 'c3', title: 'Course 3 - The Vital Signs', lessons: 10, status: 'Draft', container: 'Advanced System' },
];

export default function TrainingPage() {
  const router = useRouter();
  const [modules, setModules] = useState(DUMMY_MODULES);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Form states
  const [titleInput, setTitleInput] = useState('');
  const [containerInput, setContainerInput] = useState('Core Training');

  // Search Filter
  const filteredModules = modules.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.container.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create Module
  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!titleInput) return;

    const newModule = {
      id: `c-${Date.now()}`,
      title: titleInput,
      lessons: 0,
      status: 'Draft',
      container: containerInput,
    };

    setModules([newModule, ...modules]);
    setTitleInput('');
    setIsCreateModalOpen(false);
  };

  // Edit / Update Module
  const handleUpdateModule = (e) => {
    e.preventDefault();
    if (!editingModule) return;

    setModules(modules.map(m => 
      m.id === editingModule.id 
        ? { ...m, title: titleInput, container: containerInput }
        : m
    ));
    setEditingModule(null);
    setTitleInput('');
  };

  // Toggle Publish Status
  const handleToggleStatus = (id) => {
    setModules(modules.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'Published' ? 'Draft' : 'Published' };
      }
      return m;
    }));
    setOpenDropdownId(null);
  };

  // Delete Module
  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setModules(modules.filter(m => m.id !== deleteTarget.id));
      setDeleteTarget(null);
      setOpenDropdownId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Training System Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Manage core courses, modules, containers, and individual lesson assets.</p>
        </div>
        <button 
          onClick={() => {
            setTitleInput('');
            setContainerInput('Core Training');
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md shadow flex items-center space-x-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Course / Module</span>
        </button>
      </div>

      {/* Sub-Directory Quick Access Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold uppercase text-slate-400 mr-2">Quick Routes:</span>
          <Link 
            href="/training/containers"
            className="px-3 py-1.5 bg-stone-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-900" />
            <span>Containers</span>
          </Link>
          <Link 
            href="/training/lessons"
            className="px-3 py-1.5 bg-stone-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <FileVideo className="w-3.5 h-3.5 text-blue-900" />
            <span>All Lessons</span>
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex items-center bg-stone-50 border border-slate-200 rounded-md p-1.5 max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 ml-1 mr-2 shrink-0" />
          <input 
            type="text"
            placeholder="Search courses or containers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none placeholder-slate-400"
          />
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((mod) => (
          <div key={mod.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div>
              {/* Card Top Row */}
              <div className="flex justify-between items-start mb-3">
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                
                {/* Actions Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setOpenDropdownId(openDropdownId === mod.id ? null : mod.id)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-stone-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {openDropdownId === mod.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-20 text-xs text-slate-700">
                      <button 
                        onClick={() => {
                          setEditingModule(mod);
                          setTitleInput(mod.title);
                          setContainerInput(mod.container);
                          setOpenDropdownId(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-stone-50 flex items-center space-x-2"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Edit Details</span>
                      </button>

                      <button 
                        onClick={() => handleToggleStatus(mod.id)}
                        className="w-full text-left px-3 py-2 hover:bg-stone-50 flex items-center space-x-2"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Mark as {mod.status === 'Published' ? 'Draft' : 'Published'}</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button 
                        onClick={() => {
                          setDeleteTarget(mod);
                          setOpenDropdownId(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Module</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Module Info */}
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-stone-100 px-2 py-0.5 rounded border border-slate-200 inline-block mb-2">
                {mod.container}
              </span>

              <h3 
                onClick={() => router.push(`/training/courses/${mod.id}`)}
                className="font-semibold text-slate-900 text-base mb-1 hover:text-blue-900 cursor-pointer transition-colors line-clamp-1"
              >
                {mod.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono">{mod.lessons} Lessons included</p>
            </div>

            {/* Bottom Footer Action */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                mod.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {mod.status}
              </span>

              <button 
                onClick={() => router.push(`/training/courses/${mod.id}`)}
                className="text-xs text-blue-900 hover:text-blue-700 font-semibold flex items-center space-x-1 group"
              >
                <span>Manage Curriculum</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}

        {filteredModules.length === 0 && (
          <div className="col-span-full bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-medium text-slate-700">No training modules found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or create a new module.</p>
          </div>
        )}
      </div>

      {/* Create Module Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-stone-50">
              <h3 className="font-semibold text-slate-900">Create New Module</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateModule} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Module / Course Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Course 4 - Revenue Operations"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent Container</label>
                <select 
                  value={containerInput}
                  onChange={(e) => setContainerInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
                >
                  <option value="Core Training">Core Training</option>
                  <option value="Advanced System">Advanced System</option>
                  <option value="Executive Partner">Executive Partner</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)} 
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md shadow transition-colors"
                >
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {editingModule && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-stone-50">
              <h3 className="font-semibold text-slate-900">Edit Module Details</h3>
              <button onClick={() => setEditingModule(null)} className="text-slate-400 hover:text-slate-700 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateModule} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Module Title</label>
                <input 
                  type="text" 
                  required
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent Container</label>
                <select 
                  value={containerInput}
                  onChange={(e) => setContainerInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-white"
                >
                  <option value="Core Training">Core Training</option>
                  <option value="Advanced System">Advanced System</option>
                  <option value="Executive Partner">Executive Partner</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setEditingModule(null)} 
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md shadow transition-colors"
                >
                  Save Changes
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
              <h3 className="text-lg font-bold text-slate-900 mb-1">Delete Training Module?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>? This will remove all attached lessons.
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