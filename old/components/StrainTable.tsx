import { useEffect, useRef } from "react";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Tabulator } from "tabulator-tables";
import "./StrainTable.css"

const get_percent = (text: string): number => {
  const extracted_number = text.split(" ")[1].replace("%", "");
  return parseFloat(extracted_number)
}

interface Strain {
  Name: string;
  Type: string;
  Alias: string;
  Rating: number;
  Num_Reviews: number;
  THC: string;
  Other_Cannabinoids: string;
  Main_Effect: string;
  Terpene: string;
}

interface StrainTableProps {
  strains: Strain[];
}

const StrainTable: React.FC<StrainTableProps> = ({ strains }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const processedStrains = strains.map((strain) => ({
    ...strain,
    THC: strain.THC ? get_percent(strain.THC) : strain.THC,
  })).
  sort((a, b) => a.Name.localeCompare(b.Name));
  
  useEffect(() => {
    if (tableRef.current) {
      new Tabulator(tableRef.current, {
        data: processedStrains, // The data to display in the table
        layout: "fitColumns", // Automatically adjust column width to fit content
        height: "500px",
        columns: [
          { title: "Name", field: "Name", width: 200 },
          { title: "Type", field: "Type", width: 100 },
          { title: "Alias", field: "Alias", width: 200 },
          { title: "Rating", field: "Rating", width: 100 },
          { title: "Reviews", field: "Num_Reviews", width: 120 },
          { 
            title: "THC", 
            field: "THC", 
            width: 100,
            // mutator: (value: string | null | undefined) => value ? get_percent(value) : 0, // Handle null/undefined values
            formatter: "plaintext",
            // mutator: (value: string) => get_percent(value),
          },
          { 
            title: "Other Cannabinoids", 
            field: "Other_Cannabinoids", 
            width: 100,
            // mutator: (value: string | null | undefined) => value ? get_percent(value) : 0, // Handle null/undefined values
            formatter: "plaintext",
            // mutator: (value: string) => get_percent(value),
          },
          { title: "Main Effect", field: "Main_Effect", width: 150 },
          { title: "Terpene", field: "Terpene", width: 150 },
        ],
        pagination: true,
        paginationSize: 20, // Display 20 rows per page

      });
    }
  }, [strains]) // Re-run when `strains` data changes

  return <div id="strain-table" ref={tableRef}></div>;
};

export default StrainTable;
