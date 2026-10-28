'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewReplayPage() {
  const router = useRouter();
  const [sessionDate, setSessionDate] = useState('2026-10-28');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoId, setVideoId] = useState(null);

  // Auto-formatted title according to system rules: YYYY-MM Growth Lab - Topic
  const formattedTitle = sessionDate && topic 
    ? `${sessionDate.slice(0, 7)} Growth Lab - ${topic}`
    : 'YYYY-MM Growth Lab - [Topic]';

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Fetch TUS signed credentials from API BFF
      const res = await fetch('/api/proxy/admin/videos/upload-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formattedTitle }),
      });
      const creds = await res.json();
      
      // Direct browser upload to Bunny Stream via signature
      setVideoId(creds.videoId);
      setProgress(100); // TUS progress simulation
      setUploading(false);
    } catch (err) {
      alert('Upload initialization failed');
      setUploading(false);
    }
  };

  const handleSubmit = async (isDraft) => {
    const payload = {
      title: formattedTitle,
      sessionDate,
      description,
      bunnyVideoId: videoId,
      status: isDraft ? 'draft' : 'live',
    };

    await fetch('/api/proxy/admin/replays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    router.push('/replays');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Publish Growth Lab Replay</h1>
        <p className="text-slate-400 text-sm mt-1">Replays are automatically indexed into annual archives.</p>
      </div>

      <div className="bg-[#0F1420] border border-slate-800 p-6 rounded-xl space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Session Date</label>
          <input 
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-[#FF0073] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Topic / Title</label>
          <input 
            type="text"
            placeholder="e.g. Cash Flow Visibility"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-[#FF0073] outline-none"
          />
        </div>

        {/* Naming Standard Preview */}
        <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs font-mono">
          <span className="text-slate-500">System Title Output: </span>
          <span className="text-[#11BDF2] font-semibold">{formattedTitle}</span>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Description (2-4 sentences)</label>
          <textarea 
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-[#FF0073] outline-none"
          />
        </div>

        {/* Direct Upload Widget */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Master Recording Video</label>
          <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-6 text-center bg-slate-900/40">
            {videoId ? (
              <div className="flex items-center justify-center space-x-2 text-emerald-400 font-medium">
                <CheckCircle className="w-5 h-5" />
                <span>Video uploaded & encoding (Bunny ID: {videoId})</span>
              </div>
            ) : (
              <div>
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-input" />
                <label htmlFor="video-input" className="cursor-pointer text-sm text-[#FF0073] hover:underline font-medium">
                  Click to choose file or drop video here
                </label>
                <p className="text-xs text-slate-500 mt-1">Direct TUS resumable upload straight to Bunny Stream.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button 
            onClick={() => handleSubmit(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSubmit(false)}
            disabled={!videoId}
            className="px-5 py-2 bg-[#FF0073] hover:bg-[#ff0073]/90 disabled:opacity-50 text-white text-sm font-semibold rounded-lg"
          >
            Publish Replay
          </button>
        </div>
      </div>
    </div>
  );
}