import { useEffect, useRef } from "react";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Tabulator } from "tabulator-tables";
import "./StrainTable.css"

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

  useEffect(() => {
    if (tableRef.current) {
      new Tabulator(tableRef.current, {
        data: strains, // The data to display in the table
        layout: "fitColumns", // Automatically adjust column width to fit content
        columns: [
          { title: "Name", field: "Name", width: 200 },
          { title: "Type", field: "Type", width: 100 },
          { title: "Alias", field: "Alias", width: 150 },
          { title: "Rating", field: "Rating", width: 100 },
          { title: "Reviews", field: "Num_Reviews", width: 120 },
          { title: "THC", field: "THC", width: 120 },
          { title: "Other Cannabinoids", field: "Other_Cannabinoids", width: 150 },
          { title: "Main Effect", field: "Main_Effect", width: 150 },
          { title: "Terpene", field: "Terpene", width: 150 },
        ],
        pagination: true,
        paginationSize: 10, // Display 10 rows per page
      });
    }
  }, [strains]) // Re-run when `strains` data changes

  return <div id="strain-table" ref={tableRef}></div>;
};

export default StrainTable;
