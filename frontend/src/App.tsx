import axios from "axios";
import { useEffect, useState } from "react";
import FetchStrains from "./FetchBackendData";
import StrainTable from "./StrainTable";

const backendUrl = "http://127.0.0.1:5050/strains/pagination/"

const get_percent = (text: string): number => {
  const extracted_number = text.split(" ")[1].replace("%", "");
  // const number = text.slice(4, text.indexOf('%'));
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

const App: React.FC = () => {
  // Setting the state to store fetched data
  const [strains, setStrains] = useState<Strain[]>([]);

  FetchStrains(setStrains);

  // Fetch fata when component mounts
  // useEffect(() => {
    // const fetchBackendData = async (url: string) => {
    //   try {
    //     const response = await axios.get(url);
    //     const status = response.status;
    //     console.log(status)
    //     const data = response.data
    //     console.log(data)
    //   
    //     setStrains(data.data.slice(0, 10)); // Store first 10 strains
    //
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchBackendData(backendUrl);
  // }, []);

  return (
    <div>
      <h1>Cannabis Strains</h1>
      <StrainTable strains={strains} />
    </div>
  );
};

// <pre>{JSON.stringify(strains, null, 2)}</pre>

export default App;
