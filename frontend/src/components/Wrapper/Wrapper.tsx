import React, { useEffect, useState } from "react";
import { sendMsg } from "../../api";
import BucketContentList from "../BucketContentList/BucketContentList";
import BucketsList from "../BucketsList/BucketsList";
import { Header } from "../Header/Header";
import NewBucket from "../NewBucket/NewBucket";
import Popup from "../Popup/Popup";
import "./Wrapper.scss";
import ContextMenu from "../ContextMenu/ContextMenu";
import CustomMenu from "../CustomMenu/CustomMenu";

const Wrapper = () => {
  const [selectedBucket, setSelectedBucket] = useState("alpha-bucket");
  const [buckets, setBuckets] = useState([]);
  const [currentKey, setCurrentKey] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState(0);
  const [customMenu, setCustomMenu] = useState(null)

  //popups TODO: move in dedicated file
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {}, [showPopup]);
  useEffect(() => {
    listBuckets();
  }, []);
  const listBuckets = async () => {
    var response = await sendMsg("", [], "ListBuckets");
    setBuckets(response.body.backendOutput);
  };

  return (
    <>
       <ContextMenu
          //TODO: instantiated or not?
          customMenu={customMenu}

        ></ContextMenu>
      <div className="Wrapper">
        <BucketsList
          buckets={buckets}
          listBuckets={listBuckets}
          selectedBucket={selectedBucket}
          setSelectedBucket={setSelectedBucket}
          previousPage={() => console.log("hey")}
          nextPage={() => console.log("hello")}
          currentKey={currentKey}
          setCurrentKey={setCurrentKey}
          history={history}
          setHistory={setHistory}
          historyCursor={historyCursor}
          setHistoryCursor={setHistoryCursor}
          setCustomMenu={setCustomMenu}
          onNewBucketClick={() => setShowPopup(true)}
        ></BucketsList>
        <div className="TwoPaneView">
          <Header></Header>
          <BucketContentList
            selectedBucket={selectedBucket}
            currentKey={currentKey}
            setCurrentKey={setCurrentKey}
            history={history}
            setHistory={setHistory}
            historyCursor={historyCursor}
            setHistoryCursor={setHistoryCursor}
            setCustomMenu={setCustomMenu}
          ></BucketContentList>
        </div>
      </div>
      <div className="Popups">
        {showPopup === true ? (
          <Popup
            closePopup={() => {
              setShowPopup(false);
            }}
          >
            <NewBucket
              setSelectedBucket={setSelectedBucket}
              setBuckets={listBuckets}
            ></NewBucket>
            {/* <div>{"Children"}</div> */}
          </Popup>
        ) : null}
      </div>
    </>
  );
};

export default Wrapper;
