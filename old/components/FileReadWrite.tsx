import React, { useState } from "react";
import Papa from "papaparse"

const filePath = "../data/strains_cleaned.csv";

interface DataObject {
  [key: string]: string; // Dynamic keys
}

const CsvReaderWriter: React.FC = () => {
  // Array of DataObject, with ([]) being the initial value to be filled with objects
  const [data, setData] = useState<DataObject[]>([]);
  
  // File input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];  // Get selected file
    if (!file) return;
    
    // Parse file
    Papa.parse(file, {

    })
  }

  // const data = Papa.parse(filePath);
}
