const ShowButton = ({ countryData, setClicked }) => {
  const handleClick = () => {
    setClicked(countryData);
  };
  return (
    <button key={countryData.name.common + "button"} onClick={handleClick}>
      show
    </button>
  );
};

export default ShowButton;
