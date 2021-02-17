import React, { useEffect, useRef, useState } from "react";
import CustomBucketMenu from "../CustomBucketMenu/CustomBucketMenu";
import { deleteBucket } from "../../api";

type BucketItemProps = {
  bucketName: string;
  id: string;
  isSelected: boolean;
  callback: Function;
  setCustomMenu: Function;
};

const BucketItem = (bucketItemProps: BucketItemProps) => {
  return (
    <div
      className={`BucketItem ${bucketItemProps.isSelected ? "selected" : ""}`}
      onClick={() => {
        bucketItemProps.callback(bucketItemProps.id, "click");
      }}
      onMouseOver={() =>
        bucketItemProps.setCustomMenu(
          <CustomBucketMenu
            deleteBucket={async () => {
              await deleteBucket(bucketItemProps.bucketName);
              bucketItemProps.callback(bucketItemProps, "refresh")
            }}
          />
        )
      }
      onMouseOut={() => bucketItemProps.setCustomMenu(null)}
    >
      <div className="BucketItemTitle">{bucketItemProps.bucketName}</div>
    </div>
  );
};

export default BucketItem;
