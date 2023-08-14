import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key={'general'} pageSize={15} />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key={'business'} category={'business'} />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key={'entertainment'} category={'entertainment'} />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key={'health'} category={'health'} />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key={'science'} category={'science'} />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key={'sports'} category={'sports'} />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key={'technology'} category={'technology'} />}></Route>
          </Routes>
        </Router>
      </>
    )
}
