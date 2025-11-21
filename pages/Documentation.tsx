import React from 'react';
import { useLocation } from 'react-router-dom';

const Section: React.FC<{ title: string; children: React.ReactNode; id: string }> = ({ title, children, id }) => (
  <div id={id} className="mb-16 scroll-mt-24">
    <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">{title}</h2>
    <div className="prose prose-slate max-w-none text-slate-600">
      {children}
    </div>
  </div>
);

export const Documentation: React.FC = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Scroll to hash if present
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Project Documentation</h1>
        <p className="mt-4 text-lg text-slate-500">Comprehensive overview of the NeuroFusion System</p>
      </div>

      <Section id="methods" title="Methods & Pipeline">
        <p className="mb-4">The NeuroFusion pipeline consists of four distinct stages designed to maximize diagnostic accuracy:</p>
        <ol className="list-decimal list-inside space-y-4 bg-white p-6 rounded-xl border border-slate-200">
          <li>
            <strong className="text-slate-900">Data Preprocessing:</strong> 
            <ul className="list-disc list-inside ml-6 mt-2 text-sm">
              <li>MRI Scans: Skull stripping, normalization to MNI space, and intensity scaling.</li>
              <li>Clinical Data: Categorical encoding for gender, normalization for Age/MMSE.</li>
            </ul>
          </li>
          <li>
            <strong className="text-slate-900">Feature Extraction:</strong> 
            <ul className="list-disc list-inside ml-6 mt-2 text-sm">
              <li>A 3D Convolutional Neural Network (CNN) extracts spatial features from MRI voxels.</li>
              <li>A Multilayer Perceptron (MLP) processes the tabular clinical vector.</li>
            </ul>
          </li>
          <li>
            <strong className="text-slate-900">Fusion Layer:</strong> 
            <span className="ml-1">The output vectors from the CNN (size 128) and MLP (size 16) are concatenated into a fusion vector (size 144) and passed through a final dense classification block.</span>
          </li>
          <li>
            <strong className="text-slate-900">Prediction & Explainability:</strong> 
            <span className="ml-1">Softmax output provides class probabilities. Grad-CAM is applied to the last convolutional layer to generate heatmaps.</span>
          </li>
        </ol>
      </Section>

      <Section id="architecture" title="Model Architecture">
        <p className="mb-6">The system uses a Hybrid Fusion Architecture. Below is a schematic representation:</p>
        <div className="bg-slate-900 p-8 rounded-xl shadow-lg text-center mb-6">
          <svg viewBox="0 0 800 300" className="w-full h-auto mx-auto">
             {/* Simple SVG Diagram */}
             <rect x="50" y="50" width="100" height="100" rx="8" fill="#3b82f6" opacity="0.8" />
             <text x="100" y="105" textAnchor="middle" fill="white" fontSize="14">3D CNN (MRI)</text>
             
             <rect x="50" y="180" width="100" height="60" rx="8" fill="#0d9488" opacity="0.8" />
             <text x="100" y="215" textAnchor="middle" fill="white" fontSize="14">MLP (Data)</text>
             
             <path d="M150 100 L 250 150" stroke="white" strokeWidth="2" />
             <path d="M150 210 L 250 150" stroke="white" strokeWidth="2" />
             
             <circle cx="280" cy="150" r="30" fill="#a855f7" />
             <text x="280" y="155" textAnchor="middle" fill="white" fontSize="12">Fusion</text>
             
             <path d="M310 150 L 400 150" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
             
             <rect x="400" y="120" width="120" height="60" rx="8" fill="#ef4444" />
             <text x="460" y="155" textAnchor="middle" fill="white" fontSize="14">Classifier</text>

             <defs>
               <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                 <path d="M0,0 L0,6 L9,3 z" fill="white" />
               </marker>
             </defs>
          </svg>
        </div>
        <p>The 3D CNN focuses on structural atrophy in the hippocampus and ventricles, while the tabular network weights the clinical severity scores (CDR/MMSE) heavily.</p>
      </Section>

      <Section id="results" title="Performance Metrics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">96.4%</div>
            <div className="text-xs uppercase text-slate-500 mt-1">Accuracy</div>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg">
             <div className="text-2xl font-bold text-teal-600">94.2%</div>
             <div className="text-xs uppercase text-slate-500 mt-1">Precision</div>
           </div>
           <div className="p-4 bg-indigo-50 rounded-lg">
             <div className="text-2xl font-bold text-indigo-600">95.1%</div>
             <div className="text-xs uppercase text-slate-500 mt-1">Recall</div>
           </div>
           <div className="p-4 bg-purple-50 rounded-lg">
             <div className="text-2xl font-bold text-purple-600">94.8%</div>
             <div className="text-xs uppercase text-slate-500 mt-1">F1 Score</div>
           </div>
        </div>
      </Section>

      <Section id="future" title="Future Work & Engineering Goals">
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white p-6 border border-slate-200 rounded-lg">
             <h3 className="font-bold text-slate-900 mb-2">Phase 2: Longitudinal Analysis</h3>
             <p className="text-sm">incorporating time-series MRI data to track disease progression over years rather than single-point diagnosis.</p>
           </div>
           <div className="bg-white p-6 border border-slate-200 rounded-lg">
             <h3 className="font-bold text-slate-900 mb-2">Phase 3: Federated Learning</h3>
             <p className="text-sm">Deploying the model in a decentralized manner to respect patient privacy (GDPR/HIPAA) by keeping data on local hospital servers.</p>
           </div>
        </div>
      </Section>

      <Section id="conclusion" title="Conclusion">
        <p>
          NeuroFusion demonstrates that multi-modal AI significantly outperforms uni-modal approaches in early Alzheimer's detection. 
          By integrating clinical context with neuroimaging, we reduce false positives and provide interpretable visual evidence for clinicians.
        </p>
      </Section>

    </div>
  );
};