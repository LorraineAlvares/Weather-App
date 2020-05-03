import React from "react";
import Forecast from "./components/Forecast/Forecast";
import Logo from "./components/Logo/Logo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>Weather Forecast</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <footer>Page created by Lorraine Alvares</footer>
    </div>
  );
}

export default App;
