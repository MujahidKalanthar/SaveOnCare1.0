/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Landing Page
 * 
 * Clean, trustworthy healthcare fintech interface presenting the billing transparency
 * mission proposed by VoltEdge for Renaissance 10.0 B-Plan competition at MNNIT Allahabad.
 */

import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Scale, 
  Lock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { BillDocument } from '../types/billing';

interface LandingPageProps {
  sampleBills: BillDocument[];
  onSelectBill: (bill: BillDocument) => void;
  onNavigateToWorkspace: () => void;
  onNavigateToSchemes: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  sampleBills,
  onSelectBill,
  onNavigateToWorkspace,
  onNavigateToSchemes
}) => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Subtle contextual metadata */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
            <span>VoltEdge</span>
            <span aria-hidden="true">·</span>
            <span>MNNIT Allahabad Renaissance 10.0</span>
            <span aria-hidden="true">·</span>
            <span>Healthcare Billing Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 text-balance leading-tight">
            Clear, transparent hospital bills for patients & families.
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            SaveOnCare itemises complex medical charges, checks eligible items against verified statutory caps and public healthcare tariffs, and equips you with respectful, informed questions for the hospital billing desk.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (sampleBills.length > 0) onSelectBill(sampleBills[0]);
                onNavigateToWorkspace();
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Analyse a Sample Hospital Bill</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToSchemes}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-sm rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Public Healthcare Schemes</span>
              <ExternalLink className="w-4 h-4 text-stone-500" />
            </button>
          </div>

          <div className="pt-2 text-xs text-stone-500 flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>100% Client-side sandbox · Synthetic data demo · Zero medical record upload required</span>
          </div>

        </div>
      </section>

      {/* Interactive Sample Bill Carousel / Selector */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-stone-100/70 border border-stone-200 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 block mb-1">
                Interactive Demonstration
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                Choose a Synthetic Clinical Bill to Inspect
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Each bundled sample reflects authentic Delhi healthcare scenarios with real statutory reference benchmarks.
              </p>
            </div>
            <div className="text-xs text-stone-500">
              Select any bill to open the real-time analysis workspace
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sampleBills.map((bill, index) => {
              const discrepancyCount = bill.lineItems.filter(i => i.matchStatus === 'discrepancy').length;
              const unverifiedCount = bill.lineItems.filter(i => i.matchStatus === 'insufficient_evidence').length;
              const inRangeCount = bill.lineItems.filter(i => i.matchStatus === 'in_range').length;

              return (
                <div
                  key={bill.id}
                  onClick={() => {
                    onSelectBill(bill);
                    onNavigateToWorkspace();
                  }}
                  className="bg-white border border-stone-200 hover:border-orange-500/80 rounded-lg p-5 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-mono text-stone-600">{bill.billNumber}</span>
                      <span>{bill.hospitalTier}</span>
                    </div>

                    <h3 className="font-bold text-stone-900 group-hover:text-orange-700 transition-colors leading-snug">
                      {bill.hospitalName}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {bill.diagnosisSummary}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500">Billed Total:</span>
                      <span className="font-mono font-bold text-stone-900 text-sm">
                        ₹{bill.totalBilled.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Breakdown metrics in unboxed text with separators */}
                    <div className="pt-1 text-[11px] text-stone-500 flex items-center gap-1.5 flex-wrap">
                      <span className="text-emerald-700 font-medium">{inRangeCount} in range</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700 font-medium">{discrepancyCount} review required</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-600">{unverifiedCount} unverified</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-orange-700 group-hover:text-orange-800">
                    <span>Load & Inspect Bill</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Healthcare Billing Problem */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-t border-stone-200 pt-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 block mb-1">
              The Transparency Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Why hospital discharge bills overwhelm patients
            </h2>
            <p className="text-base text-stone-600 mt-2">
              Patients and caretakers face immense emotional stress during medical events. When discharge arrives, billing invoices are frequently opaque, non-standardised, and difficult to verify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-stone-900 text-base">
                Opaque Codes & Unbundled Kits
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Lump-sum line items such as "OT Consumables Pack" or "Administrative Overheads" make it impossible for families to determine what individual items were actually used or dispensed.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-stone-900 text-base">
                Statutory Drug Ceiling Gaps
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                The National Pharmaceutical Pricing Authority (NPPA DPCO) notifies mandatory price caps on hundreds of essential IV fluids and drugs, yet retail markups frequently bypass patient scrutiny.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-stone-900 text-base">
                Lack of Constructive Dialogue Tools
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Families do not want confrontational disputes. They need objective, polite, factual questions to discuss with the hospital billing department before paying or settling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-stone-900 text-white rounded-xl p-8 md:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 block mb-1">
              How SaveOnCare Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              A transparent, three-stage journey to billing clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-3">
              <div className="text-orange-400 font-mono text-sm font-semibold">
                Step 01
              </div>
              <h3 className="text-lg font-bold text-white">
                Itemise & Categorise
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Invoices are broken down into standard medical classifications: Pharmacy, Diagnostics, Room & Nursing, Surgical Procedures, and Consumables.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-orange-400 font-mono text-sm font-semibold">
                Step 02
              </div>
              <h3 className="text-lg font-bold text-white">
                Deterministic Benchmark Match
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Each eligible item is aligned against verified public sources: NPPA Drug Ceiling notifications, CGHS Delhi rate schedules, and Municipal hospital circulars.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-orange-400 font-mono text-sm font-semibold">
                Step 03
              </div>
              <h3 className="text-lg font-bold text-white">
                Patient Clarity Report & Questions
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Generate an executive summary with plain-language explanations, specific questions for the billing counter, and verified official grievance helplines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification-First Approach & Ethics */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border border-stone-200 rounded-xl p-8 bg-white space-y-6">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-orange-600 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              The Verification-First Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-600 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 text-base">
                Empowerment, not Hostile Accusations
              </h3>
              <p>
                SaveOnCare does not automatically accuse hospitals or clinicians of overcharging. A variance between a billed rate and a reference schedule may reflect specialized emergency care, distinct brand formulations, unlisted packaging, or valid institutional overhead.
              </p>
              <p>
                Our objective is to provide patients with objective facts so they can have a constructive, transparent conversation with hospital administrators.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-stone-900 text-base">
                Strict Benchmark Labelling
              </h3>
              <p>
                Every reference price displayed in SaveOnCare includes its exact official circular number, notification date, and governing body. When reference data is unavailable, items are explicitly marked as <em>“Insufficient evidence to compare”</em> rather than guessing or fabricating numbers.
              </p>
              <p>
                We never label potential differences as confirmed savings or guaranteed refunds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy, Limits & Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl font-bold text-stone-900">
            Ready to test SaveOnCare?
          </h2>
          <p className="text-sm text-stone-600">
            Explore the live workspace, tweak billing numbers, inspect deterministic rationale, and export a sample Patient Clarity Report.
          </p>
        </div>

        <button
          onClick={() => {
            if (sampleBills.length > 0) onSelectBill(sampleBills[0]);
            onNavigateToWorkspace();
          }}
          className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Open Bill Analysis Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
