"use client"

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Employee, SearchWeights, Skill } from '@/lib/types';

interface SkillRadarChartProps {
  employee: Employee;
  skills: Skill[];
  searchWeights?: SearchWeights;
}

export default function SkillRadarChart({ employee, skills, searchWeights }: SkillRadarChartProps) {
  const data = skills.map((skill) => ({
    skill: skill.label,
    value: employee.skills[skill.key] || 0,
    required: searchWeights?.[skill.key] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fontSize: 11 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fontSize: 10 }}
        />
        <Radar
          name="保有スキル"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.5}
        />
        {searchWeights && (
          <Radar
            name="要求レベル"
            dataKey="required"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.2}
          />
        )}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
