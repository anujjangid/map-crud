// @flow

import React from 'react';
import MapView from 'react-native-maps';

type Props = {
  markers: [],
  selectedMarkerIndex: string,
  showTip: Function
};
const markerImage = require('../../../../assets/pharmacy.png');
const selectedMarkerImage = require('../../../../assets/pharmacy-active.png');

const Marker = (props: Props) => {
  const { markers, selectedMarkerIndex } = props;
  return (
    <>
      {markers.map((marker) => {
        console.log(marker);
        return (
          <MapView.Marker
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            key={`point-${marker.description}`}
            image={
              selectedMarkerIndex === marker.id
                ? selectedMarkerImage
                : markerImage
            }
            onPress={() => {
              props.showTip(marker.id);
            }}
            draggable
          />
        );
      })}
    </>
  );
};

export default Marker;
