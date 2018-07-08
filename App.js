/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, PermissionsAndroid, CameraRoll, Image, ScrollView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

	constructor(props) {
    super(props);
    this.state = {
      photos: [],
    }
  }

	componentDidMount() {
		this.requestGalleryPermission();
	}

	async requestGalleryPermission() {
  
    const read_granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'Gallery Access',
        'message': 'Gallery access is required for this image test'
      }
    )

    if (read_granted === PermissionsAndroid.RESULTS.GRANTED  ) {
      CameraRoll.getPhotos({
	      first: 30, 
	      assetType: 'Photos',
	      mimeTypes: ['image/jpeg', 'image/png']
	    })
	    .then((r) => {
	    	this.setState({
	    		photos: r.edges
	    	})
	    })
    }

  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
      	<View style={styles.grid}>
		      {this.state.photos.map((p, i) => {
		       return (
		         <Image
		           key={i}
		           style={styles.imageTest}
		           source={{ uri: p.node.image.uri }}
		         />
		   	    );
		     	})}
      	</View>
      </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  grid: {
  	flexDirection: 'row',
  	flexWrap: 'wrap'
  },
  imageTest: {
  	width: 100,
  	height: 100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
