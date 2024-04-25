import { LatLngTuple } from "leaflet";
import React, { FC, useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = ({selectedReview}: any) => {
  const map = useMap();
  const flyToDuration = 1.5;

  const flyTo = (location: LatLngTuple) => {
    map.flyTo(location, 15, {
      animate: true,
      duration: flyToDuration,
    });
  };

  const flyToCenter = () => {
    map.flyTo([59.914, 10.734], 13, {
      animate: true,
      duration: flyToDuration,
    });
  };

  useEffect(() => {
    if(selectedReview) {
      flyTo(selectedReview.location);
    } else {
      flyToCenter();
    }
  }, [selectedReview])

  return null;
};

export { MapController };