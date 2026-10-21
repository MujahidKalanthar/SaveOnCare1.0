/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare About & Ethics View
 * Details on VoltEdge, Renaissance 10.0 B-Plan competition at MNNIT Allahabad,
 * architectural integrity, client-side privacy, and pre-deployment roadmap.
 */

import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Lock, 
  FileCheck, 
  Code2, 
  Database, 
  CheckCircle2, 
  Sparkles,
  Building,
  GraduationCap
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-700">
          <span>Project Governance & Ethics</span>
          <span aria-hidden="true">·</span>
          <span>Renaissance 10.0</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          About SaveOnCare & Foundational Principles
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          SaveOnCare is a patient-facing healthcare billing transparency platform proposed by Team VoltEdge for the Renaissance 10.0 B-Plan competition at Motilal Nehru National Institute of Technology (MNNIT) Allahabad.
        </p>
      </div>

      {/* Renaissance 10.0 Context Card */}
      <div className="bg-stone-100/70 border border-stone-200 rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-orange-600" />
          <h2 className="text-base font-bold text-stone-900">
            Competition Context: Renaissance 10.0 B-Plan at MNNIT Allahabad
          </h2>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          Developed by <strong>VoltEdge</strong>, SaveOnCare addresses one of the most acute pain points in Indian private and municipal healthcare: the anxiety and financial uncertainty patients face when receiving complex, unstandardized inpatient bills upon hospital discharge.
        </p>
        <p className="text-xs text-stone-600 leading-relaxed">
          Our business proposition combines patient advocacy software, standardized public tariff benchmarks (NPPA DPCO and CGHS schedules), and institutional dispute de-escalation tools to bridge the information asymmetry between hospitals and families.
        </p>
      </div>

      {/* Non-Adversarial Verification Philosophy */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-stone-800" />
          <h2 className="text-base font-bold text-stone-900">
            The Non-Adversarial Standard
          </h2>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          Unlike platforms that promote hostile confrontation, SaveOnCare is designed to facilitate constructive reconciliation. In healthcare, billing differences frequently arise from legitimate operational factors:
        </p>
        <ul className="text-xs text-stone-600 space-y-1.5 pl-4 list-disc">
          <li>Specific patented or imported pharmaceutical brands when generic formulations are contraindicated.</li>
          <li>Urgent emergency interventions performed outside routine operating-room hours.</li>
          <li>Clinical comorbidities requiring enhanced nursing care or continuous intensivist monitoring.</li>
          <li>Institutional overheads that are bundled differently across private vs. municipal hospital tiers.</li>
        </ul>
        <p className="text-xs text-stone-700 font-medium">
          Therefore, SaveOnCare explicitly classifies variations as <em>“Potential discrepancy — review required”</em> and never makes defamatory accusations or presents simulated figures as guaranteed refunds.
        </p>
      </div>

      {/* Privacy Architecture & Client-Side Sandbox */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-stone-800" />
          <h2 className="text-base font-bold text-stone-900">
            Strict Patient Privacy & Zero Data Exfiltration
          </h2>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          Healthcare data is deeply sensitive. To uphold patient confidentiality:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
            <strong className="text-stone-900 block">100% Client-Side Processing</strong>
            <p className="text-stone-600">
              In this evaluation prototype, bill parsing, matching, and clarity report generation occur entirely inside the user's browser runtime. No medical records or personal data are transmitted to external servers.
            </p>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
            <strong className="text-stone-900 block">No Paid AI Key Dependency</strong>
            <p className="text-stone-600">
              All taxonomy matching is executed deterministically without sending private health records to cloud LLM APIs, preventing inadvertent privacy leaks.
            </p>
          </div>
        </div>
      </div>

      {/* Synthetic Data Disclosures */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-stone-800" />
          <h2 className="text-base font-bold text-stone-900">
            Synthetic Data Disclosure & Catalog Structure
          </h2>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          For the Renaissance 10.0 evaluation, all hospital bills, patient names, and invoice identifiers are synthetic:
        </p>
        <ul className="text-xs text-stone-600 space-y-1.5 pl-4 list-disc">
          <li><strong>Sample Bills Catalog:</strong> Stored in <code>/src/data/sampleBills.ts</code>, featuring realistic Delhi cases (MCD hospital laparoscopic surgery, private hospital dengue care, and maternity delivery).</li>
          <li><strong>Reference Benchmark Catalog:</strong> Stored in <code>/src/data/referenceDatabase.ts</code>, mapping to real NPPA DPCO drug notifications (S.O. 1499(E)), CGHS Delhi tariffs, and MCD circulars.</li>
          <li><strong>Verification Gaps:</strong> Line items with incomplete dosage or composite kits are rigorously marked as <em>Insufficient Evidence</em>.</li>
        </ul>
      </div>

      {/* Pre-Deployment Production Requirements */}
      <div className="border border-stone-200 rounded-xl p-6 bg-stone-50 space-y-4">
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-stone-800" />
          <h2 className="text-base font-bold text-stone-900">
            What is Required Before Real-World Deployment
          </h2>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          Before taking SaveOnCare into clinical or commercial deployment beyond the B-Plan competition demo, the following milestones must be completed:
        </p>
        <ol className="text-xs text-stone-600 space-y-2 pl-4 list-decimal">
          <li>
            <strong className="text-stone-900">ABDM & DISHA Regulatory Compliance: </strong>
            Integration with Ayushman Bharat Digital Mission (ABDM) Health Information Exchange (HIE-CM) following DISHA (Digital Information Security in Healthcare Act) protocols.
          </li>
          <li>
            <strong className="text-stone-900">HIPAA-Grade On-Premise OCR: </strong>
            Replacing synthetic mock parsers with air-gapped, privacy-compliant OCR capable of parsing multi-column Indian hospital invoices with 99%+ accuracy.
          </li>
          <li>
            <strong className="text-stone-900">Live NPPA IPDMS API Synchronization: </strong>
            Automated synchronization with National Pharmaceutical Pricing Authority gazette notifications whenever price ceiling schedules update.
          </li>
          <li>
            <strong className="text-stone-900">Hospital Partnership MoUs: </strong>
            Collaborating with healthcare providers to provide pre-admission transparency estimates and digital TPA desk reconciliation channels.
          </li>
        </ol>
      </div>

    </div>
  );
};
