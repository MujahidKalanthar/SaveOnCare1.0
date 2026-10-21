/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Bill Analysis Workspace
 * High-density structured medical bill inspector with deterministic comparisons,
 * live inline edits, and verified public reference benchmarks.
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Plus, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Building2, 
  Calendar, 
  User, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';
import { BillDocument, LineItem, ComparisonStatus, ItemCategory } from '../types/billing';
import { ItemInspectionModal } from './ItemInspectionModal';
import { AddCustomItemModal } from './AddCustomItemModal';

interface WorkspaceProps {
  currentBill: BillDocument;
  sampleBills: BillDocument[];
  onSelectSampleBill: (bill: BillDocument) => void;
  onUpdateBill: (updatedBill: BillDocument) => void;
  onResetBill: () => void;
  onNavigateToReport: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  currentBill,
  sampleBills,
  onSelectSampleBill,
  onUpdateBill,
  onResetBill,
  onNavigateToReport
}) => {
  const [selectedItem, setSelectedItem] = useState<LineItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ComparisonStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ItemCategory>('all');

  // Summary figures
  const summary = useMemo(() => {
    let totalBilled = 0;
    let comparableBilled = 0;
    let referenceTotal = 0;
    let discrepancyTotal = 0;
    let inRangeCount = 0;
    let discrepancyCount = 0;
    let unverifiedCount = 0;

    for (const item of currentBill.lineItems) {
      totalBilled += item.billedAmount;
      if (item.matchStatus === 'in_range') inRangeCount++;
      if (item.matchStatus === 'discrepancy') discrepancyCount++;
      if (item.matchStatus === 'insufficient_evidence') unverifiedCount++;

      if (item.referenceAmount !== undefined && item.matchStatus !== 'insufficient_evidence') {
        comparableBilled += item.billedAmount;
        referenceTotal += item.referenceAmount;
        if (item.matchStatus === 'discrepancy' && item.differenceAmount && item.differenceAmount > 0) {
          discrepancyTotal += item.differenceAmount;
        }
      }
    }

    return {
      totalBilled: Math.round(totalBilled * 100) / 100,
      comparableBilled: Math.round(comparableBilled * 100) / 100,
      referenceTotal: Math.round(referenceTotal * 100) / 100,
      discrepancyTotal: Math.round(discrepancyTotal * 100) / 100,
      inRangeCount,
      discrepancyCount,
      unverifiedCount
    };
  }, [currentBill.lineItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return currentBill.lineItems.filter((item) => {
      // Status filter
      if (statusFilter !== 'all' && item.matchStatus !== statusFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inDesc = item.description.toLowerCase().includes(q);
        const inCode = item.code.toLowerCase().includes(q);
        const inCat = item.category.toLowerCase().includes(q);
        const inSource = item.referenceItem?.sourceName.toLowerCase().includes(q);
        if (!inDesc && !inCode && !inCat && !inSource) return false;
      }

      return true;
    });
  }, [currentBill.lineItems, statusFilter, categoryFilter, searchQuery]);

  // Handle item update
  const handleItemUpdate = (updatedItem: LineItem) => {
    const updatedItems = currentBill.lineItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    const newTotal = updatedItems.reduce((acc, curr) => acc + curr.billedAmount, 0);

    onUpdateBill({
      ...currentBill,
      lineItems: updatedItems,
      totalBilled: Math.round(newTotal * 100) / 100
    });
    setSelectedItem(updatedItem);
  };

  // Handle adding custom item
  const handleAddItem = (newItem: LineItem) => {
    const updatedItems = [newItem, ...currentBill.lineItems];
    const newTotal = updatedItems.reduce((acc, curr) => acc + curr.billedAmount, 0);

    onUpdateBill({
      ...currentBill,
      lineItems: updatedItems,
      totalBilled: Math.round(newTotal * 100) / 100
    });
  };

  // Status badge renderer
  const renderStatus = (status: ComparisonStatus) => {
    switch (status) {
      case 'in_range':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>In Range</span>
          </span>
        );
      case 'discrepancy':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Review Req.</span>
          </span>
        );
      case 'insufficient_evidence':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded">
            <HelpCircle className="w-3 h-3 text-stone-500 shrink-0" />
            <span>Unverified</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner: Active Bill Information & Switcher */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 md:p-6 shadow-2xs space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
              <span>{currentBill.billNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-orange-700 font-semibold">{currentBill.hospitalTier}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              {currentBill.hospitalName}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {currentBill.hospitalLocation} · Department: {currentBill.department}
            </p>
          </div>

          {/* Sample Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <select
                aria-label="Switch Sample Bill"
                value={currentBill.id}
                onChange={(e) => {
                  const found = sampleBills.find(b => b.id === e.target.value);
                  if (found) onSelectSampleBill(found);
                }}
                className="text-xs font-semibold bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-hidden cursor-pointer"
              >
                {sampleBills.map(b => (
                  <option key={b.id} value={b.id}>
                    Sample: {b.hospitalName.slice(0, 28)}...
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={onResetBill}
              title="Reset current bill to default sample values"
              className="text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-300 hover:bg-stone-50 px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-orange-600" />
              <span>Add Custom Item</span>
            </button>

            <button
              onClick={onNavigateToReport}
              className="text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Generate Clarity Report</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Clinical context & Synthetic notice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <div>
            <span className="font-semibold text-stone-800 block">Synthetic Patient:</span>
            <span>{currentBill.patientNameSynthetic} ({currentBill.patientSyntheticId})</span>
          </div>
          <div>
            <span className="font-semibold text-stone-800 block">Admission Period:</span>
            <span>{currentBill.admissionDate} to {currentBill.dischargeDate}</span>
          </div>
          <div>
            <span className="font-semibold text-stone-800 block">Diagnosis / Clinical Summary:</span>
            <span className="truncate block" title={currentBill.diagnosisSummary}>{currentBill.diagnosisSummary}</span>
          </div>
        </div>

      </div>

      {/* Structured Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
            Total Billed Charge
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-900">
            ₹{summary.totalBilled.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-stone-500 block">
            {currentBill.lineItems.length} total invoice line items
          </span>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
            Comparable Items Billed
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-900">
            ₹{summary.comparableBilled.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-stone-500 block">
            Items with verified benchmark matches
          </span>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
            Reference Benchmark Total
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-stone-700">
            ₹{summary.referenceTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-stone-500 block">
            Based on NPPA, CGHS & MCD rates
          </span>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
            Potential Review Difference
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-amber-800">
            ₹{summary.discrepancyTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-stone-500 block leading-tight">
            Potential difference for review · Not guaranteed refund
          </span>
        </div>

      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
        
        {/* Filter Toolbar */}
        <div className="p-4 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-stone-50/50">
          
          {/* Segmented status filter buttons (Zero-pill discipline: clean unboxed tabs) */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg text-xs font-medium self-start overflow-x-auto max-w-full">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Items ({currentBill.lineItems.length})
            </button>
            <button
              onClick={() => setStatusFilter('discrepancy')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'discrepancy'
                  ? 'bg-white text-amber-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Review Required ({summary.discrepancyCount})
            </button>
            <button
              onClick={() => setStatusFilter('in_range')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'in_range'
                  ? 'bg-white text-emerald-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              In Range ({summary.inRangeCount})
            </button>
            <button
              onClick={() => setStatusFilter('insufficient_evidence')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'insufficient_evidence'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Unverified ({summary.unverifiedCount})
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search items, medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-white border border-stone-300 rounded-lg pl-8 pr-3 py-1.5 focus:border-orange-500 focus:outline-hidden"
              />
            </div>

            <select
              aria-label="Filter by Medical Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 focus:border-orange-500 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="diagnostics">Diagnostics</option>
              <option value="room_nursing">Room & Nursing</option>
              <option value="consumables">Consumables</option>
              <option value="surgical_procedure">Procedures</option>
              <option value="administrative">Admin / Misc</option>
            </select>
          </div>

        </div>

        {/* High Density Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-800">
            <thead className="bg-stone-100 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Line Item Description</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Qty</th>
                <th className="py-3 px-3 text-right">Billed Rate</th>
                <th className="py-3 px-3 text-right">Billed Total</th>
                <th className="py-3 px-4">Reference Benchmark</th>
                <th className="py-3 px-3 text-right">Ref. Total</th>
                <th className="py-3 px-3 text-right">Variance</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-stone-500">
                    <p className="text-sm font-medium">No line items match the selected filter criteria.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                        setCategoryFilter('all');
                      }}
                      className="mt-2 text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-stone-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Item Description */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-medium text-stone-900 group-hover:text-orange-700 transition-colors">
                        {item.description}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2 mt-0.5">
                        <span>{item.code}</span>
                        {item.userEdited && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-orange-600">Edited</span>
                          </>
                        )}
                        {item.patientNotes && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-stone-600 truncate max-w-xs" title={item.patientNotes}>
                              Note: {item.patientNotes}
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 text-stone-600 capitalize">
                      {item.category.replace('_', ' ')}
                    </td>

                    {/* Quantity */}
                    <td className="py-3 px-3 text-right font-mono text-stone-900 whitespace-nowrap">
                      {item.quantity} <span className="text-stone-500 text-[11px]">{item.unit}</span>
                    </td>

                    {/* Billed Unit Rate */}
                    <td className="py-3 px-3 text-right font-mono text-stone-900 whitespace-nowrap">
                      ₹{item.billedUnitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Billed Total Amount */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-stone-900 whitespace-nowrap">
                      ₹{item.billedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Reference Benchmark & Source */}
                    <td className="py-3 px-4 max-w-sm">
                      {item.referenceItem ? (
                        <div>
                          <span className="font-medium text-stone-900 block truncate" title={item.referenceItem.standardName}>
                            {item.referenceItem.standardName}
                          </span>
                          <span className="text-[11px] text-stone-500 block truncate" title={item.referenceItem.sourceName}>
                            {item.referenceItem.sourceName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">
                          Insufficient unbundled specification
                        </span>
                      )}
                    </td>

                    {/* Reference Total */}
                    <td className="py-3 px-3 text-right font-mono text-stone-700 whitespace-nowrap">
                      {item.referenceAmount !== undefined
                        ? `₹${item.referenceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                        : '—'}
                    </td>

                    {/* Variance Amount & % */}
                    <td className="py-3 px-3 text-right font-mono whitespace-nowrap">
                      {item.differenceAmount !== undefined && item.percentageVariance !== undefined ? (
                        <div className={item.matchStatus === 'discrepancy' ? 'text-amber-800 font-semibold' : 'text-stone-600'}>
                          <span>{item.differenceAmount > 0 ? '+' : ''}₹{item.differenceAmount.toFixed(1)}</span>
                          <span className="text-[10px] block opacity-80">
                            ({item.percentageVariance > 0 ? '+' : ''}{item.percentageVariance}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {renderStatus(item.matchStatus)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline px-2 py-1 rounded cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info in workspace */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
          <div>
            Showing {filteredItems.length} of {currentBill.lineItems.length} entries · Click any row to inspect benchmark evidence or edit numbers
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span>In Range</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
              <span>Review Req.</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-stone-400 inline-block"></span>
              <span>Unverified</span>
            </span>
          </div>
        </div>

      </div>

      {/* Item Inspection Modal */}
      <ItemInspectionModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdateItem={handleItemUpdate}
      />

      {/* Add Custom Item Modal */}
      <AddCustomItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddItem={handleAddItem}
      />

    </div>
  );
};
