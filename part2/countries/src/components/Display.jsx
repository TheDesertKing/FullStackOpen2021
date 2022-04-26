import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";
import ShowButton from "./ShowButton";

const Display = ({ search, filtered }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
  }, [search]);

  if (filtered.length > 10) {
    return <p>Too many matches, specify anoter filter</p>;
  }

  if (filtered.length > 1) {
    let ret = filtered.map((c) => {
      let name = c.name.common;
      return (
        <div key={name + "div"}>
          <p key={name + "p"}>{name}</p>
          <ShowButton
            key={name + "show"}
            countryData={c}
            setClicked={setClicked}
          >
            show
          </ShowButton>
        </div>
      );
    });

    return <>{ret}</>;
  }

  if (clicked) {
    return <CountryInfo countryData={clicked} />;
  }

  if (filtered.length === 1) {
    return <CountryInfo countryData={filtered[0]} />;
  }

  return <p>No countries were found</p>;
};

export default Display;
