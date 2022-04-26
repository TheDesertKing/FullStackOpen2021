import { useEffect, useState } from "react";
import axios from "axios";
import Display from "./components/Display";

const App = () => {
  const [search, setSearch] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const URL = "https://restcountries.com/v3.1";
  const filtered = countriesData.filter((c) => c.name.common.includes(search));

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios.get(URL + "/all").then((res) => {
      setCountriesData(res.data);
    });
  }, []); // get all countries data ONCE

  return (
    <>
      find countries <input value={search} onChange={handleSearch} />
      <Display
        countriesData={countriesData}
        search={search}
        setSearch={setSearch}
        filtered={filtered}
      />
    </>
  );
};

export default App;
