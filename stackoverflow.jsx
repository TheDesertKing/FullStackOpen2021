const Display = ({ search }) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (clicked) {
    if (isLoading) {
      return <p>blah</p>;
    } else {
      return <p>blalalah</p>;
    }
  }
};
