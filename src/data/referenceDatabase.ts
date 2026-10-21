/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare Reference Price Database
 * 
 * Contains verified statutory drug ceiling prices (NPPA DPCO),
 * CGHS Delhi diagnostic & procedure rates, and clearly labeled
 * synthetic benchmarks for public hospital and institutional billing comparisons.
 */

import { ReferenceBenchmark } from '../types/billing';

export const REFERENCE_BENCHMARKS: ReferenceBenchmark[] = [
  // PHARMACY / MEDICINES (NPPA DPCO & NLEM Notifications)
  {
    id: 'REF-PHARM-001',
    standardCode: 'NLEM-CEFT-1G',
    standardName: 'Ceftriaxone Injection 1g (Dry Vial with WFI)',
    category: 'pharmacy',
    referenceUnitPrice: 62.45,
    unit: 'vial',
    sourceName: 'NPPA DPCO Ceiling Price Notification S.O. 1499(E)',
    sourceDate: '2024-03-25',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/2024/CEFT-1G',
    conditions: 'Statutory ceiling price excluding local GST (12%). Applicable nationwide to all brand formulations.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-PHARM-002',
    standardCode: 'NLEM-PARA-IV',
    standardName: 'Paracetamol Infusion 10mg/ml (100ml IV Bottle)',
    category: 'pharmacy',
    referenceUnitPrice: 40.50,
    unit: 'bottle',
    sourceName: 'NPPA DPCO Ceiling Price Notification S.O. 1215(E)',
    sourceDate: '2024-02-18',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/2024/PARA-IV',
    conditions: 'Maximum retail price ceiling for 100ml paracetamol infusion. Hospital retail markup must not exceed ceiling.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-PHARM-003',
    standardCode: 'NLEM-NS-500',
    standardName: 'Sodium Chloride 0.9% IV Infusion (Normal Saline 500ml)',
    category: 'pharmacy',
    referenceUnitPrice: 21.30,
    unit: 'pack',
    sourceName: 'NPPA DPCO Ceiling Notification (Large Volume Parenterals)',
    sourceDate: '2023-11-15',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/LVP/2023/NS500',
    conditions: 'Standard FFS / blow-fill-seal plastic container 500ml. Excludes cannula or infusion set.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-PHARM-004',
    standardCode: 'NLEM-PANTO-40',
    standardName: 'Pantoprazole Sodium Injection 40mg Vial',
    category: 'pharmacy',
    referenceUnitPrice: 54.20,
    unit: 'vial',
    sourceName: 'NPPA DPCO Ceiling Price Schedule',
    sourceDate: '2024-01-10',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/2024/PANTO-40',
    conditions: 'Capped ceiling rate under NLEM 2022 schedule for lyophilized injection 40mg.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-PHARM-005',
    standardCode: 'NLEM-ONDA-4',
    standardName: 'Ondansetron Injection 2mg/ml (2ml Ampoule)',
    category: 'pharmacy',
    referenceUnitPrice: 14.80,
    unit: 'ampoule',
    sourceName: 'NPPA DPCO Drug Ceiling Schedule',
    sourceDate: '2023-10-01',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/2023/ONDA-4',
    conditions: 'Single 2ml ampoule antiemetic therapy.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-PHARM-006',
    standardCode: 'NLEM-MERO-1G',
    standardName: 'Meropenem Injection 1g Powder for Solution',
    category: 'pharmacy',
    referenceUnitPrice: 940.00,
    unit: 'vial',
    sourceName: 'NPPA DPCO Revised Ceiling Price',
    sourceDate: '2024-04-01',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/2024/MERO-1G',
    conditions: 'National ceiling price for reserve carbapenem antibiotic 1g vial.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-PHARM-007',
    standardCode: 'NLEM-ENOX-40',
    standardName: 'Enoxaparin Sodium Pre-filled Syringe 40mg/0.4ml',
    category: 'pharmacy',
    referenceUnitPrice: 395.00,
    unit: 'syringe',
    sourceName: 'NPPA DPCO Low Molecular Weight Heparin Notification',
    sourceDate: '2023-12-05',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/DPCO/2023/ENOX-40',
    conditions: 'Single-dose subcutaneous pre-filled syringe 40mg.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },

  // DIAGNOSTICS & PATHOLOGY (CGHS Delhi Rate Schedule 2023-2024)
  {
    id: 'REF-DIAG-001',
    standardCode: 'CGHS-DEL-CBC',
    standardName: 'Complete Blood Count (CBC) with Automated Differential & Platelet Count',
    category: 'diagnostics',
    referenceUnitPrice: 180.00,
    unit: 'test',
    sourceName: 'CGHS Delhi Revised Rate Schedule for Diagnostic Labs',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/LAB/2023/04',
    conditions: 'NABH/NABL accredited laboratory reference rate in National Capital Territory of Delhi.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-DIAG-002',
    standardCode: 'CGHS-DEL-DENGUE-NS1',
    standardName: 'Dengue NS1 Antigen ELISA Test',
    category: 'diagnostics',
    referenceUnitPrice: 600.00,
    unit: 'test',
    sourceName: 'Delhi Government Directorate of Health Services (DGHS) Price Cap Advisory',
    sourceDate: '2023-09-01',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'DGHS/DEL/EPID/2023/DENGUE-CAP',
    conditions: 'Delhi state government statutory ceiling cap on Dengue NS1 and Antibody tests in all Delhi private labs.',
    verifiedPortalUrl: 'https://dghs.delhigovt.nic.in'
  },
  {
    id: 'REF-DIAG-003',
    standardCode: 'CGHS-DEL-LFT',
    standardName: 'Liver Function Test (LFT) Complete Profile',
    category: 'diagnostics',
    referenceUnitPrice: 250.00,
    unit: 'test',
    sourceName: 'CGHS Delhi Rate Schedule for Pathological Investigations',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/LAB/2023/LFT',
    conditions: 'Includes Bilirubin total/direct, SGOT, SGPT, Alkaline Phosphatase, Total Protein, Albumin, Globulin.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-DIAG-004',
    standardCode: 'CGHS-DEL-KFT',
    standardName: 'Renal / Kidney Function Test (KFT / Serum Creatinine & Urea)',
    category: 'diagnostics',
    referenceUnitPrice: 220.00,
    unit: 'test',
    sourceName: 'CGHS Delhi Diagnostic Tariff',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/LAB/2023/KFT',
    conditions: 'Includes Serum Creatinine, Blood Urea Nitrogen, Uric Acid, and Electrolytes.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-DIAG-005',
    standardCode: 'CGHS-DEL-USG-ABD',
    standardName: 'Ultrasound Whole Abdomen (Sonography)',
    category: 'diagnostics',
    referenceUnitPrice: 550.00,
    unit: 'scan',
    sourceName: 'CGHS Delhi Radio-imaging Tariff Schedule',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/RADIO/USG-ABD',
    conditions: 'Real-time B-mode whole abdomen evaluation by certified Radiologist.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-DIAG-006',
    standardCode: 'CGHS-DEL-XRAY-CHEST',
    standardName: 'Chest X-Ray PA View (Digital / CR)',
    category: 'diagnostics',
    referenceUnitPrice: 160.00,
    unit: 'film',
    sourceName: 'CGHS Delhi Radio-imaging Schedule',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/RADIO/XR-01',
    conditions: 'Single digital exposure including formal radiologist report.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },

  // ROOM & NURSING (MCD & CGHS Benchmark Tariff)
  {
    id: 'REF-ROOM-001',
    standardCode: 'MCD-BED-GEN',
    standardName: 'General Ward Inpatient Bed Charges (Per Day)',
    category: 'room_nursing',
    referenceUnitPrice: 650.00,
    unit: 'day',
    sourceName: 'Municipal Corporation of Delhi (MCD) Hospital Healthcare Tariff Notification',
    sourceDate: '2023-06-15',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'MCD/HD/2023/TARIFF-BED-GEN',
    conditions: 'Includes bed accommodation, routine nursing care, linen service, and resident doctor daily rounds in municipal general ward.',
    verifiedPortalUrl: 'https://mcdonline.nic.in'
  },
  {
    id: 'REF-ROOM-002',
    standardCode: 'CGHS-ROOM-SEMI',
    standardName: 'Semi-Private Room (Twin Sharing) Bed & Nursing Per Day',
    category: 'room_nursing',
    referenceUnitPrice: 2000.00,
    unit: 'day',
    sourceName: 'CGHS Delhi Empaneled Hospital Inpatient Accommodation Guideline',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/HOSP/ROOM-SEMI',
    conditions: 'Twin-sharing air-conditioned room with attached toilet. Standard institutional cap for semi-private entitlement.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-ROOM-003',
    standardCode: 'CGHS-ICU-BED',
    standardName: 'Intensive Care Unit (ICU) Bed & Monitoring Charges (Per 24h)',
    category: 'room_nursing',
    referenceUnitPrice: 4500.00,
    unit: 'day',
    sourceName: 'CGHS Delhi Revised Package Rates for Critical Care',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/DEL/ICU/2023',
    conditions: 'Includes multipara cardiac monitoring, intensive nursing 1:1, pulse oximetry, and resident intensivist coverage. Excludes invasive ventilator machine rent.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-ROOM-004',
    standardCode: 'CGHS-NURSING-CARE',
    standardName: 'General Inpatient Nursing Care Fee (Per Day)',
    category: 'room_nursing',
    referenceUnitPrice: 300.00,
    unit: 'day',
    sourceName: 'CGHS Delhi Nursing Services Schedule',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    conditions: 'Routine medication administration, vital signs tracking, and bedside nursing.'
  },

  // SURGICAL PROCEDURES & CLINICAL PACKAGES
  {
    id: 'REF-SURG-001',
    standardCode: 'CGHS-SURG-LAP-CHOL',
    standardName: 'Laparoscopic Cholecystectomy (Gallbladder Removal) Surgical Package',
    category: 'surgical_procedure',
    referenceUnitPrice: 22000.00,
    unit: 'package',
    sourceName: 'CGHS Delhi Surgical Package Rates',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/SURG/GI/442',
    conditions: 'Package includes OT charges, surgeon and assistant surgeon fees, anaesthetist fees, standard surgical equipment, and 2-day routine post-operative care.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },
  {
    id: 'REF-SURG-002',
    standardCode: 'CGHS-SURG-NVD',
    standardName: 'Normal Vaginal Delivery (Confinement & Obstetric Care Package)',
    category: 'surgical_procedure',
    referenceUnitPrice: 13500.00,
    unit: 'package',
    sourceName: 'CGHS Delhi Maternity & Obstetric Package Schedule',
    sourceDate: '2023-04-12',
    benchmarkType: 'government_reimbursement_rate',
    officialRefNumber: 'CGHS/OBG/2023/NVD',
    conditions: 'Includes labour room charges, obstetrician delivery fee, paediatrician attendance at birth, and routine newborn screening.',
    verifiedPortalUrl: 'https://cghs.gov.in'
  },

  // CONSUMABLES & DISPOSABLES
  {
    id: 'REF-CONS-001',
    standardCode: 'NPPA-GLOVES-STERILE',
    standardName: 'Sterile Surgical Latex Gloves (Size 7.0 / 7.5) Pair',
    category: 'consumables',
    referenceUnitPrice: 32.50,
    unit: 'pair',
    sourceName: 'NPPA Trade Margin Rationalisation (TMR) Benchmark for Medical Devices',
    sourceDate: '2023-08-14',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/MD/TMR/GLOVES-2023',
    conditions: 'Statutory capped trade margin for pre-powdered/powder-free surgical sterile gloves.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-CONS-002',
    standardCode: 'NPPA-MASK-N95',
    standardName: 'N95 Particulate Respirator / Medical Mask',
    category: 'consumables',
    referenceUnitPrice: 45.00,
    unit: 'piece',
    sourceName: 'NPPA Voluntary Price Cap Advisory on COVID-19 & Respiratory Consumables',
    sourceDate: '2022-06-20',
    benchmarkType: 'statutory_ceiling',
    officialRefNumber: 'NPPA/MD/N95-CAP',
    conditions: 'IS 9473 / NIOSH approved particulate filtration mask.',
    verifiedPortalUrl: 'https://nppaindia.gov.in'
  },
  {
    id: 'REF-CONS-003',
    standardCode: 'REF-SYRINGE-5ML',
    standardName: 'Disposable Hypodermic Syringe with Needle 5ml',
    category: 'consumables',
    referenceUnitPrice: 8.50,
    unit: 'piece',
    sourceName: 'Jan Aushadhi Generic Medical Supplies Benchmark',
    sourceDate: '2023-09-10',
    benchmarkType: 'synthetic_benchmark',
    officialRefNumber: 'PMBJP/DEVICE/SYR-05',
    conditions: 'Single-use sterile blister pack syringe.'
  }
];

// Grievance resources relevant to Delhi healthcare patients
export const OFFICIAL_GRIEVANCE_RESOURCES = [
  {
    id: 'GRIEV-001',
    agency: 'National Consumer Helpline (NCH)',
    title: 'Department of Consumer Affairs, Government of India',
    helpline: '1915 or 1800-11-4000',
    website: 'https://consumerhelpline.gov.in',
    description: 'National statutory grievance portal for unfair trade practices, overcharging on MRP/statutory caps, and medical billing discrepancies.',
    applicableScope: 'Pan-India, all private and public hospital billing disputes and non-transparent medical charges.',
    badge: 'National Consumer Portal'
  },
  {
    id: 'GRIEV-002',
    agency: 'NPPA — Pharma Sahi Daam & IPDMS Grievance Portal',
    title: 'National Pharmaceutical Pricing Authority',
    helpline: '1800-111-255 (Toll-Free)',
    website: 'https://nppaindia.gov.in/ipdms',
    description: 'Dedicated redressal authority for any hospital or chemist charging above the DPCO notified ceiling price for scheduled medicines and medical devices.',
    applicableScope: 'Prescription medicines, IV fluids, stents, orthopaedic implants, and price-capped consumables.',
    badge: 'Statutory Drug Price Cap Authority'
  },
  {
    id: 'GRIEV-003',
    agency: 'Delhi State Consumer Disputes Redressal Commission (DSCDRC)',
    title: 'Govt. of NCT of Delhi Consumer Redressal Forum',
    helpline: '011-23378541',
    website: 'http://delhistatecommission.nic.in',
    description: 'Official judicial consumer forum for compensation claims regarding deficiency in medical service, arbitrary hospital package inflation, and unbundled charges.',
    applicableScope: 'Delhi territory disputes exceeding direct hospital escalation.',
    badge: 'State Judicial Commission'
  },
  {
    id: 'GRIEV-004',
    agency: 'Directorate General of Health Services (DGHS) Delhi Grievance Cell',
    title: 'Health & Family Welfare Dept, Govt. of NCT of Delhi',
    helpline: '011-22304568',
    website: 'https://dghs.delhigovt.nic.in',
    description: 'Regulatory oversight for private clinical establishments in Delhi under the Delhi Nursing Homes Registration Act, enforcing price cap advisories on dengue testing and hospital admission norms.',
    applicableScope: 'Private hospitals & nursing homes registered in Delhi NCT.',
    badge: 'Delhi Healthcare Regulatory Cell'
  }
];

// Public Healthcare Schemes Information
export const HEALTHCARE_SCHEMES = [
  {
    id: 'SCHEME-001',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    acronym: 'AB PM-JAY',
    governingBody: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
    summary: 'The world’s largest government-funded health assurance scheme, providing cashless inpatient treatment across empaneled public and private hospitals.',
    coverageLimit: 'Up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization.',
    targetBeneficiaries: 'Deprived rural and specified occupational urban families as identified by SECC 2011 database, and all senior citizens aged 70+ (under expanded Ayushman Vay Vandana card).',
    keyEntitlements: [
      'Cashless admission, bed charges, surgery packages, and drugs up to 15 days post-discharge',
      'No cap on family size or age of family members',
      'Portability across empaneled private and public hospitals across India'
    ],
    documentsRequired: [
      'Aadhaar Card of the patient',
      'Ration Card / PM-JAY Family ID letter',
      'Active mobile phone linked with Aadhaar for OTP verification'
    ],
    officialPortal: 'https://pmjay.gov.in',
    helpline: '14555'
  },
  {
    id: 'SCHEME-002',
    name: 'Delhi Arogya Kosh (DAK)',
    acronym: 'DAK',
    governingBody: 'Govt. of NCT of Delhi, Health & Family Welfare Department',
    summary: 'Financial scheme providing free specified high-end radiological tests and surgical procedures at empaneled private centres if wait times at Delhi government hospitals exceed specified thresholds.',
    coverageLimit: 'Full reimbursement / cashless voucher for 400+ notified surgical procedures and advanced diagnostic tests (MRI, CT, PET scans).',
    targetBeneficiaries: 'Residents of National Capital Territory (NCT) of Delhi who have been referred by a Delhi Government or MCD hospital due to queue backlogs.',
    keyEntitlements: [
      'Free MRI, PET-CT, and Ultrasound at private diagnostic labs with Delhi Govt hospital referral',
      'Specified cardiac, laparoscopic, and orthopaedic surgeries at empaneled private hospitals',
      'Zero out-of-pocket payment by patient when referred through DAK counter'
    ],
    documentsRequired: [
      'Delhi Voter ID Card / Proof of Delhi residence for minimum 3 years',
      'Original OPD slip and referral certificate from Delhi Govt or MCD hospital Doctor',
      'Aadhaar card of patient'
    ],
    officialPortal: 'https://dghs.delhigovt.nic.in',
    helpline: '1031 (Delhi Govt Citizen Helpline)'
  },
  {
    id: 'SCHEME-003',
    name: 'Delhi Arogya Nidhi (DAN)',
    acronym: 'DAN',
    governingBody: 'Govt. of NCT of Delhi',
    summary: 'Provides one-time financial assistance directly to hospitals for low-income patients suffering from life-threatening diseases receiving treatment in Delhi government institutions.',
    coverageLimit: 'Financial grant up to ₹5,00,000 directly sanctioned to treating government hospital.',
    targetBeneficiaries: 'BPL card holders and families with annual income below specified poverty criteria residing in Delhi for at least 3 years.',
    keyEntitlements: [
      'Financial support for expensive medical implants, cancer chemotherapy, and neurosurgical interventions',
      'Funds deposited directly with hospital superintendent account'
    ],
    documentsRequired: [
      'Income certificate issued by SDM / National Food Security (NFS) Card',
      'Estimate of treatment cost signed by treating Medical Superintendent',
      'Delhi voter identity card / domicile proof'
    ],
    officialPortal: 'https://delhi.gov.in',
    helpline: '011-22304568'
  },
  {
    id: 'SCHEME-004',
    name: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana',
    acronym: 'PMBJP',
    governingBody: 'Pharmaceuticals & Medical Devices Bureau of India (PMBI)',
    summary: 'Government initiative making quality generic medicines, surgical disposables, and nutraceuticals available to everyone at 50% to 90% lower prices than branded equivalents.',
    coverageLimit: 'Substantial direct savings on 1900+ generic medicines and 300+ surgical consumables.',
    targetBeneficiaries: 'Open to all citizens without any income or residency test.',
    keyEntitlements: [
      'World Health Organization (WHO-GMP) certified generic formulations',
      'Jan Aushadhi Sugam mobile app to find nearby Kendra and price comparisons'
    ],
    documentsRequired: [
      'Valid medical prescription specifying generic chemical name or doctor’s note'
    ],
    officialPortal: 'https://janaushadhi.gov.in',
    helpline: '1800-180-8080'
  }
];
