import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} NeuroFusion Research Group. All rights reserved.
            </p>
            <p className="text-slate-400 text-xs mt-1">
              For research purposes only. Not FDA approved for clinical diagnosis.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-slate-400 hover:text-slate-500 text-sm">Contact</Link>
            <Link to="/methods" className="text-slate-400 hover:text-slate-500 text-sm">Privacy</Link>
            <a href="#" className="text-slate-400 hover:text-slate-500 text-sm">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};