export interface OrganicRemedy {
  name: string;
  dosage: string;
  applicationMethod: string;
  frequency: string;
  scientificRationale: string;
}

export interface ChemicalRemedy {
  name: string;
  dosage: string;
  safetyWaitingPeriod: string;
  applicationSafety: string;
  expertGuideline: string;
}

export interface FertilizerAdvisory {
  organicFertilizer: string;
  applicationSchedule: string;
  soilImmunityBooster: string;
}

export interface ResearchCitation {
  title: string;
  uri: string;
}

export interface DiagnosisReport {
  conditionName: string;
  category: string;
  pathogenOrCause: string;
  confidenceScore: number;
  severityLevel: 'Low' | 'Moderate' | 'Severe' | 'Healthy Baseline';
  visualEvidence: string[];
  diseaseOverview: string;
  immediateActionPlan: string;
  organicRemedies: OrganicRemedy[];
  chemicalRemedies: ChemicalRemedy[];
  fertilizerAndNutritionAdvisory: FertilizerAdvisory;
  culturalAndPreventivePractices: string[];
  expertSummary: string;
}

export interface DiagnosticResponse {
  success: boolean;
  report: DiagnosisReport;
  rawText?: string;
  researchCitations: ResearchCitation[];
  timestamp: string;
  source?: string;
  studentProjectInfo: {
    studentName: string;
    rollNo: string;
    institution: string;
    affiliation: string;
    guide: string;
  };
}

export interface WeatherData {
  location: string;
  coordinates: { lat: number; lon: number };
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
  };
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    weather_code?: number[];
  };
  agronomicEvaluation: {
    plantingSuitability: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
    plantingReason: string;
    diseaseVulnerabilityAlert: string;
    optimalSeason: string;
    soilTemperatureRecommendation: string;
    nextInspectionReminderDays: number;
  };
}

export interface InspectionRecord {
  id: string;
  dayNumber: number;
  date: string;
  imageThumbnail: string;
  conditionName: string;
  healthStatus: 'Healthy' | 'Diseased' | 'Recovering';
  confidenceScore: number;
  remedyApplied: string;
  notes: string;
}

export interface CropBatch {
  id: string;
  batchName: string;
  variety: string;
  plantingDate: string;
  location: string;
  totalCycleDays: number;
  currentDay: number;
  nextInspectionDate: string;
  daysUntilNextInspection: number;
  inspections: InspectionRecord[];
}
