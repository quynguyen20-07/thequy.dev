/**
 * Helper functions for About page data processing
 */

type SkillKey =
  | "languages"
  | "backend"
  | "frontend"
  | "databases"
  | "devops"
  | "tools";

const SKILL_KEY_MAP: Record<string, SkillKey> = {
  Languages: "languages",
  "Backend Frameworks": "backend",
  Frontend: "frontend",
  Databases: "databases",
  "DevOps & Cloud": "devops",
  "Tools & Methods": "tools",
};

/**
 * Merge API data with fallback defaults
 * Returns API data if available, otherwise returns defaults
 */
export const getHighlightsData = (
  apiData: any[] | undefined,
  defaultData: any[],
) => {
  return apiData && apiData.length > 0 ? apiData : defaultData;
};

export const getEducationData = (
  apiData: any[] | undefined,
  defaultData: any[],
) => {
  return apiData && apiData.length > 0 ? apiData : defaultData;
};

/**
 * Check if all required data is loaded
 */
export const isAboutPageLoading = (loadingStates: {
  experiences: boolean;
  skills: boolean;
  highlights: boolean;
  education: boolean;
  skillsData: any;
}): boolean => {
  return (
    loadingStates.experiences ||
    loadingStates.skills ||
    loadingStates.highlights ||
    loadingStates.education ||
    !loadingStates.skillsData
  );
};

/**
 * Format skills data with default structure
 */
export const getSkillsData = (apiData: any | undefined) => {
  return (
    apiData || {
      languages: [],
      backend: [],
      frontend: [],
      databases: [],
      devops: [],
      tools: [],
    }
  );
};

/**
 * Format experiences data as array
 */
export const getExperiencesData = (apiData: any): any[] => {
  return Array.isArray(apiData) ? apiData : [];
};

/**
 * Get skill items by category label
 */
export const getSkillsByCategory = (
  skillsData: any,
  categoryLabel: string,
): string[] => {
  const key = SKILL_KEY_MAP[categoryLabel] || categoryLabel.toLowerCase();
  return skillsData[key] || [];
};

/**
 * Format experience date range (e.g., "Mar 2025 - Present" or "Jun 2024 - Oct 2025")
 */
export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date | null,
): string => {
  const formatMonth = (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const start = formatMonth(startDate);
  const end = endDate ? formatMonth(endDate) : "Present";
  return `${start} - ${end}`;
};
