import React from 'react';
import { SAMPLE_DATASET } from '../constants';

export const DatasetView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Available Datasets</h1>
      <p className="text-slate-600 mb-8 max-w-3xl">
        The model was trained on the OASIS (Open Access Series of Imaging Studies) dataset. 
        Below is the embedded validation set used for real-time browser inference testing.
      </p>
      
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Family History</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">MMSE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CDR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Label</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {SAMPLE_DATASET.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{patient.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {patient.familyHistory ? <span className="text-red-500 font-medium">Yes</span> : <span className="text-slate-400">No</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{patient.mmse !== undefined ? patient.mmse : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{patient.cdr !== undefined ? patient.cdr : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.label === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {patient.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};