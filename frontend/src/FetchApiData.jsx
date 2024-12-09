import { useEffect, useState } from 'react';
import axios from 'axios';
import StrainTable from './StrainTable';
import _ from 'lodash';

// const backendUrl = "http://127.0.0.1:8000/strains/"
const backendSearchUrl = 'http://127.0.0.1:9000/strains/search/?target=Widow';
// const pagUrl = 'http://127.0.0.1:8000/strains/pagination';

const getFields = (data) => {
  const fields = ['Name', 'Type', 'THC%', 'Rating'];
  return data.map((obj) => _.pick(obj, fields));
};

const FetchApiData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchApiData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError('Error fetching data from backend');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchApiData(backendSearchUrl);
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }
  console.log("Data received from API:", data)
  const filteredData = getFields(data)
  return (
    <div>
      <h1>The Cannabis Directory</h1>
      <StrainTable data={filteredData} />
    </div>
  );

}

export default FetchApiData;
