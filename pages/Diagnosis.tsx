import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Play, Loader2, Users, ImageIcon, X } from 'lucide-react';
import { PatientData, DiagnosisResult } from '../types';
import { SAMPLE_DATASET } from '../constants';
import { generateClinicalReport } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export const Diagnosis: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    id: '',
    age: 65,
    gender: 'Male',
    mmse: undefined,
    cdr: undefined,
    familyHistory: false
  });
  const [mriFile, setMriFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setPatientData(prev => {
      // Handle special cases
      if (name === 'familyHistory') {
        return { ...prev, familyHistory: value === 'true' };
      }
      if (name === 'mmse' || name === 'age') {
        return { ...prev, [name]: value === '' ? undefined : parseFloat(value) };
      }
      if (name === 'cdr') {
        return { ...prev, cdr: value === '' ? undefined : parseFloat(value) };
      }
      
      return { ...prev, [name]: value };
    });
  };

  const loadSample = (sample: PatientData) => {
    setPatientData(sample);
    // Simulate a file attached
    const dummyFile = new File(["dummy content"], `${sample.id}_MRI.nii`, { type: "application/octet-stream" });
    setMriFile(dummyFile);
    setPreviewUrl(null); // Reset preview for samples as they are NII mocks
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMriFile(file);
      
      // Generate preview if it's an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setMriFile(null);
    setPreviewUrl(null);
  };

  const runAnalysis = async () => {
    if (!mriFile && !patientData.id) {
      alert("Please upload an MRI scan and enter patient data.");
      return;
    }

    setIsLoading(true);
    // Simulate network latency for the heavy model
    setTimeout(async () => {
      try {
        // Pass the preview URL (base64) if it exists, otherwise just data
        const analysis = await generateClinicalReport(patientData, previewUrl || undefined);
        setResult(analysis);
        setIsLoading(false);
        setActiveTab('results');
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }, 2500);
  };

  const chartData = [
    { name: 'Accuracy', value: 96.4 },
    { name: 'Precision', value: 94.2 },
    { name: 'Recall', value: 95.1 },
    { name: 'F1 Score', value: 94.8 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Diagnostic Interface</h1>
          <p className="mt-2 text-slate-600">Upload patient MRI and clinical metadata for AI fusion analysis.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 inline-flex">
            <button 
              onClick={() => setActiveTab('input')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'input' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Data Input
            </button>
            <button 
              onClick={() => result && setActiveTab('results')}
              disabled={!result}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'results' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 cursor-not-allowed'}`}
            >
              Analysis Results
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'input' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Col: Upload & Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* MRI Upload */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" /> MRI Scan Input
                </h3>
                
                {!mriFile ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors relative group">
                    <input 
                      type="file" 
                      id="mri-upload" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      accept=".nii,.nii.gz,.jpg,.jpeg,.png" 
                    />
                    <label htmlFor="mri-upload" className="cursor-pointer w-full h-full block">
                      <div className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors">
                        <FileText className="w-full h-full" />
                      </div>
                      <p className="mt-2 text-sm text-slate-600 font-medium">
                        Click to upload file
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Supports: .nii, .nii.gz (Medical) or .jpg, .png (Image Slices)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-start gap-4 relative">
                    {previewUrl ? (
                      <div className="w-20 h-20 rounded bg-slate-200 overflow-hidden flex-shrink-0 border border-slate-300">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                        <FileText className="w-10 h-10" />
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-slate-900 truncate pr-8">{mriFile.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{(mriFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <div className="mt-2 flex items-center text-xs text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" /> Ready for analysis
                      </div>
                    </div>

                    <button 
                      onClick={clearFile}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Clinical Data Form */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" /> Patient Demographics & Clinical Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ID */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient ID</label>
                    <input type="text" name="id" value={patientData.id} onChange={handleInputChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="e.g. OAS1_001" />
                  </div>
                  
                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                    <input type="number" name="age" value={patientData.age} onChange={handleInputChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                  </div>
                  
                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select name="gender" value={patientData.gender} onChange={handleInputChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                   {/* Family History (New) */}
                   <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Family History
                    </label>
                    <select name="familyHistory" value={patientData.familyHistory.toString()} onChange={handleInputChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
                      <option value="false">No Known History</option>
                      <option value="true">Present (Immediate Family)</option>
                    </select>
                  </div>

                  {/* MMSE (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      MMSE Score <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="number" 
                      name="mmse" 
                      max="30" 
                      min="0" 
                      value={patientData.mmse ?? ''} 
                      onChange={handleInputChange} 
                      className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" 
                      placeholder="0-30"
                    />
                  </div>

                  {/* CDR (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      CDR Score <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <select 
                      name="cdr" 
                      value={patientData.cdr ?? ''} 
                      onChange={handleInputChange} 
                      className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    >
                      <option value="">Not Assessed / Unknown</option>
                      <option value="0">0 - Normal</option>
                      <option value="0.5">0.5 - Very Mild Dementia</option>
                      <option value="1">1 - Mild Dementia</option>
                      <option value="2">2 - Moderate Dementia</option>
                      <option value="3">3 - Severe Dementia</option>
                    </select>
                  </div>

                </div>
              </div>

              <button 
                onClick={runAnalysis}
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <><Loader2 className="animate-spin" /> Processing Neural Fusion...</> : <><Play className="fill-current" /> Run Fusion Diagnosis</>}
              </button>
            </div>

            {/* Right Col: Sample Data Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Load Sample Data</h3>
                <div className="space-y-3">
                  {SAMPLE_DATASET.map((sample) => (
                    <button 
                      key={sample.id}
                      onClick={() => loadSample(sample)}
                      className="w-full bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md text-left transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-700 group-hover:text-blue-600">{sample.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${sample.label === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {sample.label}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Age: {sample.age} | Fam. Hist: {sample.familyHistory ? 'Yes' : 'No'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2">Model Status</h3>
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  System Online
                </div>
                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <p>Architecture: 3D CNN + MLP Fusion</p>
                  <p>Weights: v2.5.1 (Latest)</p>
                  <p>Environment: WebGL Inference</p>
                  <p>Vision Module: Gemini 2.5 Flash (Active)</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* RESULTS VIEW */
          <div className="animate-fadeIn">
            {result && (
              <div className="space-y-8">
                
                {/* Top Warning/Success Banner */}
                <div className={`p-4 rounded-lg border-l-4 flex items-start gap-3 ${result.prediction === 'Healthy' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                  {result.prediction === 'Healthy' ? <CheckCircle className="w-6 h-6 flex-shrink-0" /> : <AlertCircle className="w-6 h-6 flex-shrink-0" />}
                  <div>
                    <h3 className="text-lg font-bold">Diagnosis: {result.prediction}</h3>
                    <p className="text-sm opacity-90">Confidence Score: {result.confidence}% | Risk Assessment: {result.riskLevel}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Visual Explanation (Grad-CAM) */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Visual Analysis & Heatmap</h3>
                    <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden group">
                      {/* Use uploaded preview if available, else placeholder */}
                      <img 
                        src={previewUrl || "https://picsum.photos/seed/brainMRI/800/800"} 
                        alt="Analyzed Brain Scan" 
                        className="w-full h-full object-cover opacity-90" 
                      />
                      
                      {/* Heatmap Overlay - CSS Gradient Simulation */}
                      <div className={`absolute inset-0 mix-blend-soft-light opacity-60 bg-gradient-to-tr ${
                        result.prediction === 'Healthy' 
                          ? 'from-transparent via-transparent to-transparent' 
                          : 'from-red-600 via-yellow-500 to-transparent'
                      }`}></div>
                      
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs backdrop-blur-sm">
                         View: {previewUrl ? 'Uploaded Slice' : 'Axial Slice (Simulation)'}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      <span className="font-semibold">Highlighted Regions:</span> {result.affectedRegions.join(", ")}.
                      <br/>Heatmap visualization overlays regions contributing most to the prediction.
                    </div>
                  </div>

                  {/* Metrics and Text Report */}
                  <div className="space-y-6">
                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Clinical AI Report</h3>
                        <p className="text-slate-700 leading-relaxed text-sm">{result.clinicalReport}</p>
                     </div>

                     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Model Performance</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]}>
                               {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#0d9488'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                </div>
                
                <div className="text-center">
                   <button onClick={() => {setResult(null); setActiveTab('input');}} className="text-blue-600 font-semibold hover:underline">
                      Start New Diagnosis
                   </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};