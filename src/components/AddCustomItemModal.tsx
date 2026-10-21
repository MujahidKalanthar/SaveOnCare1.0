/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Add Custom Line Item Modal
 * Allows testing arbitrary medical bill entries against the comparison engine.
 */

import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { ItemCategory, LineItem } from '../types/billing';
import { evaluateLineItem } from '../services/comparisonEngine';

interface AddCustomItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: LineItem) => void;
}

export const AddCustomItemModal: React.FC<AddCustomItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem
}) => {
  if (!isOpen) return null;

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>('pharmacy');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('vial');
  const [unitPrice, setUnitPrice] = useState('250');

  const presetExamples = [
    { name: 'Ceftriaxone Injection 1g', cat: 'pharmacy' as ItemCategory, unit: 'vial', price: '280' },
    { name: 'Dengue NS1 Antigen ELISA Test', cat: 'diagnostics' as ItemCategory, unit: 'test', price: '1200' },
    { name: 'Sterile Surgical Latex Gloves Pair', cat: 'consumables' as ItemCategory, unit: 'pair', price: '95' },
    { name: 'Normal Saline 0.9% 500ml IV', cat: 'pharmacy' as ItemCategory, unit: 'pack', price: '45' },
    { name: 'General Ward Inpatient Bed', cat: 'room_nursing' as ItemCategory, unit: 'day', price: '700' },
    { name: 'Unbundled Surgical Sundry & Consumables Pack', cat: 'consumables' as ItemCategory, unit: 'kit', price: '3500' }
  ];

  const handleApplyPreset = (p: typeof presetExamples[0]) => {
    setDescription(p.name);
    setCategory(p.cat);
    setUnit(p.unit);
    setUnitPrice(p.price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const evaluated = evaluateLineItem({
      description: description.trim(),
      category,
      quantity: parseFloat(quantity) || 1,
      unit: unit.trim() || 'unit',
      billedUnitPrice: parseFloat(unitPrice) || 0
    });

    onAddItem(evaluated);
    onClose();
    // reset form
    setDescription('');
    setUnitPrice('100');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-stone-200 max-w-lg w-full overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-stone-900 text-base">
              Add Item to Bill
            </h3>
            <p className="text-xs text-stone-500">
              Test how custom items are matched against verified reference caps
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="px-5 pt-4 pb-2 bg-stone-50/70 border-b border-stone-200">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
            Quick Test Examples (Click to Fill)
          </span>
          <div className="flex flex-wrap gap-1.5 pb-2">
            {presetExamples.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-xs bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded px-2.5 py-1 transition-colors cursor-pointer"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Item Description
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Ceftriaxone 1g Injection Vial"
              className="w-full text-xs text-stone-900 bg-white border border-stone-300 rounded-md p-2.5 focus:border-orange-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full text-xs text-stone-900 bg-white border border-stone-300 rounded-md p-2.5 focus:border-orange-500 focus:outline-hidden"
              >
                <option value="pharmacy">Pharmacy / Medicine</option>
                <option value="diagnostics">Diagnostics / Lab</option>
                <option value="room_nursing">Room & Nursing</option>
                <option value="consumables">Consumables / Disposables</option>
                <option value="surgical_procedure">Surgical Procedure</option>
                <option value="administrative">Administrative Fee</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Unit of Measure
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="vial, test, day, pair..."
                className="w-full text-xs text-stone-900 bg-white border border-stone-300 rounded-md p-2.5 focus:border-orange-500 focus:outline-hidden"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                step="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full text-xs font-mono font-medium text-stone-900 bg-white border border-stone-300 rounded-md p-2.5 focus:border-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Billed Unit Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                className="w-full text-xs font-mono font-medium text-stone-900 bg-white border border-stone-300 rounded-md p-2.5 focus:border-orange-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Evaluate & Add Item</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
