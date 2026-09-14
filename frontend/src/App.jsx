import React from 'react';
import MedicalReportAnalyzer from './components/MedicalReportAnalyzer';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <MedicalReportAnalyzer />
      <Toaster />
    </main>
  );
}

export default App;
