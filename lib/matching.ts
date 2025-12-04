import { Employee, SearchWeights } from './types';

/**
 * Calculate match score for an employee based on search weights
 * Formula: MatchScore = Σ(EmployeeSkillValue × UserWeight) / Σ(MaxSkillValue × UserWeight) × 100
 */
export function calculateMatchScore(
  employee: Employee,
  weights: SearchWeights
): number {
  let numerator = 0;
  let denominator = 0;
  const MAX_SKILL_VALUE = 100;

  Object.keys(weights).forEach((skillKey) => {
    const weight = weights[skillKey];
    
    // Skip if weight is 0
    if (weight === 0) return;
    
    const employeeSkillValue = employee.skills[skillKey] || 0;
    
    numerator += employeeSkillValue * weight;
    denominator += MAX_SKILL_VALUE * weight;
  });

  // Avoid division by zero
  if (denominator === 0) return 0;

  return Math.round((numerator / denominator) * 100);
}

/**
 * Sort employees by match score in descending order
 */
export function sortEmployeesByMatch(
  employees: Employee[],
  weights: SearchWeights
): Array<Employee & { matchScore: number }> {
  return employees
    .map((employee) => ({
      ...employee,
      matchScore: calculateMatchScore(employee, weights),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
