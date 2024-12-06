import { useState } from "react";
import FetchStrains from "./utils/FetchBackendData";
import StrainTable from "./components/StrainTable";
import SortButton from "./components/SortButton";

const backendUrl = "http://127.0.0.1:5050/strains/pagination/"

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

const toggleSortOrder = () => {

}

const App: React.FC = () => {
  // Setting the state to store fetched data
  const [strains, setStrains] = useState<Strain[]>([]);

  // TODO: Replace with file read function
  FetchStrains(setStrains);

  return (
    <div>
      <center><h1>Cannabis Strains</h1></center>
      <center><StrainTable strains={strains} /></center>
    </div>
  );
};

export default App;
