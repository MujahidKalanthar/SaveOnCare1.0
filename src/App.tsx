/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * SaveOnCare — Patient-Facing Healthcare Billing Transparency Platform
 * VoltEdge initiative for Renaissance 10.0 B-Plan competition at MNNIT Allahabad.
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Workspace } from './components/Workspace';
import { ClarityReportView } from './components/ClarityReportView';
import { HealthcareAssistanceView } from './components/HealthcareAssistanceView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { SAMPLE_BILLS, recalculateBillTotals } from './data/sampleBills';
import { BillDocument } from './types/billing';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  
  // Clone initial samples to allow mutations without destroying originals
  const [sampleBillsCatalog, setSampleBillsCatalog] = useState<BillDocument[]>(() => {
    return JSON.parse(JSON.stringify(SAMPLE_BILLS));
  });

  const [currentBill, setCurrentBill] = useState<BillDocument>(() => {
    return JSON.parse(JSON.stringify(SAMPLE_BILLS[0]));
  });

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectSampleBill = (bill: BillDocument) => {
    setCurrentBill(JSON.parse(JSON.stringify(bill)));
  };

  const handleUpdateBill = (updated: BillDocument) => {
    const recalculated = recalculateBillTotals(updated);
    setCurrentBill(recalculated);

    // Keep catalog updated for the active bill
    setSampleBillsCatalog(prev => 
      prev.map(b => b.id === recalculated.id ? recalculated : b)
    );
  };

  const handleResetBill = () => {
    const original = SAMPLE_BILLS.find(b => b.id === currentBill.id);
    if (original) {
      const resetCopy = JSON.parse(JSON.stringify(original));
      setCurrentBill(resetCopy);
      setSampleBillsCatalog(prev =>
        prev.map(b => b.id === resetCopy.id ? resetCopy : b)
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-stone-900 selection:bg-orange-100 selection:text-orange-950 font-sans">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeBillTotal={currentBill.totalBilled}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            sampleBills={sampleBillsCatalog}
            onSelectBill={(bill) => {
              handleSelectSampleBill(bill);
              setActiveTab('workspace');
            }}
            onNavigateToWorkspace={() => setActiveTab('workspace')}
            onNavigateToSchemes={() => setActiveTab('schemes')}
          />
        )}

        {activeTab === 'workspace' && (
          <Workspace
            currentBill={currentBill}
            sampleBills={sampleBillsCatalog}
            onSelectSampleBill={handleSelectSampleBill}
            onUpdateBill={handleUpdateBill}
            onResetBill={handleResetBill}
            onNavigateToReport={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'report' && (
          <ClarityReportView
            bill={currentBill}
            onReturnToWorkspace={() => setActiveTab('workspace')}
          />
        )}

        {activeTab === 'schemes' && (
          <HealthcareAssistanceView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
