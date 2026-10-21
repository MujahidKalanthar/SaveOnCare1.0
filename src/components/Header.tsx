/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Header Navigation
 * Adheres strictly to the Top Bar Contract:
 * [Brand title, one line] — [4-5 nav links, single-line] — [1 primary action]
 */

import React from 'react';
import { ShieldCheck, FileSpreadsheet, FileText, Landmark, Info, ArrowUpRight } from 'lucide-react';

export type ActiveTab = 'landing' | 'workspace' | 'report' | 'schemes' | 'about';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeBillTotal: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, activeBillTotal }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-orange-700 transition-colors">
            SC
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold tracking-tight text-stone-900 block">
              SaveOnCare
            </span>
            <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider block">
              VoltEdge · Renaissance 10.0
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('landing')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'landing'
                ? 'text-orange-700 font-semibold border-b-2 border-orange-600'
                : 'hover:text-stone-900'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('workspace')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'workspace'
                ? 'text-orange-700 font-semibold border-b-2 border-orange-600'
                : 'hover:text-stone-900'
            }`}
          >
            Bill Workspace
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'report'
                ? 'text-orange-700 font-semibold border-b-2 border-orange-600'
                : 'hover:text-stone-900'
            }`}
          >
            Clarity Report
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'schemes'
                ? 'text-orange-700 font-semibold border-b-2 border-orange-600'
                : 'hover:text-stone-900'
            }`}
          >
            Schemes & Assistance
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'about'
                ? 'text-orange-700 font-semibold border-b-2 border-orange-600'
                : 'hover:text-stone-900'
            }`}
          >
            About & Ethics
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeTab !== 'workspace' && activeTab !== 'report' ? (
            <button
              onClick={() => setActiveTab('workspace')}
              className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Analyse Sample Bill</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab(activeTab === 'workspace' ? 'report' : 'workspace')}
              className="cursor-pointer px-4 py-2 text-xs font-semibold text-stone-900 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              {activeTab === 'workspace' ? (
                <>
                  <FileText className="w-3.5 h-3.5 text-orange-600" />
                  <span>View Clarity Report</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-3.5 h-3.5 text-stone-600" />
                  <span>Return to Workspace</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden border-t border-stone-200 px-4 py-2 bg-stone-100/70 overflow-x-auto flex items-center gap-3 no-scrollbar text-xs font-medium">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'landing' ? 'bg-orange-600 text-white' : 'text-stone-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('workspace')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'workspace' ? 'bg-orange-600 text-white' : 'text-stone-700'
          }`}
        >
          Bill Workspace
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'report' ? 'bg-orange-600 text-white' : 'text-stone-700'
          }`}
        >
          Clarity Report
        </button>
        <button
          onClick={() => setActiveTab('schemes')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'schemes' ? 'bg-orange-600 text-white' : 'text-stone-700'
          }`}
        >
          Schemes
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'about' ? 'bg-orange-600 text-white' : 'text-stone-700'
          }`}
        >
          About
        </button>
      </div>
    </header>
  );
};
