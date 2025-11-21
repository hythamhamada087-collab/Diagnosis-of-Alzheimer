import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Database, Network, ChevronRight, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0">
           <img src="https://picsum.photos/seed/neuro/1920/1080" alt="Abstract Brain" className="w-full h-full object-cover opacity-10 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Early Alzheimer's Detection</span>
            <span className="block text-blue-400 mt-2">Powered by Multi-Modal AI</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300">
            NeuroFusion combines 3D MRI imaging analysis with patient clinical records using advanced Fusion Neural Networks to detect Alzheimer's Disease with high precision.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/test" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-blue-500/30 transition-all">
              Start Diagnosis
            </Link>
            <Link to="/methods" className="px-8 py-3 border border-slate-500 text-base font-medium rounded-md text-slate-200 hover:bg-slate-800 md:py-4 md:text-lg md:px-10 transition-all">
              View Methodology
            </Link>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Workflow</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How NeuroFusion Works
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Database className="w-24 h-24 text-blue-600" />
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Data Ingestion</h3>
              <p className="text-slate-600">We accept .nii/.nii.gz MRI scans and tabular clinical data (Age, CDR, MMSE) as input vectors.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Network className="w-24 h-24 text-teal-600" />
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6 text-teal-600">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Fusion Processing</h3>
              <p className="text-slate-600">A 3D CNN analyzes image features while a Neural Network processes clinical markers. A Fusion Layer combines these features.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-purple-600" />
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Diagnosis & Heatmap</h3>
              <p className="text-slate-600">The system outputs a classification (Healthy/AD) and generates a Grad-CAM heatmap to visualize affected brain regions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};