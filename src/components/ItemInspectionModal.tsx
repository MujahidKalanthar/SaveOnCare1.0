/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Item Inspection Modal
 * Deep-dive inspection of a billed item, matched reference benchmark,
 * source citations, calculation audits, and patient note editing.
 */

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Info, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Edit2,
  Check
} from 'lucide-react';
import { LineItem } from '../types/billing';

interface ItemInspectionModalProps {
  item: LineItem | null;
  onClose: () => void;
  onUpdateItem: (updated: LineItem) => void;
}

export const ItemInspectionModal: React.FC<ItemInspectionModalProps> = ({
  item,
  onClose,
  onUpdateItem
}) => {
  if (!item) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editQty, setEditQty] = useState(item.quantity.toString());
  const [editRate, setEditRate] = useState(item.billedUnitPrice.toString());
  const [patientNotes, setPatientNotes] = useState(item.patientNotes || '');

  const handleSaveEdit = () => {
    const qty = parseFloat(editQty) || item.quantity;
    const rate = parseFloat(editRate) || item.billedUnitPrice;
    const billedAmount = Math.round(qty * rate * 100) / 100;

    let differenceAmount = item.differenceAmount;
    let percentageVariance = item.percentageVariance;
    let referenceAmount = item.referenceAmount;

    if (item.referenceItem) {
      referenceAmount = Math.round(qty * item.referenceItem.referenceUnitPrice * 100) / 100;
      differenceAmount = Math.round((billedAmount - referenceAmount) * 100) / 100;
      percentageVariance = Math.round(((billedAmount - referenceAmount) / referenceAmount) * 1000) / 10;
    }

    const updated: LineItem = {
      ...item,
      quantity: qty,
      billedUnitPrice: rate,
      billedAmount,
      referenceAmount,
      differenceAmount,
      percentageVariance,
      patientNotes,
      userEdited: true,
      matchStatus: item.referenceItem 
        ? (percentageVariance && percentageVariance > 5 ? 'discrepancy' : 'in_range')
        : 'insufficient_evidence'
    };

    onUpdateItem(updated);
    setIsEditing(false);
  };

  const statusBadge = () => {
    switch (item.matchStatus) {
      case 'in_range':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Within reference range</span>
          </div>
        );
      case 'discrepancy':
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Potential discrepancy — review required</span>
          </div>
        );
      case 'insufficient_evidence':
      default:
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 bg-stone-100 border border-stone-200 px-3 py-1 rounded-md">
            <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
            <span>Insufficient evidence to compare</span>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <span>{item.code}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{item.category.replace('_', ' ')}</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 leading-snug">
              {item.description}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-stone-50 rounded-lg border border-stone-200">
            <div>
              <span className="text-xs text-stone-500 block mb-1">Comparison Assessment</span>
              {statusBadge()}
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs text-stone-500 block">Total Billed for Item</span>
              <span className="text-xl font-mono font-bold text-stone-900">
                ₹{item.billedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Pricing & Math Audit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Billing Mathematics Audit
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Line Numbers</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 px-2 py-0.5 rounded cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-stone-50 border border-stone-200 rounded-md p-3">
                <span className="text-[11px] text-stone-500 block">Quantity</span>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={editQty}
                    onChange={(e) => setEditQty(e.target.value)}
                    className="w-full text-sm font-mono font-bold bg-white border border-stone-300 rounded px-1.5 py-0.5 mt-1"
                  />
                ) : (
                  <span className="text-sm font-mono font-bold text-stone-900">
                    {item.quantity} {item.unit}
                  </span>
                )}
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-md p-3">
                <span className="text-[11px] text-stone-500 block">Billed Unit Rate</span>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editRate}
                    onChange={(e) => setEditRate(e.target.value)}
                    className="w-full text-sm font-mono font-bold bg-white border border-stone-300 rounded px-1.5 py-0.5 mt-1"
                  />
                ) : (
                  <span className="text-sm font-mono font-bold text-stone-900">
                    ₹{item.billedUnitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-md p-3">
                <span className="text-[11px] text-stone-500 block">Reference Unit Rate</span>
                <span className="text-sm font-mono font-bold text-stone-900">
                  {item.referenceItem 
                    ? `₹${item.referenceItem.referenceUnitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` 
                    : 'N/A'}
                </span>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-md p-3">
                <span className="text-[11px] text-stone-500 block">Calculated Variance</span>
                <span className={`text-sm font-mono font-bold ${
                  item.matchStatus === 'discrepancy' ? 'text-amber-700' : 'text-stone-900'
                }`}>
                  {item.percentageVariance !== undefined
                    ? `${item.percentageVariance > 0 ? '+' : ''}${item.percentageVariance}%`
                    : 'Unmeasured'}
                </span>
              </div>
            </div>
          </div>

          {/* Reference Source Details */}
          {item.referenceItem ? (
            <div className="border border-stone-200 rounded-lg p-4 space-y-3 bg-stone-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Verified Reference Source
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {item.referenceItem.sourceDate}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-stone-900">
                  {item.referenceItem.standardName}
                </h4>
                <p className="text-xs text-stone-600">
                  Authority: <strong className="text-stone-800">{item.referenceItem.sourceName}</strong>
                </p>
                {item.referenceItem.officialRefNumber && (
                  <p className="text-xs font-mono text-stone-500">
                    Circular / Notification Ref: {item.referenceItem.officialRefNumber}
                  </p>
                )}
              </div>

              <div className="text-xs text-stone-600 bg-white border border-stone-200 rounded p-2.5 leading-relaxed">
                <strong className="text-stone-800">Applicable Conditions: </strong>
                {item.referenceItem.conditions}
              </div>

              {item.referenceItem.verifiedPortalUrl && (
                <div className="pt-1">
                  <a
                    href={item.referenceItem.verifiedPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1.5"
                  >
                    <span>Visit Authority Web Portal ({item.referenceItem.sourceName.split(' ')[0]})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-stone-200 rounded-lg p-4 space-y-2 bg-stone-50">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Why is this item marked as Insufficient Evidence?
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hospital discharge bills frequently contain lump-sum non-itemized bundles, unlisted brand consumables, or administrative charges without sub-item breakdowns. Because no verified statutory cap or government tariff matches this composite entry, SaveOnCare does not guess a benchmark.
              </p>
              <p className="text-xs text-stone-700 font-medium">
                Recommendation: Ask the hospital billing counter for an itemized breakdown of consumables and manufacturer MRP lists.
              </p>
            </div>
          )}

          {/* Plain Language Rationale */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Plain Language Explanation
            </span>
            <div className="text-xs text-stone-700 bg-white border border-stone-200 rounded-md p-3 leading-relaxed">
              {item.discrepancyRationale}
            </div>
          </div>

          {/* Patient Personal Notes */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Patient Review Notes
            </span>
            <textarea
              rows={2}
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              placeholder="Add your personal notes, receipt numbers, or responses from the hospital desk..."
              className="w-full text-xs text-stone-800 bg-white border border-stone-300 rounded-md p-2.5 focus:border-orange-500 focus:outline-hidden"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            {item.userEdited && 'Edited in current session'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleSaveEdit();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors cursor-pointer"
            >
              Confirm & Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
