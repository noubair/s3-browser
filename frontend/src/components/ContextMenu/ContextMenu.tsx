import React, { useEffect, useState } from "react";
import useContextMenu from "../../hooks/useContextMenu/useContextMenu";
import { Motion, spring } from "react-motion";
import "./ContextMenu.scss";

const ContextMenu = ({ customMenu }: any) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  const [menu, setMenu ] = useState(false);
  useEffect(() => {
    setMenu(customMenu)
   }, [xPos, yPos]);
  return (
    //   <Motion
    //     defaultStyle={{ opacity: 0 }}
    //     style={{ opacity: !showMenu ? spring(0) : spring(1) }}
    //   >
    // {(interpolatedStyle) => (
    <>
      {showMenu  ? (
        <div
          className="menu-container"
          style={{
            top: yPos,
            left: xPos,
            position: "absolute",
            backgroundColor: "white",
            //   opacity: interpolatedStyle.opacity,
          }}
        >
          {menu}
        </div>
      ) : (
        <></>
      )}
    </>
    // )}
    // </Motion>
  );
};

export default ContextMenu;