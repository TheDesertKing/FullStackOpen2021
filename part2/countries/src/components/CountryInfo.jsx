import Weather from "./Weather";
const CountryInfo = ({ countryData }) => {
  return (
    <>
      <h1>{countryData.name.common}</h1>
      <p>capital {countryData.capital[0]}</p>
      <p>area {countryData.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(countryData.languages).map((lang) => (
          <li key={countryData.name.common + lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={Object.values(countryData.flags)[0]}
        alt={"flag of " + countryData.name.common}
      />
      <Weather countryData={countryData} />
    </>
  );
};

export default CountryInfo;
