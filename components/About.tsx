import React from 'react';
import { Mail, MapPin, Github } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="md:flex">
          <div className="p-8 md:p-12 md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">About NeuroFusion</h2>
            <p className="text-slate-600 mb-6">
              We are a team of AI researchers and medical data scientists dedicated to solving the challenge of early neurodegenerative disease detection.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                <span>AI Medical Lab, Tech University</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Mail className="w-5 h-5 mr-3 text-blue-600" />
                <span>contact@neurofusion.ai</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Github className="w-5 h-5 mr-3 text-blue-600" />
                <span>github.com/neurofusion</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 md:w-1/2 p-8 md:p-12 flex items-center justify-center">
             <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engineering Goals</h3>
                <ul className="text-left space-y-2 text-slate-600 text-sm">
                   <li>• Reduce inference time to &lt; 500ms</li>
                   <li>• Achieve 99% Recall for early-stage cases</li>
                   <li>• Implement fully homomorphic encryption</li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};