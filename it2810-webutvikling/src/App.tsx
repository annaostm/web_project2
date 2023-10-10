import React, { useContext, useState } from "react";
import "./App.css";
import logo from "./imgs/gitlab.svg";
import ThemeProvider, { ThemeContext } from "./darkmode/ThemeProvider";
import Button from "./darkmode/DarkmodeButton";
import Input from "./components/input/input";

const App: React.FC = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div className={dark ? "content-dark" : "content"}>
      <ThemeProvider>
        <header className="App-header">
          <div className="grid">
            <div className="header">
              <img id="logo" src={logo} width={"200px"} />
              <p id="header-logo">Search for repository</p>
            </div>
            <Button />
            <Input />
          </div>
        </header>
      </ThemeProvider>
    </div>
  );
};

export default App;
