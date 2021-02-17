import React, { useEffect, useState } from "react";
import "./CustomBucketMenu.scss";

type CustomBucketMenuProps = {
  deleteBucket: Function;
}

const CustomBucketMenu = (customBucketMenuProps: CustomBucketMenuProps) => (
  <div className="CustomBucketMenu">
      <div className = "MenuItem" >Empty bucket</div>
      <div className = "MenuItem" onClick = {() => customBucketMenuProps.deleteBucket()} >Delete bucket</div>
    </div> 
);

export default CustomBucketMenu;
