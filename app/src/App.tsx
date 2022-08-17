import React                                    from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home                                     from "./pages/Home/Home";
import Images                                   from './pages/Images/Images';
import Header                                   from "./components/Header";
import BuildImage                               from "./pages/Images/BuildImage";

function App() {
  let year = new Date(Date.now()).getFullYear();

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/images" element={<Images/>}/>
          <Route path="/images/build" element={<BuildImage />}/>
        </Routes>
      </Router>
      <footer className={"bg-emerald-900 text-white"}>
        <div className={"text-center p-4"}>
          <p className={"text-whitehite"}>
            Coded with &#10084;&#65039; by IakMastro &copy; <span>{year}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
