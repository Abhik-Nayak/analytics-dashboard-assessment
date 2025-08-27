// src/types/EVData.ts
export interface EVData {
  Make: string;
  Model: string;
  State: string;
  City?: string;
  "Model Year": number;
  "Electric Range": number; // numeric
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
