/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Patient Clarity Report View
 * Printable, executive-level billing clarity report with contextual
 * questions for the billing counter and verified statutory grievance resources.
 */

import React from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Scale, 
  Building2, 
  Calendar, 
  PhoneCall, 
  ExternalLink,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { BillDocument } from '../types/billing';
import { generateClarityReport } from '../services/reportGenerator';
import { OFFICIAL_GRIEVANCE_RESOURCES } from '../data/referenceDatabase';

interface ClarityReportViewProps {
  bill: BillDocument;
  onReturnToWorkspace: () => void;
}

export const ClarityReportView: React.FC<ClarityReportViewProps> = ({
  bill,
  onReturnToWorkspace
}) => {
  const report = generateClarityReport(bill);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ bill, report }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SaveOnCare_Audit_${bill.billNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const flaggedItems = bill.lineItems.filter(i => i.matchStatus === 'discrepancy');
  const unverifiedItems = bill.lineItems.filter(i => i.matchStatus === 'insufficient_evidence');
  const inRangeItems = bill.lineItems.filter(i => i.matchStatus === 'in_range');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-xl p-4 shadow-2xs">
        <button
          onClick={onReturnToWorkspace}
          className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500" />
          <span>Return to Bill Workspace</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadJson}
            className="text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export JSON Audit</span>
          </button>

          <button
            onClick={handlePrint}
            className="print-include text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 shadow-2xs space-y-8 print-full-width">
        
        {/* Document Header */}
        <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-stone-900">
                SaveOnCare
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                Patient Clarity Report
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Healthcare Billing Transparency Initiative · VoltEdge for Renaissance 10.0 (MNNIT Allahabad)
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-stone-500 font-mono space-y-0.5">
            <div>Report Ref: <strong className="text-stone-800">SOC-RPT-{bill.billNumber.replace(/[^A-Z0-9]/gi, '')}</strong></div>
            <div>Generated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            <div>Environment: Synthetic Evaluation Sandbox</div>
          </div>
        </div>

        {/* Patient & Institution Identification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
          <div>
            <span className="text-stone-500 block">Hospital Name</span>
            <strong className="text-stone-900 block text-sm font-semibold">{bill.hospitalName}</strong>
            <span className="text-stone-500">{bill.hospitalTier}</span>
          </div>

          <div>
            <span className="text-stone-500 block">Patient Record</span>
            <strong className="text-stone-900 block text-sm font-semibold">{bill.patientNameSynthetic}</strong>
            <span className="text-stone-500 font-mono">ID: {bill.patientSyntheticId}</span>
          </div>

          <div>
            <span className="text-stone-500 block">Stay Duration</span>
            <strong className="text-stone-900 block font-semibold">{bill.admissionDate} to {bill.dischargeDate}</strong>
            <span className="text-stone-500">Dept: {bill.department}</span>
          </div>

          <div>
            <span className="text-stone-500 block">Diagnosis Summary</span>
            <span className="text-stone-800 font-medium line-clamp-2" title={bill.diagnosisSummary}>
              {bill.diagnosisSummary}
            </span>
          </div>
        </div>

        {/* Executive Metrics Overview */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">
            1. Executive Billing Summary
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Total Billed Amount
              </span>
              <div className="text-2xl font-mono font-bold text-stone-900 mt-1">
                ₹{report.totalBilled.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Across {bill.lineItems.length} line items
              </span>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Comparable Charges
              </span>
              <div className="text-2xl font-mono font-bold text-stone-900 mt-1">
                ₹{report.comparableBilledTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Matched to public benchmarks
              </span>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Reference Benchmark
              </span>
              <div className="text-2xl font-mono font-bold text-stone-700 mt-1">
                ₹{report.referenceTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                NPPA, CGHS & MCD tariffs
              </span>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg">
              <span className="text-[11px] font-semibold text-amber-800 block uppercase">
                Potential Review Variance
              </span>
              <div className="text-2xl font-mono font-bold text-amber-900 mt-1">
                ₹{report.potentialDiscrepancyTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-amber-800 mt-1 block">
                {report.statusCounts.discrepancy} flagged items
              </span>
            </div>

          </div>

          {/* Strict Integrity Caveat */}
          <div className="p-3.5 bg-stone-100 border border-stone-200 rounded-md text-xs text-stone-700 flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Important Note on Review Differences: </strong>
              The potential review difference of ₹{report.potentialDiscrepancyTotal.toLocaleString('en-IN')} indicates line items that warrant billing desk clarification against official statutory caps or government rate schedules. It is <strong>NOT</strong> a confirmed refund or evidence of unlawful overcharging. Medical procedures involve clinical variances, brand differences, and non-negotiable emergency factors.
            </div>
          </div>
        </div>

        {/* Verification Status Breakdown */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">
            2. Line Item Verification Distribution
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="border border-stone-200 rounded-lg p-4 bg-white flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block text-sm">
                  {report.statusCounts.in_range} Items Within Reference Range
                </span>
                <p className="text-stone-600 mt-0.5 leading-relaxed">
                  These items conform to official statutory drug ceiling rates (NPPA), standard CGHS diagnostic tariffs, or public hospital schedules.
                </p>
              </div>
            </div>

            <div className="border border-stone-200 rounded-lg p-4 bg-white flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block text-sm">
                  {report.statusCounts.discrepancy} Items Requiring Review
                </span>
                <p className="text-stone-600 mt-0.5 leading-relaxed">
                  Billed unit rates for these items exceed verified benchmark schedules or statutory caps. Review with the hospital billing desk is suggested.
                </p>
              </div>
            </div>

            <div className="border border-stone-200 rounded-lg p-4 bg-white flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block text-sm">
                  {report.statusCounts.insufficient_evidence} Items Unverified
                </span>
                <p className="text-stone-600 mt-0.5 leading-relaxed">
                  Lump-sum packages, composite consumable kits, or hospital surcharges lacking itemized specifications for benchmark comparison.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Departmental & Category Breakdown */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">
            3. Departmental & Category Breakdown
          </h2>

          <div className="overflow-x-auto border border-stone-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">Billing Category</th>
                  <th className="py-2.5 px-3 text-right">Items</th>
                  <th className="py-2.5 px-3 text-right">Billed Total</th>
                  <th className="py-2.5 px-3 text-right">Benchmark Total</th>
                  <th className="py-2.5 px-3 text-right">Review Difference</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {report.categorySummaries.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="py-2.5 px-3 font-medium text-stone-900">
                      {cat.categoryLabel}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-stone-700">
                      {cat.itemCount}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">
                      ₹{cat.billedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-stone-700">
                      {cat.referenceTotal > 0
                        ? `₹${cat.referenceTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                        : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-stone-900">
                      {cat.potentialDiscrepancy > 0 ? (
                        <span className="text-amber-800 font-semibold">
                          +₹{cat.potentialDiscrepancy.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-stone-400">₹0.00</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {cat.discrepancyItemCount > 0 ? (
                        <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {cat.discrepancyItemCount} Flagged
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Clear / In Range
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flagged Items Detail (Discrepancies) */}
        {flaggedItems.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>4. Items Flagged for Billing Desk Clarification ({flaggedItems.length})</span>
            </h2>

            <div className="space-y-3">
              {flaggedItems.map((item) => (
                <div key={item.id} className="border border-stone-200 rounded-lg p-4 bg-white space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {item.description}
                      </h4>
                      <div className="text-xs text-stone-500 font-mono mt-0.5">
                        Code: {item.code} · Qty: {item.quantity} {item.unit}
                      </div>
                    </div>
                    <div className="text-left sm:text-right font-mono text-xs">
                      <div>Billed: <strong className="text-stone-900">₹{item.billedAmount.toLocaleString('en-IN')}</strong> (₹{item.billedUnitPrice}/{item.unit})</div>
                      <div className="text-stone-600">
                        Benchmark: ₹{item.referenceAmount?.toLocaleString('en-IN')} (₹{item.referenceItem?.referenceUnitPrice}/{item.unit})
                      </div>
                      <div className="text-amber-800 font-semibold">
                        Difference: +₹{item.differenceAmount?.toFixed(1)} (+{item.percentageVariance}%)
                      </div>
                    </div>
                  </div>

                  {item.referenceItem && (
                    <div className="text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded p-2.5">
                      <div>
                        <strong>Benchmark Reference: </strong>
                        {item.referenceItem.standardName} ({item.referenceItem.sourceName})
                      </div>
                      {item.referenceItem.officialRefNumber && (
                        <div className="text-stone-500 font-mono text-[11px] mt-0.5">
                          Notification: {item.referenceItem.officialRefNumber}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-stone-700 bg-amber-50/40 border border-amber-100 rounded p-2.5 leading-relaxed">
                    <strong>Review Rationale: </strong>
                    {item.discrepancyRationale}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unverified Items (Insufficient Evidence) */}
        {unverifiedItems.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-stone-500" />
              <span>5. Items Awaiting Specification ({unverifiedItems.length})</span>
            </h2>

            <div className="border border-stone-200 rounded-lg divide-y divide-stone-100 bg-white">
              {unverifiedItems.map((item) => (
                <div key={item.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <strong className="text-stone-900">{item.description}</strong>
                    <p className="text-stone-500 text-[11px] mt-0.5">
                      Composite bundle or non-itemized fee. Billed amount: ₹{item.billedAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-xs text-stone-600 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded shrink-0">
                    Action: Request Itemized Consumables Annexure
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actionable Questions for the Hospital Billing Desk */}
        <div className="space-y-4 pt-4 border-t border-stone-200 print-page-break">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <div>
              <h2 className="text-base font-bold text-stone-900">
                6. Suggested Inquiries for the Hospital Billing Counter
              </h2>
              <p className="text-xs text-stone-500">
                Polite, precise, and fact-grounded questions you can present to hospital staff to seek clarification.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {report.highPriorityQuestions.map((q, idx) => (
              <div key={q.id} className="border border-stone-200 rounded-lg p-4 bg-stone-50/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">
                    Topic 0{idx + 1}: {q.topic}
                  </span>
                  <span className="text-orange-700 font-semibold bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px]">
                    Recommended Desk: {q.hospitalDeskContact}
                  </span>
                </div>

                <div className="bg-white border border-stone-200 rounded-md p-3 text-xs text-stone-800 italic leading-relaxed">
                  {q.suggestedQuestion}
                </div>

                <div className="text-[11px] text-stone-500">
                  <strong>Why ask this: </strong>{q.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Grievance & Escalation Resources */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-stone-700" />
            <div>
              <h2 className="text-base font-bold text-stone-900">
                7. Official Grievance & Redressal Directories
              </h2>
              <p className="text-xs text-stone-500">
                If informal hospital discussion does not resolve statutory discrepancies, you may escalate to official government regulatory channels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_GRIEVANCE_RESOURCES.map((res) => (
              <div key={res.id} className="border border-stone-200 rounded-lg p-4 bg-white space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-stone-900 text-sm font-bold">{res.agency}</strong>
                  <span className="text-[10px] uppercase font-semibold text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                    {res.badge}
                  </span>
                </div>

                <p className="text-stone-600 leading-relaxed">
                  {res.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-stone-800">
                    Helpline: {res.helpline}
                  </span>
                  <a
                    href={res.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-700 hover:text-orange-800 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Escalation Protocol */}
          <div className="bg-stone-100/70 border border-stone-200 rounded-lg p-4 text-xs text-stone-700 space-y-1.5">
            <strong className="text-stone-900 block">Recommended Escalation Path:</strong>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li><strong>Step 1 (First line):</strong> Present this report to the Hospital Inpatient Billing or TPA desk for amicable line-item reconciliation.</li>
              <li><strong>Step 2 (Institutional escalation):</strong> If unsatisfied, submit a written query to the Hospital Medical Superintendent (MS) or Patient Relations Officer.</li>
              <li><strong>Step 3 (Regulatory recourse):</strong> For statutory drug price overcharging, file a complaint on the NPPA IPDMS portal; for general deficiency of billing service, dial the National Consumer Helpline at <strong>1915</strong>.</li>
            </ol>
          </div>
        </div>

        {/* Report Footer & Attributions */}
        <div className="pt-6 border-t border-stone-200 text-center text-xs text-stone-400 space-y-1">
          <p>
            SaveOnCare · Built by Team VoltEdge for Renaissance 10.0 B-Plan competition at Motilal Nehru National Institute of Technology (MNNIT) Allahabad.
          </p>
          <p className="text-[11px]">
            This clarity report is an educational demonstration generated from synthetic patient and institutional billing data. It does not constitute legal or medical counsel.
          </p>
        </div>

      </div>

    </div>
  );
};
