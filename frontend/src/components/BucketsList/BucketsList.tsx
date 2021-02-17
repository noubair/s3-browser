import React, { useEffect, useState } from "react";
import { sendMsg } from "../../api";
import BucketItem from "../BucketItem/BucketItem";

import NavigationButtons from "../NavigationButtons/NavigationButtons";

type BucketsListProps = {
  selectedBucket: string;
  setSelectedBucket: Function;
  buckets: string[];
  listBuckets: Function;
  previousPage: Function;
  nextPage: Function;
  currentKey: string;
  setCurrentKey: Function;
  history: string[];
  setHistory: Function;
  historyCursor: number;
  setHistoryCursor: Function;
  onNewBucketClick: Function;
  setCustomMenu: Function;
};

const BucketsList = (bucketsListProps: BucketsListProps) => {
  useEffect(() => {}, [bucketsListProps.buckets]);
  const isSelected = (id: string) => {
    return id === bucketsListProps.selectedBucket;
  };

  const callback = (e: any, eventType: string) => {
    if (eventType === "click") {
      bucketsListProps.setSelectedBucket(e);
      console.log("BucketList");
    } else if (eventType === "refresh") {
      bucketsListProps.listBuckets()
    }
  };

  return (
    <div className="BucketsList">
      <div className="BucketListInputContainer">
        <input className="BucketsListInput"></input>
      </div>
      <div className="BucketTools">
        <div
          className="NewBucket"
          onClick={() => bucketsListProps.onNewBucketClick()}
        >
          <div className="CreateBucketSign">+</div>
          <div className="CreateBucketText">{" New bucket"}</div>
        </div>
        <NavigationButtons
          previousPage={bucketsListProps.previousPage}
          nextPage={bucketsListProps.nextPage}
          effectFunction={(x: any) => {
            console.log("listObjects ", x);
          }}
          currentKey={bucketsListProps.currentKey}
          setCurrentKey={bucketsListProps.setCurrentKey}
          history={bucketsListProps.history}
          setHistory={bucketsListProps.setHistory}
          historyCursor={bucketsListProps.historyCursor}
          setHistoryCursor={bucketsListProps.setHistoryCursor}
        ></NavigationButtons>
      </div>
      {bucketsListProps.buckets.map((e: any, i: number) => (
        <BucketItem
          key={e}
          bucketName={e}
          isSelected={isSelected(e)}
          callback={callback}
          id={e}
          setCustomMenu={bucketsListProps.setCustomMenu}
        ></BucketItem>
      ))}
    </div>
  );
};

export default BucketsList;
