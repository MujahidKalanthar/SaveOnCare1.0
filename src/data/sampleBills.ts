/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Synthetic Hospital Sample Bills
 * 
 * High-fidelity synthetic patient billing records modeled after Delhi's healthcare ecosystem:
 * 1. North Delhi Municipal Referral Hospital (MCD Inpatient Cholecystectomy)
 * 2. South Delhi Multi-Speciality Hospital (Dengue Inpatient & ICU Observation)
 * 3. East Delhi Maternity & Nursing Center (Normal Delivery & Neonatal Care)
 * 
 * ALL patient identities, bill numbers, and transactions are synthetic and
 * compiled strictly for demonstration purposes in Renaissance 10.0 B-Plan competition.
 */

import { BillDocument } from '../types/billing';
import { evaluateLineItem } from '../services/comparisonEngine';

export const SAMPLE_BILLS: BillDocument[] = [
  {
    id: 'BILL-MCD-001',
    billNumber: 'MCD-HRH-2024-0842',
    hospitalName: 'North Delhi Municipal Referral Hospital',
    hospitalTier: 'Municipal / Public Hospital',
    hospitalLocation: 'Civil Lines / Malka Ganj, North Delhi',
    patientSyntheticId: 'SYN-PT-8192',
    patientNameSynthetic: 'Ramesh K. (Synthetic Patient Record)',
    admissionDate: '2024-09-12',
    dischargeDate: '2024-09-15',
    department: 'General Surgery / Minimally Invasive Surgery Unit',
    diagnosisSummary: 'Symptomatic Cholelithiasis (Gallbladder Stones) — Underwent Elective Laparoscopic Cholecystectomy',
    notes: 'Inpatient surgical discharge bill with municipal subsidy schedule applied. Demonstrates mix of statutory capped drugs, CGHS-benchmarked surgical package, and unbundled OT consumable kits.',
    totalBilled: 34167,
    lineItems: [
      evaluateLineItem({
        id: 'li-101',
        code: 'SURG-LAP-CHOL',
        description: 'Laparoscopic Cholecystectomy Surgical Procedure Package',
        category: 'surgical_procedure',
        quantity: 1,
        unit: 'package',
        billedUnitPrice: 22000
      }),
      evaluateLineItem({
        id: 'li-102',
        code: 'BED-GEN-INP',
        description: 'General Ward Inpatient Bed & Routine Care (3 Days)',
        category: 'room_nursing',
        quantity: 3,
        unit: 'day',
        billedUnitPrice: 650
      }),
      evaluateLineItem({
        id: 'li-103',
        code: 'MED-CEFT-1G',
        description: 'Ceftriaxone Injection 1g (Dry Vial with Sterile Water)',
        category: 'pharmacy',
        quantity: 4,
        unit: 'vial',
        billedUnitPrice: 280
      }),
      evaluateLineItem({
        id: 'li-104',
        code: 'MED-PARA-IV',
        description: 'Paracetamol Infusion 10mg/ml (100ml IV Infusion Bottle)',
        category: 'pharmacy',
        quantity: 3,
        unit: 'bottle',
        billedUnitPrice: 165
      }),
      evaluateLineItem({
        id: 'li-105',
        code: 'MED-NS-500',
        description: 'Sodium Chloride 0.9% IV Infusion (Normal Saline 500ml)',
        category: 'pharmacy',
        quantity: 6,
        unit: 'pack',
        billedUnitPrice: 22
      }),
      evaluateLineItem({
        id: 'li-106',
        code: 'MED-PANTO-40',
        description: 'Pantoprazole Sodium Injection 40mg Vial',
        category: 'pharmacy',
        quantity: 4,
        unit: 'vial',
        billedUnitPrice: 120
      }),
      evaluateLineItem({
        id: 'li-107',
        code: 'LAB-CBC-PRE',
        description: 'Complete Blood Count (CBC) Pre-operative Evaluation',
        category: 'diagnostics',
        quantity: 1,
        unit: 'test',
        billedUnitPrice: 180
      }),
      evaluateLineItem({
        id: 'li-108',
        code: 'LAB-LFT-PRE',
        description: 'Liver Function Test (LFT) Complete Profile',
        category: 'diagnostics',
        quantity: 1,
        unit: 'test',
        billedUnitPrice: 250
      }),
      evaluateLineItem({
        id: 'li-109',
        code: 'RAD-USG-ABD',
        description: 'Ultrasound Whole Abdomen (Sonography)',
        category: 'diagnostics',
        quantity: 1,
        unit: 'scan',
        billedUnitPrice: 550
      }),
      evaluateLineItem({
        id: 'li-110',
        code: 'CONS-GLV-01',
        description: 'Sterile Surgical Latex Gloves (Size 7.5) Pair',
        category: 'consumables',
        quantity: 6,
        unit: 'pair',
        billedUnitPrice: 110
      }),
      evaluateLineItem({
        id: 'li-111',
        code: 'CONS-OT-KIT',
        description: 'Surgical OT Consumables Kit (Unbundled Pack)',
        category: 'consumables',
        quantity: 1,
        unit: 'kit',
        billedUnitPrice: 4800
      }),
      evaluateLineItem({
        id: 'li-112',
        code: 'ADM-BMW-SUR',
        description: 'Hospital Administrative Overhead & Bio-medical Waste Surcharge',
        category: 'administrative',
        quantity: 1,
        unit: 'service',
        billedUnitPrice: 1500
      })
    ]
  },
  {
    id: 'BILL-PVT-002',
    billNumber: 'SDM-PVT-2024-9421',
    hospitalName: 'South Delhi Multi-Speciality Hospital',
    hospitalTier: 'Private Super-Speciality',
    hospitalLocation: 'Saket / Greater Kailash, South Delhi',
    patientSyntheticId: 'SYN-PT-9421',
    patientNameSynthetic: 'Sunita M. (Synthetic Patient Record)',
    admissionDate: '2024-10-04',
    dischargeDate: '2024-10-08',
    department: 'Internal Medicine & Critical Care Unit',
    diagnosisSummary: 'Acute Dengue Fever with Severe Thrombocytopenia & Hemoconcentration (Platelet count < 25,000/mcL)',
    notes: 'Private tertiary hospital admission. Demonstrates violation of Delhi Government DGHS price-capped Dengue testing, ICU monitoring variance, and composite infection control line items.',
    totalBilled: 68450,
    lineItems: [
      evaluateLineItem({
        id: 'li-201',
        code: 'LAB-DENGUE-NS1',
        description: 'Dengue NS1 Antigen ELISA Test',
        category: 'diagnostics',
        quantity: 1,
        unit: 'test',
        billedUnitPrice: 1400 // Delhi Govt statutory cap is ₹600!
      }),
      evaluateLineItem({
        id: 'li-202',
        code: 'LAB-CBC-REP',
        description: 'Complete Blood Count (CBC) with Platelet Count (Daily Monitoring)',
        category: 'diagnostics',
        quantity: 4,
        unit: 'test',
        billedUnitPrice: 450 // CGHS is ₹180
      }),
      evaluateLineItem({
        id: 'li-203',
        code: 'ICU-BED-24H',
        description: 'Intensive Care Unit (ICU) Bed & Monitoring Charges (2 Days)',
        category: 'room_nursing',
        quantity: 2,
        unit: 'day',
        billedUnitPrice: 8500 // CGHS is ₹4,500
      }),
      evaluateLineItem({
        id: 'li-204',
        code: 'ROOM-SEMI-PVT',
        description: 'Semi-Private Room (Twin Sharing) Bed & Nursing Per Day (2 Days)',
        category: 'room_nursing',
        quantity: 2,
        unit: 'day',
        billedUnitPrice: 3800 // CGHS is ₹2,000
      }),
      evaluateLineItem({
        id: 'li-205',
        code: 'MED-NS-500-D',
        description: 'Sodium Chloride 0.9% IV Infusion (Normal Saline 500ml)',
        category: 'pharmacy',
        quantity: 12,
        unit: 'pack',
        billedUnitPrice: 65 // NPPA cap is ₹21.30!
      }),
      evaluateLineItem({
        id: 'li-206',
        code: 'MED-PARA-IV-D',
        description: 'Paracetamol Infusion 10mg/ml (100ml IV Bottle)',
        category: 'pharmacy',
        quantity: 6,
        unit: 'bottle',
        billedUnitPrice: 240 // NPPA cap is ₹40.50
      }),
      evaluateLineItem({
        id: 'li-207',
        code: 'MED-ONDA-4-D',
        description: 'Ondansetron Injection 2mg/ml (2ml Ampoule)',
        category: 'pharmacy',
        quantity: 4,
        unit: 'ampoule',
        billedUnitPrice: 55 // NPPA cap is ₹14.80
      }),
      evaluateLineItem({
        id: 'li-208',
        code: 'LAB-LFT-D',
        description: 'Liver Function Test (LFT) Complete Profile',
        category: 'diagnostics',
        quantity: 1,
        unit: 'test',
        billedUnitPrice: 650 // CGHS is ₹250
      }),
      evaluateLineItem({
        id: 'li-209',
        code: 'CONS-N95-D',
        description: 'N95 Particulate Respirator / Medical Mask',
        category: 'consumables',
        quantity: 8,
        unit: 'piece',
        billedUnitPrice: 140 // NPPA advisory is ₹45
      }),
      evaluateLineItem({
        id: 'li-210',
        code: 'CONS-SYR-05',
        description: 'Disposable Hypodermic Syringe with Needle 5ml',
        category: 'consumables',
        quantity: 15,
        unit: 'piece',
        billedUnitPrice: 25 // Benchmark ₹8.50
      }),
      evaluateLineItem({
        id: 'li-211',
        code: 'MISC-INF-CTRL',
        description: 'Inpatient Infection Control, Linen & Barrier Sanitization Fee',
        category: 'administrative',
        quantity: 1,
        unit: 'service',
        billedUnitPrice: 4200
      }),
      evaluateLineItem({
        id: 'li-212',
        code: 'MISC-RMO-CRIT',
        description: 'RMO Critical Emergency Night Supervision Charge',
        category: 'room_nursing',
        quantity: 2,
        unit: 'night',
        billedUnitPrice: 2200
      })
    ]
  },
  {
    id: 'BILL-MAT-003',
    billNumber: 'EDM-MAT-2024-4019',
    hospitalName: 'East Delhi Maternity & Nursing Center',
    hospitalTier: 'Maternity & Nursing Home',
    hospitalLocation: 'Preet Vihar / Laxmi Nagar, East Delhi',
    patientSyntheticId: 'SYN-PT-4019',
    patientNameSynthetic: 'Pooja V. (Synthetic Patient Record)',
    admissionDate: '2024-08-20',
    dischargeDate: '2024-08-22',
    department: 'Obstetrics & Neonatology Unit',
    diagnosisSummary: 'Full-term Normal Spontaneous Vaginal Delivery with Healthy Neonate Observation',
    notes: 'Maternity nursing home invoice showing package bundling, pediatric consultation, and composite newborn kit charges.',
    totalBilled: 28950,
    lineItems: [
      evaluateLineItem({
        id: 'li-301',
        code: 'SURG-NVD-MAT',
        description: 'Normal Vaginal Delivery (Confinement & Obstetric Care Package)',
        category: 'surgical_procedure',
        quantity: 1,
        unit: 'package',
        billedUnitPrice: 14000 // CGHS is ₹13,500 (close, within tolerance)
      }),
      evaluateLineItem({
        id: 'li-302',
        code: 'ROOM-MAT-SEMI',
        description: 'Semi-Private Room (Twin Sharing) Bed & Nursing Per Day (2 Days)',
        category: 'room_nursing',
        quantity: 2,
        unit: 'day',
        billedUnitPrice: 2200 // CGHS is ₹2,000
      }),
      evaluateLineItem({
        id: 'li-303',
        code: 'MED-NS-MAT',
        description: 'Sodium Chloride 0.9% IV Infusion (Normal Saline 500ml)',
        category: 'pharmacy',
        quantity: 4,
        unit: 'pack',
        billedUnitPrice: 24
      }),
      evaluateLineItem({
        id: 'li-304',
        code: 'LAB-CBC-MAT',
        description: 'Complete Blood Count (CBC) with Differential',
        category: 'diagnostics',
        quantity: 1,
        unit: 'test',
        billedUnitPrice: 200 // CGHS is ₹180
      }),
      evaluateLineItem({
        id: 'li-305',
        code: 'CONS-GLV-MAT',
        description: 'Sterile Surgical Latex Gloves (Size 7.0) Pair',
        category: 'consumables',
        quantity: 8,
        unit: 'pair',
        billedUnitPrice: 65 // Benchmark is ₹32.50
      }),
      evaluateLineItem({
        id: 'li-306',
        code: 'CONS-SYR-MAT',
        description: 'Disposable Hypodermic Syringe with Needle 5ml',
        category: 'consumables',
        quantity: 10,
        unit: 'piece',
        billedUnitPrice: 15
      }),
      evaluateLineItem({
        id: 'li-307',
        code: 'MED-PANTO-MAT',
        description: 'Pantoprazole Sodium Injection 40mg Vial',
        category: 'pharmacy',
        quantity: 2,
        unit: 'vial',
        billedUnitPrice: 95 // NPPA cap is ₹54.20
      }),
      evaluateLineItem({
        id: 'li-308',
        code: 'KIT-BABY-NEW',
        description: 'Newborn Welcome Nursery Kit (Umbilical Clamp, Swaddles, Cap & Sterile Drape)',
        category: 'consumables',
        quantity: 1,
        unit: 'kit',
        billedUnitPrice: 3200 // Insufficient evidence: composite kit
      }),
      evaluateLineItem({
        id: 'li-309',
        code: 'ADM-MAT-REG',
        description: 'Hospital Admission Processing, Digital Record & Bio-safety Charge',
        category: 'administrative',
        quantity: 1,
        unit: 'charge',
        billedUnitPrice: 1400 // Insufficient evidence
      })
    ]
  }
];

// Helper to recalculate total of a bill
export function recalculateBillTotals(bill: BillDocument): BillDocument {
  const lineItems = bill.lineItems;
  const totalBilled = Math.round(
    lineItems.reduce((acc, curr) => acc + curr.billedAmount, 0) * 100
  ) / 100;

  return {
    ...bill,
    lineItems,
    totalBilled
  };
}
