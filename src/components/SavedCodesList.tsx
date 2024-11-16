import React from 'react';
import { Trash2 } from 'lucide-react';

interface SavedCode {
  id: string;
  title: string;
  code: string;
  createdAt: Date;
}

interface SavedCodesListProps {
  codes: SavedCode[];
  onLoad: (code: string) => void;
  onDelete: (id: string) => void;
}

const SavedCodesList: React.FC<SavedCodesListProps> = ({ codes, onLoad, onDelete }) => {
  return (
    <div className="border-l border-gray-200 w-64 bg-white overflow-y-auto h-[calc(100vh-3rem)]">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Saved Codes</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {codes.length === 0 ? (
          <p className="p-4 text-gray-500 text-sm">No saved codes yet</p>
        ) : (
          codes.map((code) => (
            <div key={code.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{code.title}</h3>
                <button
                  onClick={() => onDelete(code.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {code.createdAt.toLocaleDateString()}
              </p>
              <button
                onClick={() => onLoad(code.code)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Load code
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedCodesList;