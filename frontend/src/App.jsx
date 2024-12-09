import './App.css';
import StrainTable from './StrainTable';
import TailwindStylesOverview from './TailwindStyles';
import FetchApiData from './FetchApiData.jsx'

// const backendUrl = "http://127.0.0.1:8000/strains/"
// const backendSearchUrl = 'http://127.0.0.1:8000/strains/search/?target=Widow';
// const pagUrl = 'http://127.0.0.1:8000/strains/pagination';

const sampleData = [
  {
    Name: "Sour Diesel",
    Type: "Sativa",
    "THC%": "THC 19%",
    Rating: "4.3",
  },
  {
    Name: "White Widow",
    Type: "Hybrid",
    "THC%": "THC 15%",
    Rating: "4.1",
  },
  {
    Name: "Blue Dream",
    Type: "Hybrid",
    "THC%": "THC 18%",
    Rating: "4.5",
  },
];

const App = () => {
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  //
  // const fetchApiData = async (url) => {
  //   try {
  //     const response = await axios.get(url);
  //     setData(response.data);
  //   } catch (err) {
  //     setError('Error fetching data from backend');
  //     console.error('Error fetching data:', err);
  //   }
  // };
  // 
  // useEffect(() => {
  //   fetchApiData(pagUrl);
  // }, []);
  // 
  // console.log(data)
  const data = FetchApiData();
  console.log("Data fetched:", data)
  return (
    <div>
      <h1>The Cannabis Directory</h1>
      {/* error && <p>{error}</p> */}
      <TailwindStylesOverview>
        <StrainTable data={sampleData}></StrainTable>
      </TailwindStylesOverview>
    </div>
  );
};
// <pre>{JSON.stringify(data, null, 2)}</pre>

export default App;
