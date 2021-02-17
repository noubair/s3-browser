import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { sendMsg } from "./api";
import BucketsList from "./components/BucketsList/BucketsList";
import Wrapper from "./components/Wrapper/Wrapper";

function App() {
  const [buckets, setBuckets] = useState([]);
  useEffect(() => {
    listBuckets()
  }, []);
  const listBuckets = async () => {
    var response = await sendMsg("", [], "ListBuckets")
   setBuckets(response.body.backendOutput)
  };
  return (
    
    
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <Wrapper></Wrapper>
    </div>
  );
}

export default App;
