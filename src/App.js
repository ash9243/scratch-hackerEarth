import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [selectedElement, setSelectedElement] = useState("");
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [group, setGroup] = useState([]);

  const handleDragStart = (event) => {
    console.log("drag start ");
    let newElement = event.currentTarget.cloneNode(true);
    newElement.style.position = "absolute";

    setDiffX(event.clientX - event.currentTarget.getBoundingClientRect().left);
    setDiffY(event.clientY - event.currentTarget.getBoundingClientRect().top);
    setSelectedElement(newElement);
  };

  const handleDragEnd = (event) => {
    console.log("drag end");
    let newGroupRequired = false;

    let newElement = selectedElement;

    newElement.style.top = event.clientY - diffY + "px";
    newElement.style.left = event.clientX - diffX + "px";

    let elements = document
      .getElementById("MidArea")
      .querySelectorAll(".draggable");

    console.log("current element left", newElement.style.left);
    console.log("current element top", newElement.style.top);

    if (elements.length === 0) {
      newGroupRequired = true;
    }

    for (let i = 0; i < elements.length; i++) {
      console.log("elements ", elements[0].style.left);
      console.log("elements ", elements[0].style.top);

      let overlappingElement = elements[i];

      let OEBR = overlappingElement.getBoundingClientRect();
      let OEBRLength = OEBR.bottom - OEBR.top;
      console.log("over lapping element length ", OEBRLength);
      console.log("oebr top ", OEBR.top);
      console.log("oebr bottom ", OEBR.bottom);
      console.log(
        "top greater than",
        parseInt(overlappingElement.style.top.replace("px", "")) +
          OEBRLength / 2
      );
      console.log(
        "top less than",
        parseInt(overlappingElement.style.top.replace("px", "")) +
          OEBRLength +
          OEBRLength
      );
      console.log(
        "current element top ",
        parseInt(newElement.style.top.replace("px", ""))
      );

      if (
        parseInt(newElement.style.top.replace("px", "")) >
          parseInt(overlappingElement.style.top.replace("px", "")) +
            OEBRLength / 2 &&
        parseInt(newElement.style.top.replace("px", "")) <
          parseInt(overlappingElement.style.top.replace("px", "")) +
            OEBRLength +
            OEBRLength
      ) {
        console.log("attach on bottom");
        newElement.style.top =
          parseInt(overlappingElement.style.top.replace("px", "")) +
          OEBRLength +
          "px";
        newElement.style.left = overlappingElement.style.left;
      } else if (
        parseInt(newElement.style.top.replace("px", "")) >
          parseInt(overlappingElement.style.top.replace("px", "")) +
            OEBRLength &&
        parseInt(newElement.style.top.replace("px", "")) <
          parseInt(overlappingElement.style.top.replace("px", "")) +
            OEBRLength / 2
      ) {
        console.log("attach on top");
        newElement.style.top =
          parseInt(overlappingElement.style.top.replace("px", "")) -
          OEBRLength +
          "px";
        newElement.style.left = overlappingElement.style.left;
      }
    }

    if (newGroupRequired === true) {
      let newGroup = [];
      newGroup.add(newElement);
      setGroup(newGroup);
    }

    document.getElementById("MidArea").appendChild(newElement);
  };

  const handleDragOver = () => {
    console.log("drag over");
  };

  const handleDrop = () => {
    console.log("element dropped");
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
          <MidArea handleDragOver={handleDragOver} handleDrop={handleDrop} />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
