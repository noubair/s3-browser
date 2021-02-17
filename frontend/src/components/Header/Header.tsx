import React, { useState } from "react";

export const Header = () => {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState();
  const isSelected = (id: string) => {
    return id === selectedHeaderItem;
  };
  const callback = (e: any, eventType: string) => {
    if (eventType === "click") {
      setSelectedHeaderItem(e);
    }
  };
  return (
    <div className="Header">
      {["Alpha Account", "Omega Account"].map((e: any, i: number) => (
        <HeaderItem
          key={i}
          headerItemName={e}
          isSelected={isSelected(e)}
          callback={callback}
          id={e}
        ></HeaderItem>
      ))}
    </div>
  );
};

type HeaderItemProps = {
  headerItemName: string;
  id: string;
  isSelected: boolean;
  callback: Function;
};

const HeaderItem = (headerItemProps: HeaderItemProps) => {
  return (
    <div
      className={`HeaderItem ${headerItemProps.isSelected ? "selected" : ""}`}
      onClick={() => {
        headerItemProps.callback(headerItemProps.id, "click");
      }}
    >
      <div className="HeaderItemTitle">{headerItemProps.headerItemName}</div>
    </div>
  );
};
