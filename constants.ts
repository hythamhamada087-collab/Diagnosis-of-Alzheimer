import { PatientData } from './types';

export const SAMPLE_DATASET: PatientData[] = [
  { id: "OAS1_0011", age: 52, gender: "Female", mmse: 30, cdr: 0, familyHistory: false, label: "Healthy" },
  { id: "OAS1_0023", age: 68, gender: "Male", mmse: 22, cdr: 1, familyHistory: true, label: "Alzheimer" },
  { id: "OAS1_0045", age: 75, gender: "Female", mmse: 18, cdr: 2, familyHistory: true, label: "Alzheimer" },
  { id: "OAS1_0102", age: 62, gender: "Male", mmse: 28, cdr: 0.5, familyHistory: true, label: "Mild Cognitive Impairment" }
];

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Diagnosis & Test", path: "/test" },
  { name: "Datasets", path: "/dataset" },
  { name: "Methods & Architecture", path: "/methods" },
  { name: "Research & Future", path: "/research" },
  { name: "About", path: "/about" },
];