import Avengers from "../images/Avengers.png";
import AvengersLogo from "../images/Avengers-logo.png";
import "../styles/about-comics.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "../constants";

const AboutComics = () => {
  const aboutComics = window.location.pathname;
  const url = `${baseUrl}${aboutComics}?apikey=51f502f53348b5a218887333707c8a5b`;
  const dispatch = useDispatch();
  const comics = useSelector((state) => state.comicsInfo);
  const comicsApi = async () => {
    const response = await fetch(url);
    const comicsApi = await response.json();
    dispatch({
      type: "GET_COMICS_INFO",
      payload: comicsApi.data.results[0],
    });
  };
  useEffect(() => {
    comicsApi();
  }, []);
  if (!comics) {
    return <p>ddd</p>;
  }
  return (
    <>
      <div className="about-block">
        <div className="about-first-block">
          <img src={Avengers} alt="error" />
          <p className="about-first-block-text">
            New comics every week! <br /> Stay tuned!
          </p>
        </div>
        <div className="about-second-block">
          <img src={AvengersLogo} alt="error" />
        </div>
      </div>
      <div className="comics-block">
        <div className="first-wrapper">
          <img
            src={`${comics.thumbnail?.path}.${comics.thumbnail?.extension}`}
            alt=""
            className="comics-img"
          />
          <div className="comics-info">
            <p className="comics-info-title">{comics.title}</p>
            <p className="comics-info-pages">{`${comics.pageCount} pages`}</p>
            <p className="comics-info-lang">{`Language: ${comics.textObjects[0].language}`}</p>
            <p className="comics-info-price">{`${comics.prices[0].price}$`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutComics;
