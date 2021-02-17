import React from "react";
import CustomMenu from "../CustomMenu/CustomMenu";

type BucketContentProps = {
  bucketObject: string;
  callback: Function;
  setCustomMenu: Function;
};

const BucketContent = (bucketContentProps: BucketContentProps) => {
  return (
    <div
      className="ObjectItem"
      onClick={() =>
        bucketContentProps.callback(bucketContentProps.bucketObject[1], "click")
      }
      onMouseOver={() => bucketContentProps.setCustomMenu(<CustomMenu />)}
      onMouseOut={() => bucketContentProps.setCustomMenu(null)}
    >
      <div className="ObjectItemTitle">
        {bucketContentProps.bucketObject[1]}
      </div>
    </div>
  );
};

export default BucketContent;
