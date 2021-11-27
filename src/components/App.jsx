import './App.scss';
import {BrowserRouter} from "react-router-dom";
import Router from "./Router/Router";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Router/>
      </div>
    </BrowserRouter>
  );
}

export default App;
