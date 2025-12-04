"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Employee, SearchWeights, Skill } from '@/lib/types';
import SkillRadarChart from './SkillRadarChart';
import { User } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  matchScore: number;
  skills: Skill[];
  searchWeights: SearchWeights;
}

export default function EmployeeCard({ employee, matchScore, skills, searchWeights }: EmployeeCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
              {employee.avatarUrl ? (
                <img src={employee.avatarUrl} alt={employee.name} className="w-full h-full rounded-full" />
              ) : (
                <User size={24} />
              )}
            </div>
            <div>
              <CardTitle className="text-xl">{employee.name}</CardTitle>
              <CardDescription className="text-sm">
                {employee.department} · {employee.role}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{matchScore}%</div>
            <div className="text-xs text-gray-500">マッチ度</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{employee.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">スキルバランス</h4>
          <SkillRadarChart 
            employee={employee} 
            skills={skills}
            searchWeights={searchWeights}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const skillValue = employee.skills[skill.key];
            if (!skillValue || skillValue < 30) return null;
            return (
              <span
                key={skill.key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill.label}: {skillValue}
              </span>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
