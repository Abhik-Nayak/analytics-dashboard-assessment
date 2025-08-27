// src/types/EVData.ts
export interface EVData {
  Make: string;
  Model: string;
  State: string;
  City?: string;
  "Model Year": number;
  "Electric Range": number; // numeric
  [key: string]: any;
}
