import React, { useState } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItem } from "../features/eco/ecoSlice";
import WasteResultView from "../components/WasteResultView";

export default function ScanResultPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeItem, scanQueue } = useSelector((state) => state.eco);

  // Pick up result from navigation state or Redux store
  const passedResult = location.state?.result;
  const isMulti = location.state?.isMulti || (passedResult?.items && passedResult?.items.length > 1);

  const multiItems = passedResult?.items || (scanQueue && scanQueue.length > 0 ? scanQueue : []);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Active item to display
  const currentItem =
    multiItems.length > 0
      ? multiItems[selectedIdx]
      : passedResult || activeItem;

  const handleSelectItem = (idx) => {
    setSelectedIdx(idx);
    if (multiItems[idx]) {
      dispatch(setActiveItem(multiItems[idx]));
    }
  };

  return (
    <div className="py-4 sm:py-6">
      <WasteResultView
        result={currentItem}
        isDemo={false}
        multiItems={multiItems}
        selectedItemIndex={selectedIdx}
        onSelectItem={handleSelectItem}
        userImage={location.state?.scannedImageUrl}
      />
    </div>
  );
}
