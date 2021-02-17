import React, { useState } from "react";
import { createBucket, listBuckets } from "../../api";
import "./NewBucket.scss";

type NewBucketProps = {
  setSelectedBucket: Function;
  setBuckets: Function;
};

const NewBucket = (newBucketProps: NewBucketProps) => {
  const [bucketNameInputValue, setBucketNameInputValue] = useState("");
  const handleChange = (event: any) => {
    setBucketNameInputValue(event.target.value);
  };
  const handleSubmit = (event: any) => {
    createBucket(bucketNameInputValue);
    // newBucketProps.setSelectedBucket(bucketNameInputValue)
    newBucketProps.setBuckets()
    event.preventDefault();
  };

  return (
    <div className="NewBucket">
      <form onSubmit={handleSubmit} className="NewBucketForm">
        {" "}
        <label>
          bucket name:
          <input
            className="NewBucketInput"
            type="text"
            value={bucketNameInputValue}
            onChange={handleChange}
          />{" "}
        </label>
        <input type="submit" value="Add" className="SubmitNewBucket" />
      </form>
    </div>
  );
};

export default NewBucket;
