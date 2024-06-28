import { CropData } from "../CropDto/CropDto";

export const transformData = (data: any[]): CropData[] => {
    return data.map(item => ({
      country: item["Country"],
      year: item["Year"],
      cropName: item["Crop Name"],
      cropProduction: item["Crop Production (UOM:t(Tonnes))"] || 0, // Default to 0 if empty
      yieldOfCrops: item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0, // Default to 0 if empty
      areaUnderCultivation: item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0 // Default to 0 if empty
    }));
  };
  
  // Function to calculate maximum and minimum production per year
  export const getMaxMinProductionPerYear = (data: CropData[]) => {
    const result: { [year: string]: { max: string; min: string } } = {};
    
    data.forEach((item) => {
      const year = item.year;
      if (!result[year]) {
        result[year] = { max: item.cropName, min: item.cropName };
      }
  
      const maxCrop = data.find(c => c.cropName === result[year].max && c.year === year);
      const minCrop = data.find(c => c.cropName === result[year].min && c.year === year);
  
      if (item.cropProduction > (maxCrop?.cropProduction ?? 0)) {
        result[year].max = item.cropName;
      }
      if (item.cropProduction < (minCrop?.cropProduction ?? Infinity)) {
        result[year].min = item.cropName;
      }
    });
  
    return result;
  };
  
  // Function to calculate average yield and area for each crop
  export const getAverageYieldAndArea = (data: CropData[]) => {
    const result: { [crop: string]: { yield: number; area: number } } = {};
    const count: { [crop: string]: number } = {};
  
    data.forEach((item) => {
      if (!result[item.cropName]) {
        result[item.cropName] = { yield: 0, area: 0 };
        count[item.cropName] = 0;
      }
      result[item.cropName].yield += item.yieldOfCrops;
      result[item.cropName].area += item.areaUnderCultivation;
      count[item.cropName]++;
    });
  
    Object.keys(result).forEach((crop) => {
      result[crop].yield /= count[crop];
      result[crop].area /= count[crop];
    });
  
    return result;
  };
  