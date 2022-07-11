import React, { useState } from "react";
import AboutMe from "../../components/AboutMe";
import Filter from "../../components/Filter";
import "./styles.scss";

interface Props {
  toggleFeatured: Function;
  toggleRemote: Function;
  searchChange: Function;
}

const Header = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");

  const searchInputChangeHandler = (event: any) => {
    const newInput = event.target.value.trim().toLowerCase();
    setSearchText(newInput);
    console.log(newInput);
    props.searchChange(newInput);
  };

  return (
    <div className="header">
      <div className="header__row header__row--main">
        <h1 className="header__title">Buycoins jobs</h1>
        <input
          type="text"
          placeholder="Search jobs by title, location, company or tag"
          className="header__search-bar"
          value={searchText}
          onChange={searchInputChangeHandler}
        />
      </div>
      <div className="header__row header__filters">
        <h3 className="header__filters--title">Filters: </h3>
        <Filter name="Featured" onChange={props.toggleFeatured} />
        <Filter name="Remote" onChange={props.toggleRemote} />
      </div>
      <AboutMe />
    </div>
  );
};
export default Header;
