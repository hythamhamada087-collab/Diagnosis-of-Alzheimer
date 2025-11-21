export interface PatientData {
  id: string;
  age: number;
  gender: 'Male' | 'Female';
  mmse?: number; // Mini-Mental State Examination (0-30) - Now Optional
  cdr?: number;  // Clinical Dementia Rating (0, 0.5, 1, 2, 3) - Now Optional
  familyHistory: boolean; // New field
  label?: 'Healthy' | 'Alzheimer' | 'Mild Cognitive Impairment';
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface DiagnosisResult {
  prediction: string;
  confidence: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  clinicalReport: string;
  affectedRegions: string[];
}