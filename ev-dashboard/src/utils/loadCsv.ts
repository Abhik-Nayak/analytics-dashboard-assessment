import Papa from "papaparse";

export interface EVData {
  Make: string;
  Model: string;
  State: string;
  City: string;
  "Model Year": number;
  "Electric Range": number;
  "Vehicle Type": string;
}

export const loadCSV = async (path: string): Promise<EVData[]> => {
  const response = await fetch(path);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data as EVData[]),
      error: (error: any) => reject(error),
    });
  });
};
