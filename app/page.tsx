"use client"

import { useState, useMemo } from 'react';
import SearchSidebar from '@/components/SearchSidebar';
import EmployeeCard from '@/components/EmployeeCard';
import { SKILLS, EMPLOYEES } from '@/lib/data';
import { SearchWeights } from '@/lib/types';
import { sortEmployeesByMatch } from '@/lib/matching';

export default function Home() {
  const [weights, setWeights] = useState<SearchWeights>(() => {
    const initial: SearchWeights = {};
    SKILLS.forEach(skill => {
      initial[skill.key] = 0;
    });
    return initial;
  });

  const handleWeightChange = (skillKey: string, value: number) => {
    setWeights(prev => ({
      ...prev,
      [skillKey]: value,
    }));
  };

  const sortedEmployees = useMemo(() => {
    return sortEmployeesByMatch(EMPLOYEES, weights);
  }, [weights]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-96 flex-shrink-0 overflow-y-auto">
        <SearchSidebar
          skills={SKILLS}
          weights={weights}
          onWeightChange={handleWeightChange}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              社員スキル検索・マッチングシステム
            </h1>
            <p className="text-gray-600">
              {sortedEmployees.length}名の社員が見つかりました
            </p>
          </div>

          <div className="space-y-4">
            {sortedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                matchScore={employee.matchScore}
                skills={SKILLS}
                searchWeights={weights}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
