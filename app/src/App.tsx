import React                                    from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home                                     from "./pages/Home/Home";
import Images                                   from './pages/Images/Images';
import Header                                   from "./components/Header";
import BuildImage                               from "./pages/Images/BuildImage";

function App() {
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
      <footer style={{marginTop: "1rem"}}>
        <p>Coded with &#10084;&#65039; by IakMastro &copy; 2022</p>
      </footer>
    </div>
  );
}

export default App;
