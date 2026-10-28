'use client';

import React from 'react';
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export default function ProvisioningPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Sync & Provisioning</h1>
          <p className="text-slate-500 text-sm mt-1">Manage integrations with external CRM and payment providers.</p>
        </div>
        <button className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md shadow flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Force Manual Sync</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">ActiveCampaign CRM</h3>
            <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded"><CheckCircle2 className="w-4 h-4 mr-1"/> Connected</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Syncs new contacts tagged with "Growth Program" to portal clients.</p>
          <div className="text-xs text-slate-400">Last sync: 5 minutes ago</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Stripe Billing</h3>
            <span className="flex items-center text-sm text-red-600 bg-red-50 px-2 py-1 rounded"><XCircle className="w-4 h-4 mr-1"/> Error</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Manages subscription entitlement and portal access revocation.</p>
          <div className="text-xs text-red-500">API Key expired. Update required in settings.</div>
        </div>
      </div>
    </div>
  );
}