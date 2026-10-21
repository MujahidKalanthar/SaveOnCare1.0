# SaveOnCare — Patient-Facing Healthcare Billing Transparency Platform

**SaveOnCare** is an interactive healthcare billing transparency platform proposed by **Team VoltEdge** for the **Renaissance 10.0 B-Plan competition at Motilal Nehru National Institute of Technology (MNNIT) Allahabad**.

The platform is designed to empower patients and families navigating stressful hospital discharge processes by providing clear, plain-language bill line-itemisation, cross-referencing charges against verified statutory and government reference prices (NPPA DPCO ceiling prices, CGHS Delhi tariff schedules, and MCD hospital circulars), and generating actionable, respectful questions for hospital billing counters.

---

## 1. Key Features

- **Billing Line-Item Extraction & Categorisation**: Structures complex inpatient hospital bills into standard clinical categories (Pharmacy, Diagnostics, Room & Inpatient Nursing, Consumables & Disposables, Surgical Procedures, and Administrative Surcharges).
- **Deterministic Transparent Comparison Engine**:
  - Matches billed medicines against **NPPA (National Pharmaceutical Pricing Authority) DPCO statutory price caps**.
  - Matches diagnostic lab investigations against **CGHS (Central Government Health Scheme) Delhi tariff schedules** and **Delhi DGHS price cap advisories** (e.g. Dengue NS1 antigen caps).
  - Matches hospital accommodation against **Municipal Corporation of Delhi (MCD)** and **CGHS inpatient schedules**.
  - Clearly flags non-itemized composite bundles (e.g. *"Surgical OT Consumables Kit"*, *"Hospital Sanitization Fee"*) as **"Insufficient evidence to compare"** rather than fabricating ungrounded figures.
- **Interactive Bill Workspace**:
  - Switch between 3 realistic Delhi public and private clinical cases (MCD hospital laparoscopic cholecystectomy, private tertiary hospital dengue admission with ICU care, and maternity hospital delivery).
  - Live inline editing of quantities and unit rates with instant recalculation.
  - Interactive item inspection drawer providing full regulatory citations, circular numbers, and mathematical audit steps.
  - Add custom items or click quick test presets to evaluate arbitrary medical charges in real time.
- **Patient Clarity Report & Question Guide**:
  - Executive-level summary of total billed charges, comparable charges, and potential review variances.
  - Tailored, non-accusatory inquiry scripts formatted for the hospital billing desk or treating physician.
  - Directory of verified statutory redressal resources (National Consumer Helpline 1915, NPPA Pharma Sahi Daam, Delhi State Consumer Commission, Delhi DGHS Grievance Cell).
  - Print & PDF export layout optimized with `@media print` styling.
- **Public Healthcare Assistance Navigator**:
  - Information on government health schemes (Ayushman Bharat PM-JAY, Delhi Arogya Kosh - DAK, Delhi Arogya Nidhi - DAN, and PM Jan Aushadhi generic pharmacies).
  - Educational guidance checklists and hospital desk directions (Ayushman Mitra, Medical Social Worker desks).
- **100% Client-Side Privacy**:
  - Zero sensitive patient health information (PHI) is transmitted to external servers or third-party AI models.
  - Runs hermetically in the browser without paid API key dependencies.

---

## 2. Technology Stack

- **Frontend Framework**: React 19 (Functional components, hooks)
- **Language**: TypeScript (Strict typing for billing models and audit trails)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`) with Plus Jakarta Sans and JetBrains Mono tabular numerals (`tabular-nums`)
- **Icons**: Lucide React
- **Build Tool**: Vite 8 & TSX

---

## 3. Installation & Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup Steps

1. Clone or download the repository:
   ```bash
   cd applet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server on port 3000:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 4. Production Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The resulting static files in `/dist` can be deployed directly to any static hosting provider (Google Cloud Run, Vercel, Netlify, Firebase Hosting, GitHub Pages).

---

## 5. Synthetic Sample Data & How to Replace with Verified Live Data

All demonstration sample bills and catalog benchmarks are stored in modular files:

| File Path | Description |
| :--- | :--- |
| `src/data/sampleBills.ts` | Contains 3 realistic synthetic hospital bills modeled after Delhi healthcare scenarios. |
| `src/data/referenceDatabase.ts` | Reference pricing database containing NPPA DPCO drug notifications, CGHS Delhi diagnostic tariffs, and grievance directories. |
| `src/types/billing.ts` | TypeScript interfaces for line items, benchmarks, and clarity reports. |
| `src/services/comparisonEngine.ts` | Deterministic token matching and variance calculation engine. |

### How to Replace with Live Production Data

1. **Hospital Bill Ingestion**:
   - Replace `SAMPLE_BILLS` with a secure on-premise OCR pipeline or ABDM (Ayushman Bharat Digital Mission) FHIR diagnostic report ingestion service.
2. **Statutory Reference Feeds**:
   - In `src/data/referenceDatabase.ts`, replace the static `REFERENCE_BENCHMARKS` array with a periodic automated synchronization script querying the **NPPA IPDMS API** (`https://nppaindia.gov.in`) and the **CGHS National Portal** for real-time tariff updates.
3. **Institutional Tariff Agreements**:
   - Partner hospitals can provide their authorized schedule of charges via standard JSON schemas conforming to `ReferenceBenchmark`.

---

## 6. Ethical Framework & Non-Negotiable Disclaimers

1. **Non-Adversarial Posture**: SaveOnCare empowers patients with objective clarity; it does not automatically accuse hospitals or clinicians of fraudulent overcharging. Differences may stem from unique brand formulations, emergency care, or unbundled surgical kits.
2. **No Guaranteed Refunds**: Potential variances indicate line items that warrant billing desk discussion, not guaranteed financial reimbursements.
3. **Synthetic Demonstration Data**: All patient names, bill IDs, and transactional entries are synthetic constructs developed specifically for Renaissance 10.0 evaluation.
4. **No Medical Advice**: SaveOnCare is an educational transparency platform and does not offer medical diagnoses or treatment recommendations.
