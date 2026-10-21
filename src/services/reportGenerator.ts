/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Patient Clarity Report Generator
 * 
 * Generates transparent billing summaries, departmental breakdowns,
 * contextual questions for the hospital billing desk, and verified
 * grievance resources for patient empowerment.
 */

import { BillDocument, ClarityReportSummary, CategorySummary, QuestionGuideItem, ItemCategory } from '../types/billing';

const CATEGORY_LABELS: Record<ItemCategory, string> = {
  pharmacy: 'Pharmacy & IV Therapeutics',
  diagnostics: 'Diagnostics & Laboratory Pathology',
  room_nursing: 'Room, Bed & Inpatient Nursing',
  consumables: 'Surgical Consumables & Disposables',
  surgical_procedure: 'Surgical & Clinical Procedures',
  administrative: 'Administrative & Facility Surcharges'
};

export function generateClarityReport(bill: BillDocument): ClarityReportSummary {
  const items = bill.lineItems;

  let totalBilled = 0;
  let comparableBilledTotal = 0;
  let referenceTotal = 0;
  let potentialDiscrepancyTotal = 0;

  const statusCounts = {
    in_range: 0,
    discrepancy: 0,
    insufficient_evidence: 0
  };

  const categoryMap = new Map<ItemCategory, {
    category: ItemCategory;
    categoryLabel: string;
    itemCount: number;
    billedTotal: number;
    referenceTotal: number;
    potentialDiscrepancy: number;
    discrepancyItemCount: number;
  }>();

  // Initialize all categories
  for (const key of Object.keys(CATEGORY_LABELS) as ItemCategory[]) {
    categoryMap.set(key, {
      category: key,
      categoryLabel: CATEGORY_LABELS[key],
      itemCount: 0,
      billedTotal: 0,
      referenceTotal: 0,
      potentialDiscrepancy: 0,
      discrepancyItemCount: 0
    });
  }

  for (const item of items) {
    totalBilled += item.billedAmount;
    statusCounts[item.matchStatus]++;

    const catData = categoryMap.get(item.category) || {
      category: item.category,
      categoryLabel: CATEGORY_LABELS[item.category] || item.category,
      itemCount: 0,
      billedTotal: 0,
      referenceTotal: 0,
      potentialDiscrepancy: 0,
      discrepancyItemCount: 0
    };

    catData.itemCount++;
    catData.billedTotal += item.billedAmount;

    if (item.matchStatus !== 'insufficient_evidence' && item.referenceAmount !== undefined) {
      comparableBilledTotal += item.billedAmount;
      referenceTotal += item.referenceAmount;
      catData.referenceTotal += item.referenceAmount;

      if (item.matchStatus === 'discrepancy' && item.differenceAmount && item.differenceAmount > 0) {
        potentialDiscrepancyTotal += item.differenceAmount;
        catData.potentialDiscrepancy += item.differenceAmount;
        catData.discrepancyItemCount++;
      }
    }

    categoryMap.set(item.category, catData);
  }

  const categorySummaries: CategorySummary[] = Array.from(categoryMap.values())
    .filter(cat => cat.itemCount > 0)
    .sort((a, b) => b.billedTotal - a.billedTotal);

  // Generate tailored questions for the hospital billing desk based on actual findings
  const highPriorityQuestions: QuestionGuideItem[] = [];

  // 1. Check for statutory drug ceiling discrepancies (NPPA)
  const drugDiscrepancies = items.filter(
    i => i.category === 'pharmacy' && i.matchStatus === 'discrepancy' && i.referenceItem?.benchmarkType === 'statutory_ceiling'
  );

  if (drugDiscrepancies.length > 0) {
    const names = drugDiscrepancies.map(d => d.description).slice(0, 2).join(' & ');
    highPriorityQuestions.push({
      id: 'q-nppa-drugs',
      topic: 'Statutory DPCO Medicine Price Caps (NPPA Compliance)',
      targetItems: drugDiscrepancies.map(d => d.description),
      suggestedQuestion: `“For the billed medicines including ${names}, the unit prices charged on this bill appear higher than the statutory ceiling prices notified by the National Pharmaceutical Pricing Authority (NPPA DPCO). Could you kindly review these line items against the notified maximum retail price ceilings?”`,
      rationale: 'Under DPCO 2013, scheduled formulations cannot be billed to patients above the notified ceiling price plus actual GST paid.',
      hospitalDeskContact: 'Hospital Pharmacy Billing & Inpatient Billing Desk'
    });
  }

  // 2. Check for Delhi statutory diagnostic caps (e.g. Dengue NS1)
  const dengueDiscrepancy = items.find(
    i => clean(i.description).includes('dengue') && i.matchStatus === 'discrepancy'
  );

  if (dengueDiscrepancy) {
    highPriorityQuestions.push({
      id: 'q-dengue-cap',
      topic: 'Delhi Govt Statutory Cap on Dengue Testing',
      targetItems: [dengueDiscrepancy.description],
      suggestedQuestion: `“The bill lists Dengue NS1 testing at ₹${dengueDiscrepancy.billedUnitPrice}. The Directorate General of Health Services (DGHS) of Delhi has capped Dengue NS1 / ELISA testing at ₹600 in all NCT private health facilities. Could this test be re-assessed in line with current Delhi state healthcare advisories?”`,
      rationale: 'Delhi Health Department has statutory advisories capping dengue tests to prevent exploitation during seasonal surges.',
      hospitalDeskContact: 'Hospital Billing Manager / Medical Superintendent Office'
    });
  }

  // 3. Check for composite / unbundled kits (Insufficient Evidence)
  const compositeItems = items.filter(i => i.matchStatus === 'insufficient_evidence');
  if (compositeItems.length > 0) {
    const kitNames = compositeItems.map(c => c.description).slice(0, 2).join(' / ');
    highPriorityQuestions.push({
      id: 'q-unbundled-kits',
      topic: 'Itemized Breakdown for Composite Kits & Surcharges',
      targetItems: compositeItems.map(c => c.description),
      suggestedQuestion: `“Line items such as ‘${kitNames}’ are billed as lump-sum packages. Could we receive an itemized Annexure detailing the individual consumables, manufacturer batch numbers, unit MRPs, and exact quantities used during the stay?”`,
      rationale: 'Patients are entitled to itemized disclosure of non-pharmacological consumables to verify that items were actually dispensed and not double-counted.',
      hospitalDeskContact: 'Inpatient Discharge Billing Desk'
    });
  }

  // 4. Room & Nursing rate inclusion inquiry
  const roomItems = items.filter(i => i.category === 'room_nursing' && i.matchStatus === 'discrepancy');
  if (roomItems.length > 0) {
    highPriorityQuestions.push({
      id: 'q-room-inclusions',
      topic: 'Room Accommodation & Routine Nursing Inclusions',
      targetItems: roomItems.map(r => r.description),
      suggestedQuestion: `“Could you clarify the component breakdown for room/bed charges? We want to confirm whether routine nursing care, doctor visits, and standard monitoring are included in the daily bed charge or billed separately.”`,
      rationale: 'Prevents duplicate billing of routine nursing when room rent already incorporates basic nursing services according to standard hospital tariff guidelines.',
      hospitalDeskContact: 'TPA / Inpatient Billing Counter'
    });
  }

  // 5. Generic / Jan Aushadhi substitution question
  highPriorityQuestions.push({
    id: 'q-generic-options',
    topic: 'Generic Formulation & Jan Aushadhi Availability',
    targetItems: ['Discharge Medication & Ongoing Prescriptions'],
    suggestedQuestion: `“For discharge medications and subsequent outpatient treatment, could the physician or hospital pharmacy advise if equivalent generic formulations or Pradhan Mantri Jan Aushadhi equivalents can be prescribed?”`,
    rationale: 'Post-discharge medications often represent substantial ongoing expenses; Jan Aushadhi generic equivalents frequently save 50% to 90%.',
    hospitalDeskContact: 'Treating Physician / Outpatient Pharmacy Counter'
  });

  return {
    totalBilled: Math.round(totalBilled * 100) / 100,
    comparableBilledTotal: Math.round(comparableBilledTotal * 100) / 100,
    referenceTotal: Math.round(referenceTotal * 100) / 100,
    potentialDiscrepancyTotal: Math.round(potentialDiscrepancyTotal * 100) / 100,
    statusCounts,
    categorySummaries,
    highPriorityQuestions
  };
}

function clean(str: string): string {
  return str.toLowerCase().replace(/[^\w\s]/g, ' ');
}
