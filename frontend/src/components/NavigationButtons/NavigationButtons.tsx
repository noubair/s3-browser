import React, { useState } from "react";
import { createExportDefault } from "typescript";

type NavigationButtonsProps = {
  previousPage: Function;
  nextPage: Function;
  effectFunction: Function;
  currentKey: string;
  setCurrentKey: Function;
  history: string[];
  setHistory: Function;
  historyCursor: number;
  setHistoryCursor: Function;
};

const NavigationButtons = (navigationButtonsProps: NavigationButtonsProps) => {
  const previousPage = async () => {
    if (navigationButtonsProps.historyCursor > 0) {
      var newHistoryCursor = navigationButtonsProps.historyCursor - 1;
      var slicedHistory = navigationButtonsProps.history.slice(
        0,
        newHistoryCursor
      );
      var newCurrentKey = slicedHistory.join("/");
      navigationButtonsProps.effectFunction(newCurrentKey);
      console.log(
        "currentKey",
        navigationButtonsProps.history.slice(0, newHistoryCursor).join("/")
      );
      console.log("history", navigationButtonsProps.history);
      console.log("historyCursor", navigationButtonsProps.historyCursor - 1);
      await navigationButtonsProps.setHistoryCursor(newHistoryCursor);
      await navigationButtonsProps.setCurrentKey(newCurrentKey);
    }
  };

  const nextPage = async () => {
    if (
      navigationButtonsProps.historyCursor <
      navigationButtonsProps.history.length
    ) {
      var newHistoryCursor = navigationButtonsProps.historyCursor + 1;
      var slicedHistory = navigationButtonsProps.history.slice(
        0,
        newHistoryCursor
      );
      var newCurrentKey = slicedHistory.join("/");
      navigationButtonsProps.effectFunction(newCurrentKey);
      console.log(
        "currentKey",
        navigationButtonsProps.history.slice(0, newHistoryCursor).join("/")
      );
      console.log("history", navigationButtonsProps.history);
      console.log("historyCursor", navigationButtonsProps.historyCursor + 1);
      await navigationButtonsProps.setHistoryCursor(newHistoryCursor);
      await navigationButtonsProps.setCurrentKey(newCurrentKey);
    }
  };

  return (
    <div className="NavigationButtons">
      <button className="button" onClick={() => previousPage()}>
        {"<--"}
      </button>
      <button className="button" onClick={() => nextPage()}>
        {"-->"}
      </button>
    </div>
  );
};

export default NavigationButtons;
