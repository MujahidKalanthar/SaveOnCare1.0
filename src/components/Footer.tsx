/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Footer Component
 * Clean, ethical footer with MNNIT Allahabad Renaissance 10.0 attribution and disclaimers.
 */

import React from 'react';
import { ActiveTab } from './Header';
import { ShieldCheck, Scale, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="no-print bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                SC
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                SaveOnCare
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Patient-facing healthcare billing transparency platform proposed by Team VoltEdge for the Renaissance 10.0 B-Plan competition at Motilal Nehru National Institute of Technology (MNNIT) Allahabad.
            </p>
            <div className="text-[11px] text-stone-400">
              Focus Ecosystem: National Capital Territory (NCT) of Delhi & Indian Public Healthcare.
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Navigation
            </span>
            <ul className="text-xs space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('landing')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Overview & Problem
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('workspace')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Bill Analysis Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('report')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Patient Clarity Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Public Healthcare Schemes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  About & Ethics
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory & Official Portals */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Official Resources
            </span>
            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <a
                  href="https://nppaindia.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>NPPA Drug Ceiling Caps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://cghs.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>CGHS Delhi Tariff Schedule</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://consumerhelpline.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>National Consumer Helpline</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Ayushman Bharat PM-JAY</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Medical Disclaimers */}
        <div className="border-t border-stone-800 pt-6 space-y-2 text-[11px] text-stone-400 leading-relaxed">
          <p>
            <strong className="text-stone-300">Non-Clinical & Non-Legal Advisory: </strong>
            SaveOnCare is an educational healthcare analytics platform. It does not provide medical diagnoses, treatment advice, or formal legal arbitration. Price variances indicate items that warrant patient review with hospital billing departments and do not constitute legal proof of overcharging or malpractice.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-stone-400">
            <span>© 2024–2026 VoltEdge · Prepared for Renaissance 10.0 B-Plan at MNNIT Allahabad.</span>
            <span>Synthetic Demonstration Sandbox · 100% Client-Side Privacy.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
