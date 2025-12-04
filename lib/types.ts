export interface Skill {
  key: string;       // ex: 'iown', 'pm'
  label: string;     // ex: 'IOWN APN', 'プロジェクトマネジメント'
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  description: string;
  avatarUrl?: string;
  skills: {
    [key: string]: number; // keyはSkillのkeyと対応, 値は0-100
  };
}

export interface SearchWeights {
  [key: string]: number; // 0-100
}
