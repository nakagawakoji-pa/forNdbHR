"use client"

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Skill, SearchWeights } from '@/lib/types';
import { Search } from 'lucide-react';

interface SearchSidebarProps {
  skills: Skill[];
  weights: SearchWeights;
  onWeightChange: (skillKey: string, value: number) => void;
}

export default function SearchSidebar({ skills, weights, onWeightChange }: SearchSidebarProps) {
  return (
    <div className="h-full bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">スキル検索</h2>
        <p className="text-sm text-gray-600">必要なスキルの重要度を設定してください</p>
      </div>

      <div className="p-6">
        {/* Natural Language Search Area (Phase 1: Mock) */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Search size={16} className="inline mr-2" />
            自然言語検索 (Phase 2実装予定)
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="例: IOWN APNに関わるPMを探している"
            disabled
          />
          <p className="text-xs text-gray-500 mt-2">
            ※Phase 2でOpenAI API等を使用して文章からスキルを自動抽出予定
          </p>
        </div>

        {/* Skill Weight Sliders */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">必要スキル・重み付け</h3>
          
          {skills.map((skill) => (
            <div key={skill.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  {skill.label}
                </label>
                <span className="text-sm font-bold text-blue-600 min-w-[3rem] text-right">
                  {weights[skill.key] || 0}
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={weights[skill.key] || 0}
                onValueChange={(value) => onWeightChange(skill.key, value)}
              />
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              skills.forEach((skill) => onWeightChange(skill.key, 0));
            }}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-medium transition-colors"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}
