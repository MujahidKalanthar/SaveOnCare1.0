/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Healthcare Assistance & Schemes Guide
 * Transparent information on public health schemes (AB PM-JAY, DAK, DAN, Jan Aushadhi)
 * with educational eligibility checklists and official verified portals.
 */

import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { HEALTHCARE_SCHEMES } from '../data/referenceDatabase';

export const HealthcareAssistanceView: React.FC = () => {
  // Educational self-check states (non-binding)
  const [isDelhiResident, setIsDelhiResident] = useState(true);
  const [isSenior70Plus, setIsSenior70Plus] = useState(false);
  const [hasRationCard, setHasRationCard] = useState(false);
  const [hasGovtHospitalReferral, setHasGovtHospitalReferral] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700">
          <span>Public Healthcare Navigator</span>
          <span aria-hidden="true">·</span>
          <span>Delhi & National Ecosystem</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Public Healthcare Schemes & Financial Assistance
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Learn about available government healthcare safety nets, statutory medicine subsidies, and hospital referral reimbursement programs.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-semibold">Important Educational Guidance Notice:</strong>
          <p className="leading-relaxed">
            SaveOnCare does <strong>not</strong> determine formal scheme eligibility. Entitlement is subject to official government guidelines, SECC criteria, domicile verification, and hospital empanelment. Always consult the official government portals or hospital Ayushman Mitra / Medical Social Worker desks listed below.
          </p>
        </div>
      </div>

      {/* Educational Self-Check Wizard (Educational only) */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-700 block mb-1">
            Educational Navigator
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            Check Potentially Relevant Schemes for Your Situation
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Select the indicators that apply to see which schemes you should investigate first:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50 cursor-pointer">
            <input
              type="checkbox"
              checked={isDelhiResident}
              onChange={(e) => setIsDelhiResident(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500"
            />
            <span className="text-stone-800 font-medium">Resident of NCT of Delhi (Voter ID / Domicile)</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50 cursor-pointer">
            <input
              type="checkbox"
              checked={isSenior70Plus}
              onChange={(e) => setIsSenior70Plus(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500"
            />
            <span className="text-stone-800 font-medium">Senior Citizen Aged 70 or Older (Universal Ayushman)</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50 cursor-pointer">
            <input
              type="checkbox"
              checked={hasRationCard}
              onChange={(e) => setHasRationCard(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500"
            />
            <span className="text-stone-800 font-medium">Holds BPL / Antyodaya / NFS Ration Card</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-50 cursor-pointer">
            <input
              type="checkbox"
              checked={hasGovtHospitalReferral}
              onChange={(e) => setHasGovtHospitalReferral(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500"
            />
            <span className="text-stone-800 font-medium">Referred by Delhi Govt / MCD Hospital for Surgery or Scan</span>
          </label>
        </div>

        {/* Suggestion banner */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700">
          <strong className="text-stone-900">Recommended Next Steps Based on Selections: </strong>
          {isSenior70Plus ? (
            <span>You may be eligible for universal ₹5 Lakh cover under <strong>Ayushman Bharat Vay Vandana</strong> regardless of income. </span>
          ) : null}
          {isDelhiResident && hasGovtHospitalReferral ? (
            <span>Explore <strong>Delhi Arogya Kosh (DAK)</strong> for free private diagnostics/surgeries on referral. </span>
          ) : null}
          {hasRationCard ? (
            <span>Investigate <strong>Delhi Arogya Nidhi (DAN)</strong> or <strong>AB PM-JAY</strong> for major hospital grants. </span>
          ) : null}
          <span>For all patients, <strong>PM Jan Aushadhi Kendras</strong> offer 50-90% lower generic drug rates without paperwork.</span>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-stone-900">
          Notified Healthcare Assistance Schemes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HEALTHCARE_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                    {scheme.acronym}
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    Toll-Free: {scheme.helpline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {scheme.name}
                </h3>

                <p className="text-xs text-stone-500">
                  Authority: {scheme.governingBody}
                </p>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {scheme.summary}
                </p>

                <div className="p-2.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-800">
                  <strong>Assistance Limit: </strong>{scheme.coverageLimit}
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                    Key Entitlements
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc">
                    {scheme.keyEntitlements.map((ent, i) => (
                      <li key={i}>{ent}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                    Required Documents
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-700">
                    {scheme.documentsRequired.map((doc, j) => (
                      <span key={j} className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500">
                  Target: {scheme.targetBeneficiaries.slice(0, 40)}...
                </span>
                <a
                  href={scheme.officialPortal}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Guide for Patients at Hospital Kiosks */}
      <div className="border border-stone-200 rounded-xl p-6 bg-stone-50 space-y-4">
        <h3 className="text-base font-bold text-stone-900">
          Where to Go at Delhi Hospitals for Scheme Guidance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-1.5">
            <strong className="text-stone-900 block">1. Ayushman Mitra Kiosk</strong>
            <p>
              Located in all empaneled public & private hospitals near the main admission or registration counter. They verify Aadhaar eligibility on the BIS portal directly.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-1.5">
            <strong className="text-stone-900 block">2. Medical Social Service Officer (MSSO)</strong>
            <p>
              Located in Delhi Govt & MCD hospital administrative blocks. They assist BPL patients with Delhi Arogya Nidhi applications and waivers.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-1.5">
            <strong className="text-stone-900 block">3. Delhi Arogya Kosh Helpdesk</strong>
            <p>
              Available at designated government hospitals to authorize referral slips for CT scans, MRIs, and surgeries at empaneled private centres.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
