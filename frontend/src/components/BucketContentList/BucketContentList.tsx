import React, { useEffect, useState } from "react";
import { sendMsg } from "../../api";
import BucketContent from "../BucketContent/BucketContent";

type BucketContentListProps = {
  selectedBucket: string;
  currentKey: string;
  setCurrentKey: Function;
  history: string[];
  setHistory: Function;
  historyCursor: number;
  setHistoryCursor: Function;
  setCustomMenu: Function;
};

const BucketContentList = (bucketContentListProps: BucketContentListProps) => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    listObjects(bucketContentListProps.currentKey);
  }, [
    bucketContentListProps.selectedBucket,
    bucketContentListProps.currentKey,
  ]);

  const listObjects = async (key: string) => {
    var response = await sendMsg(
      "",
      [bucketContentListProps.selectedBucket, key],
      "ListObjects"
    );
    setObjects(
      response.body.backendOutput == undefined
        ? []
        : response.body.backendOutput.map((e: any) => [
            e.Key,
            e.FileOrFolderName,
          ])
    );
  };
  const callback = async (e: string, eventType: string) => {
    if (eventType === "click") {
      bucketContentListProps.history.length =
        bucketContentListProps.historyCursor; //TODO: use splice instead?
      bucketContentListProps.history.push(e);
      listObjects(
        bucketContentListProps.history
          .slice(0, bucketContentListProps.historyCursor + 1)
          .join("/")
      );
      console.log("history", bucketContentListProps.history);
      console.log("historyCursor", bucketContentListProps.historyCursor + 1);
      await bucketContentListProps.setCurrentKey(
        bucketContentListProps.history.join("/")
      );
      await bucketContentListProps.setHistoryCursor(
        bucketContentListProps.historyCursor + 1
      );
    }
  };

  return (
    <div className="SelectedBucketContent">
      {objects.map((e, i) => {
        return (
          <BucketContent
            key={i}
            bucketObject={e}
            callback={callback}
            setCustomMenu={bucketContentListProps.setCustomMenu}
          ></BucketContent>
        );
      })}
    </div>
  );
};

export default BucketContentList;
