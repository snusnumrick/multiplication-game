import React from 'react';
import type { Translation } from '../../translations';

interface TableSelectionUIProps {
  t: Translation;
  onTableSelect: (table: number) => void;
  playSound?: (sound: string) => void;
}

export const TableSelectionUI: React.FC<TableSelectionUIProps> = ({ t, onTableSelect, playSound }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.selectTable}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
          <button
            key={table}
            onClick={() => {
              onTableSelect(table);
              playSound?.('click');
            }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl font-bold py-8 px-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {table}{t.tableButtonSuffix}
          </button>
        ))}
      </div>
    </div>
  );
};
