import React, { useState } from "react";
import AboutMe from "./components/AboutMe";
import Header from "./containers/Header/Header";
import JobPosts from "./containers/JobPosts";

function App() {
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const toggleFeatured = () => setFeaturedOnly((old) => !old);
  const toggleRemote = () => setRemoteOnly((old) => !old);
  const searchInputHandler = (input: string) => {
    setSearchText(input);
  };

  return (
    <div className="App">
      <Header
        toggleFeatured={toggleFeatured}
        toggleRemote={toggleRemote}
        searchChange={searchInputHandler}
      />
      <JobPosts
        remoteOnly={remoteOnly}
        featuredOnly={featuredOnly}
        searchText={searchText}
      />
      <AboutMe />
    </div>
  );
}

export default App;
