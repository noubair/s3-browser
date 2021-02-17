import React, { PropsWithChildren } from "react";
import useEscape from "../../hooks/useEscape/useEscape";

type PopupProps = {
  closePopup: Function;
};

const Popup = (popupProps: PropsWithChildren<PopupProps>) => {
  useEscape(() => popupProps.closePopup());
  return (
    <div className="Popup">
      <div className="PopupInner">
        <button className="CloseButton" onClick={() => popupProps.closePopup()}>
          X
        </button>
        <div className="PopupComponent">
          <div>{popupProps.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
