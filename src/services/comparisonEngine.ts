/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Transparent Comparison Engine
 * 
 * Deterministic comparison logic aligning billed hospital line items
 * against verified public reference prices (NPPA, CGHS, MCD).
 * Adheres strictly to non-accusatory terminology:
 * - 'Within reference range'
 * - 'Potential discrepancy — review required'
 * - 'Insufficient evidence to compare'
 */

import { REFERENCE_BENCHMARKS } from '../data/referenceDatabase';
import { LineItem, ReferenceBenchmark, ComparisonStatus } from '../types/billing';

/**
 * Normalizes text for robust deterministic token matching
 */
function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Finds the best reference benchmark matching a line item
 */
export function matchLineItemToReference(
  item: { description: string; category?: string; code?: string }
): { match: ReferenceBenchmark | null; confidence: number; notes: string } {
  const desc = cleanText(item.description);

  // Unbundled or non-itemized composite items should deliberately result in insufficient evidence
  const compositeKeywords = [
    'sundry',
    'miscellaneous',
    'consumables pack',
    'kit',
    'composite',
    'overhead',
    'admin fee',
    'rmo round',
    'bio medical waste',
    'sanitization fee'
  ];

  for (const kw of compositeKeywords) {
    if (desc.includes(kw)) {
      return {
        match: null,
        confidence: 0.15,
        notes: `Item contains composite or unbundled package descriptor ("${kw}"). Specific itemized bill requested from hospital.`
      };
    }
  }

  // Exact or high-confidence keyword matchers
  const rules: {
    keywords: string[];
    benchmarkId: string;
    confidence: number;
    matchNote: string;
  }[] = [
    {
      keywords: ['ceftriaxone', '1g'],
      benchmarkId: 'REF-PHARM-001',
      confidence: 0.95,
      matchNote: 'Matched active molecule Ceftriaxone 1g sterile vial.'
    },
    {
      keywords: ['paracetamol', 'infusion'],
      benchmarkId: 'REF-PHARM-002',
      confidence: 0.94,
      matchNote: 'Matched Paracetamol 100ml IV infusion formulation.'
    },
    {
      keywords: ['paracetamol', 'iv'],
      benchmarkId: 'REF-PHARM-002',
      confidence: 0.92,
      matchNote: 'Matched Paracetamol 100ml IV infusion.'
    },
    {
      keywords: ['normal saline', '500'],
      benchmarkId: 'REF-PHARM-003',
      confidence: 0.96,
      matchNote: 'Matched Sodium Chloride 0.9% 500ml IV fluid.'
    },
    {
      keywords: ['ns', '0 9', '500'],
      benchmarkId: 'REF-PHARM-003',
      confidence: 0.90,
      matchNote: 'Matched Normal Saline 500ml container.'
    },
    {
      keywords: ['pantoprazole', '40'],
      benchmarkId: 'REF-PHARM-004',
      confidence: 0.95,
      matchNote: 'Matched Pantoprazole Sodium 40mg injection vial.'
    },
    {
      keywords: ['ondansetron', '4mg'],
      benchmarkId: 'REF-PHARM-005',
      confidence: 0.93,
      matchNote: 'Matched Ondansetron 2mg/ml (2ml / 4mg) ampoule.'
    },
    {
      keywords: ['ondansetron', 'inj'],
      benchmarkId: 'REF-PHARM-005',
      confidence: 0.91,
      matchNote: 'Matched Ondansetron injection ampoule.'
    },
    {
      keywords: ['meropenem', '1g'],
      benchmarkId: 'REF-PHARM-006',
      confidence: 0.95,
      matchNote: 'Matched Meropenem 1g injection powder.'
    },
    {
      keywords: ['enoxaparin', '40'],
      benchmarkId: 'REF-PHARM-007',
      confidence: 0.96,
      matchNote: 'Matched Enoxaparin 40mg prefilled syringe.'
    },
    {
      keywords: ['complete blood count'],
      benchmarkId: 'REF-DIAG-001',
      confidence: 0.98,
      matchNote: 'Matched Complete Blood Count (CBC) with differential.'
    },
    {
      keywords: ['cbc'],
      benchmarkId: 'REF-DIAG-001',
      confidence: 0.96,
      matchNote: 'Matched Complete Blood Count (CBC).'
    },
    {
      keywords: ['dengue', 'ns1'],
      benchmarkId: 'REF-DIAG-002',
      confidence: 0.98,
      matchNote: 'Matched Dengue NS1 Antigen ELISA diagnostic test.'
    },
    {
      keywords: ['liver function test'],
      benchmarkId: 'REF-DIAG-003',
      confidence: 0.98,
      matchNote: 'Matched Liver Function Test (LFT) full profile.'
    },
    {
      keywords: ['lft'],
      benchmarkId: 'REF-DIAG-003',
      confidence: 0.95,
      matchNote: 'Matched Liver Function Test profile.'
    },
    {
      keywords: ['kidney function', 'kft'],
      benchmarkId: 'REF-DIAG-004',
      confidence: 0.95,
      matchNote: 'Matched Renal/Kidney Function Test panel.'
    },
    {
      keywords: ['serum creatinine'],
      benchmarkId: 'REF-DIAG-004',
      confidence: 0.90,
      matchNote: 'Matched Renal profile test.'
    },
    {
      keywords: ['ultrasound', 'abdomen'],
      benchmarkId: 'REF-DIAG-005',
      confidence: 0.96,
      matchNote: 'Matched Ultrasound Whole Abdomen imaging.'
    },
    {
      keywords: ['usg', 'abdomen'],
      benchmarkId: 'REF-DIAG-005',
      confidence: 0.95,
      matchNote: 'Matched Ultrasound Whole Abdomen imaging.'
    },
    {
      keywords: ['x ray chest'],
      benchmarkId: 'REF-DIAG-006',
      confidence: 0.96,
      matchNote: 'Matched Chest X-Ray PA digital view.'
    },
    {
      keywords: ['chest x ray'],
      benchmarkId: 'REF-DIAG-006',
      confidence: 0.96,
      matchNote: 'Matched Chest X-Ray PA digital view.'
    },
    {
      keywords: ['general ward', 'bed'],
      benchmarkId: 'REF-ROOM-001',
      confidence: 0.92,
      matchNote: 'Matched General Ward Inpatient accommodation rate.'
    },
    {
      keywords: ['semi private', 'room'],
      benchmarkId: 'REF-ROOM-002',
      confidence: 0.93,
      matchNote: 'Matched Semi-Private twin-sharing room accommodation benchmark.'
    },
    {
      keywords: ['icu bed'],
      benchmarkId: 'REF-ROOM-003',
      confidence: 0.95,
      matchNote: 'Matched Intensive Care Unit (ICU) daily care benchmark.'
    },
    {
      keywords: ['nursing care'],
      benchmarkId: 'REF-ROOM-004',
      confidence: 0.90,
      matchNote: 'Matched Inpatient Nursing Care schedule.'
    },
    {
      keywords: ['cholecystectomy'],
      benchmarkId: 'REF-SURG-001',
      confidence: 0.95,
      matchNote: 'Matched Laparoscopic Cholecystectomy surgical procedure package.'
    },
    {
      keywords: ['lap chole'],
      benchmarkId: 'REF-SURG-001',
      confidence: 0.95,
      matchNote: 'Matched Laparoscopic Cholecystectomy surgical package.'
    },
    {
      keywords: ['normal delivery'],
      benchmarkId: 'REF-SURG-002',
      confidence: 0.94,
      matchNote: 'Matched Normal Vaginal Delivery obstetric package.'
    },
    {
      keywords: ['surgical gloves'],
      benchmarkId: 'REF-CONS-001',
      confidence: 0.92,
      matchNote: 'Matched Sterile Surgical Latex Gloves pair.'
    },
    {
      keywords: ['n95 mask'],
      benchmarkId: 'REF-CONS-002',
      confidence: 0.94,
      matchNote: 'Matched N95 Particulate Respirator Medical Mask.'
    },
    {
      keywords: ['syringe', '5ml'],
      benchmarkId: 'REF-CONS-003',
      confidence: 0.92,
      matchNote: 'Matched Disposable Hypodermic Syringe 5ml.'
    }
  ];

  for (const rule of rules) {
    const allFound = rule.keywords.every((kw) => desc.includes(kw));
    if (allFound) {
      const benchmark = REFERENCE_BENCHMARKS.find((b) => b.id === rule.benchmarkId);
      if (benchmark) {
        return {
          match: benchmark,
          confidence: rule.confidence,
          notes: rule.matchNote
        };
      }
    }
  }

  // Fallback: Check if description closely mentions standardName of any benchmark
  for (const b of REFERENCE_BENCHMARKS) {
    const standardTokens = cleanText(b.standardName).split(' ');
    let matchesCount = 0;
    for (const token of standardTokens) {
      if (token.length > 3 && desc.includes(token)) {
        matchesCount++;
      }
    }
    if (matchesCount >= 3) {
      return {
        match: b,
        confidence: 0.75,
        notes: `Partial taxonomy match against ${b.standardName}.`
      };
    }
  }

  return {
    match: null,
    confidence: 0.0,
    notes: 'No verified statutory price cap or CGHS reference entry found for this specific description.'
  };
}

/**
 * Analyzes and evaluates a line item against verified benchmarks
 */
export function evaluateLineItem(item: Partial<LineItem> & { description: string; billedUnitPrice: number; quantity: number }): LineItem {
  const billedUnitPrice = Math.max(0, item.billedUnitPrice || 0);
  const quantity = Math.max(1, item.quantity || 1);
  const billedAmount = Math.round(billedUnitPrice * quantity * 100) / 100;
  
  const matchResult = matchLineItemToReference({
    description: item.description,
    category: item.category,
    code: item.code
  });

  const benchmark = matchResult.match;

  if (!benchmark) {
    return {
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      code: item.code || 'UNLISTED',
      description: item.description,
      category: item.category || 'consumables',
      quantity,
      unit: item.unit || 'unit',
      billedUnitPrice,
      billedAmount,
      matchStatus: 'insufficient_evidence',
      matchingConfidence: matchResult.confidence,
      matchingNotes: matchResult.notes,
      discrepancyRationale: 'Insufficient itemized data or unlisted specialty service. Hospital bill does not contain sufficient dosage, brand specification, or sub-component breakdown to match an official benchmark.',
      userEdited: item.userEdited || false,
      patientNotes: item.patientNotes || ''
    };
  }

  const referenceUnitPrice = benchmark.referenceUnitPrice;
  const referenceAmount = Math.round(referenceUnitPrice * quantity * 100) / 100;
  const differenceAmount = Math.round((billedAmount - referenceAmount) * 100) / 100;
  const percentageVariance = Math.round(((billedAmount - referenceAmount) / referenceAmount) * 1000) / 10;

  let matchStatus: ComparisonStatus = 'in_range';
  let discrepancyRationale = '';

  // Evaluation criteria
  if (percentageVariance > 5) {
    matchStatus = 'discrepancy';
    const currencyDiff = differenceAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    const refRateFormatted = referenceUnitPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    const billedRateFormatted = billedUnitPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

    if (benchmark.benchmarkType === 'statutory_ceiling') {
      discrepancyRationale = `Billed unit rate of ${billedRateFormatted} exceeds the statutory ceiling cap of ${refRateFormatted} under ${benchmark.sourceName} by ${currencyDiff} (${percentageVariance}% variance). Request hospital billing review for statutory ceiling compliance.`;
    } else {
      discrepancyRationale = `Billed rate of ${billedRateFormatted} exceeds standard institutional reference benchmark of ${refRateFormatted} (${benchmark.sourceName}) by ${percentageVariance}%. Review with billing department recommended.`;
    }
  } else {
    matchStatus = 'in_range';
    discrepancyRationale = `Billed charge conforms within verified reference tariff benchmark (${benchmark.sourceName}). No notable discrepancy detected.`;
  }

  return {
    id: item.id || `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    code: item.code || benchmark.standardCode,
    description: item.description,
    category: (item.category as any) || benchmark.category,
    quantity,
    unit: item.unit || benchmark.unit,
    billedUnitPrice,
    billedAmount,
    matchStatus,
    referenceItem: benchmark,
    referenceAmount,
    differenceAmount,
    percentageVariance,
    discrepancyRationale,
    matchingConfidence: matchResult.confidence,
    matchingNotes: matchResult.notes,
    userEdited: item.userEdited || false,
    patientNotes: item.patientNotes || ''
  };
}

/**
 * Re-evaluates an entire bill's line items
 */
export function evaluateAllLineItems(items: LineItem[]): LineItem[] {
  return items.map((item) => {
    // If the item already has a manual user edit or forced reference, evaluate keeping user notes
    return evaluateLineItem(item);
  });
}
