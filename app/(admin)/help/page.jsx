'use client';

import React from 'react';
import { BookOpen, CheckCircle, Video, FileText, Upload } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">Content Publishing SOP</h1>
        <p className="text-slate-400 text-sm mt-1">Standard Operating Procedures for monthly operations.</p>
      </div>

      <div className="space-y-6">
        <section className="bg-[#0F1420] border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="flex items-center space-x-3 text-[#FF0073]">
            <Video className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-white">1. Publishing Growth Lab Replays (48-Hour SLA)</h2>
          </div>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2 pl-2">
            <li>Save raw recording to Consult b3 Google Drive archive first.</li>
            <li>Navigate to <strong>Replays → New Replay</strong>.</li>
            <li>Select the Wednesday session date and enter the topic name.</li>
            <li>Upload raw MP4 file directly to Bunny Stream; wait for encoding completion.</li>
            <li>Add short 2-4 sentence overview summary. Click <strong>Publish</strong>.</li>
          </ol>
        </section>

        <section className="bg-[#0F1420] border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="flex items-center space-x-3 text-[#11BDF2]">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-white">2. Managing Resource Library Assets</h2>
          </div>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2 pl-2">
            <li>Ensure filenames strictly adhere to: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-[#11BDF2] font-mono">b3-topic-assettype-vN.ext</code></li>
            <li>When replacing a file, use the <strong>Replace Version</strong> option inside Resource Manager to preserve completion tracking metrics.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}