import axios from "axios";
import React, { useEffect, useState } from "react";

const backendUrl = "http://127.0.0.1:5050/strains/pagination/"

const get_percent = (text: string): number => {
  const extracted_number = text.split(" ")[1].replace("%", "");
  // const number = text.slice(4, text.indexOf('%'));
  return parseFloat(extracted_number)
}

const FetchStrains = (
  setStrains: React.Dispatch<React.SetStateAction<any[]>>
) => {
  
  useEffect(() => {
    const fetchBackendData = async () =>{
      try {
        const response = await axios.get(backendUrl);
        console.log("status:", response.status);
        console.log("Response data:", response.data);
        
        const strainsData = response.data || [];
        setStrains(strainsData.data.slice(0, 30));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBackendData()
  }, [setStrains]);

  // try {
  //   const response = await axios.get(url);
  //   const status = response.status;
  //   console.log(status)
  //   
  //   const data = response.data
  //   console.log(data)

  //   setStrains(data.data.slice(0, 10)); // Store first 10 strains
  //
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  // }
}

export default FetchStrains;
