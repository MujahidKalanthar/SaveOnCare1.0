/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare — Types for healthcare billing transparency
 * Prepared for Renaissance 10.0 B-Plan competition at MNNIT Allahabad
 */

export type ItemCategory = 
  | 'pharmacy'
  | 'diagnostics'
  | 'room_nursing'
  | 'consumables'
  | 'surgical_procedure'
  | 'administrative';

export type ComparisonStatus = 
  | 'in_range'
  | 'discrepancy'
  | 'insufficient_evidence';

export type BenchmarkType = 
  | 'statutory_ceiling' // e.g. NPPA DPCO notified cap
  | 'government_reimbursement_rate' // e.g. CGHS Delhi or MCD standard rate
  | 'synthetic_benchmark'; // clearly labeled benchmark for demo

export interface ReferenceBenchmark {
  id: string;
  standardCode: string;
  standardName: string;
  category: ItemCategory;
  referenceUnitPrice: number;
  unit: string;
  sourceName: string;
  sourceDate: string;
  benchmarkType: BenchmarkType;
  conditions: string;
  officialRefNumber?: string;
  verifiedPortalUrl?: string;
}

export interface LineItem {
  id: string;
  code: string;
  description: string;
  category: ItemCategory;
  quantity: number;
  unit: string;
  billedUnitPrice: number;
  billedAmount: number;
  
  // Comparison engine results
  matchStatus: ComparisonStatus;
  referenceItem?: ReferenceBenchmark;
  referenceAmount?: number;
  differenceAmount?: number; // billedAmount - referenceAmount
  percentageVariance?: number; // ((billed - ref) / ref) * 100
  discrepancyRationale?: string;
  matchingConfidence: number; // 0.0 - 1.0
  matchingNotes?: string;
  
  // Patient review capability
  userEdited?: boolean;
  patientNotes?: string;
}

export interface BillDocument {
  id: string;
  billNumber: string;
  hospitalName: string;
  hospitalTier: 'Municipal / Public Hospital' | 'Private Super-Speciality' | 'Maternity & Nursing Home';
  hospitalLocation: string;
  patientSyntheticId: string;
  patientNameSynthetic: string;
  admissionDate: string;
  dischargeDate: string;
  department: string;
  diagnosisSummary: string;
  lineItems: LineItem[];
  notes?: string;
  totalBilled: number;
}

export interface CategorySummary {
  category: ItemCategory;
  categoryLabel: string;
  itemCount: number;
  billedTotal: number;
  referenceTotal: number;
  potentialDiscrepancy: number;
  discrepancyItemCount: number;
}

export interface ClarityReportSummary {
  totalBilled: number;
  comparableBilledTotal: number;
  referenceTotal: number;
  potentialDiscrepancyTotal: number;
  statusCounts: {
    in_range: number;
    discrepancy: number;
    insufficient_evidence: number;
  };
  categorySummaries: CategorySummary[];
  highPriorityQuestions: QuestionGuideItem[];
}

export interface QuestionGuideItem {
  id: string;
  topic: string;
  targetItems: string[];
  suggestedQuestion: string;
  rationale: string;
  hospitalDeskContact: string; // e.g., 'Hospital Billing Desk', 'Pharmacy TPA Desk', 'Medical Superintendent Office'
}

export interface GrievanceResource {
  id: string;
  agency: string;
  title: string;
  helpline: string;
  website: string;
  description: string;
  applicableScope: string;
  badge: string;
}

export interface HealthcareScheme {
  id: string;
  name: string;
  acronym: string;
  governingBody: string;
  summary: string;
  coverageLimit: string;
  targetBeneficiaries: string;
  keyEntitlements: string[];
  documentsRequired: string[];
  officialPortal: string;
  helpline: string;
}
