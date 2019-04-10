import React, { Component } from 'react';
import {
 View, StyleSheet, Dimensions, TextInput 
} from 'react-native';
import MapView from 'react-native-maps';
import NewField from '../../../shared-ui/NewField';
import config from '../../../config';
import Marker from './Marker';
import GenericFetch from '../../../shared-ui/GenericFetch';
import CustomButton from '../../../shared-ui/CustomButton';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 2.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      selectedMarkerIndex: '',
      descriptionText: '',
      toggleBlock: false
    };
  }

  onLongPress = (e) => {
    const { coordinate } = e.nativeEvent;
    // sample field data to add new point on map
    const addNewPoint = NewField(coordinate);
    let timer;
    clearTimeout(timer);
    if (addNewPoint) {
      timer = setTimeout(() => {
        const savePoint = GenericFetch(
          `${config.url}/adds`,
          'POST',
          addNewPoint
        );
        savePoint
          .then(data => console.log(JSON.stringify(data)))
          .catch(error => console.error(error));
      }, 300);

      this.repopulateMarkers();
    }
  };

  showTip = (index) => {
    console.log(index);
    this.setState({ selectedMarkerIndex: index, toggleBlock: true });
  };

  getPoints = () => {
    const updatePoint = GenericFetch(`${config.url}/list`, '');
    updatePoint
      .then(response => response.json())
      .then((responseJson) => {
        const newMarkers = [];
        responseJson.tasks.forEach((point) => {
          const loc = {
            coordinate: {
              latitude: point.coordinate.latitude,
              longitude: point.coordinate.longitude
            },
            title: point.title,
            description: point.description,
            /* eslint-disable-next-line */
            id: point._id
          };
          newMarkers.push(loc);
        });
        this.setState({
          markers: newMarkers
        });
      });
  };

  repopulateMarkers = () => {
    const that = this;
    setTimeout(() => {
      that.getPoints();
    }, 500);
  };

  editText = (state, id) => {
    const { descriptionText, markers } = this.state;
    const markersCopy = markers;
    const update = {
      updateId: id,
      description: descriptionText
    };

    const updatePoint = GenericFetch(`${config.url}/update`, 'POST', update);

    updatePoint
      /* eslint-disable no-console */
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));

    markersCopy.forEach((el) => {
      if (id === el.id) {
        /* eslint-disable-next-line */
        el.description = descriptionText;
      }
    });
    this.setState({
      markers: markersCopy
    });
    this.showTip();
  };

  deleteMarkup = (id) => {
    const deletePoint = GenericFetch(`${config.url}/delete/${id}`, '');
    deletePoint
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));

    this.getPoints();
  };

  renderTextInput = () => (
    <TextInput
      style={styles.textInput}
      autoCorrect={false}
      placeholder="Enter the text you want to update"
      onChangeText={descriptionText => this.setState({ descriptionText })}
    />
  );

  onEditPress = () => {
    const { selectedMarkerIndex } = this.state;
    this.editText(this.state, selectedMarkerIndex);
  };

  onDeletePress = () => {
    const { selectedMarkerIndex } = this.state;
    this.deleteMarkup(selectedMarkerIndex);
  };

  render() {
    const { markers, selectedMarkerIndex, toggleBlock } = this.state;
    return (
      <View style={styles.container}>
        {toggleBlock && markers.length > 0 && (
          <>
            <CustomButton onPress={this.onEditPress} text="EDIT" />
            {this.renderTextInput()}
            <CustomButton onPress={this.onDeletePress} text="DELETE" />
          </>
        )}
        <MapView
          onRegionChangeComplete={this.getPoints}
          style={styles.map}
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: config.LATITUDE,
            longitude: config.LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          onLongPress={this.onLongPress}>
          {/* markers on map */}
          <Marker
            markers={markers}
            showTip={this.showTip}
            selectedMarkerIndex={selectedMarkerIndex}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center'
  },
  map: {
    height,
    width,
    zIndex: -1
  },
  textInput: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'flex-end',
    width: width * 0.7,
    padding: 10,
    left: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    color: '#33B2FF',
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#33B2FF'
  }
});

export default Map;
