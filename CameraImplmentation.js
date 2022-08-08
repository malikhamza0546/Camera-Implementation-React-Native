import React, {Fragment, Component} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
);
import * as ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
//  <Octicons name="magnifying-glass" color={'#000'} size={25} />;
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PhotoEditor from 'react-native-photo-editor';
import TextGradient from './TextGradient';
import Draggable from 'react-native-draggable';
import ViewShot from 'react-native-view-shot';
import {captureRef, viewRef} from 'react-native-view-shot';
import Video from 'react-native-video';
import {TextTrackType} from 'react-native-video';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Video as VideoCompressor} from 'react-native-compressor';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class CameraImplmentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      Location: 'Location',
      UIRenderer: false,
      ViewShoot: false,
      fileUriForVideo: '',
      VideoShower: false,
      isMuted: false,
      progress: null,
    };
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        saveToPhotos: true,
        waitUntilSaved: true,
        cameraRoll: true,
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState(
          {
            filePath: response,
            fileData: response.data,
            fileUri: response?.assets[0]?.uri,
          },
          () => {
            this.setData();
          },
        );
      }
    });
  };

  launchCameraForVideo = () => {
    let options = {
      mediaType: 'video',
      videoQuality: 'high',
      quality: 1,
      durationLimit: 45,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
        saveToPhotos: true,
        waitUntilSaved: true,
        cameraRoll: true,
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState(
          {
            filePath: response,
            fileData: response.data,
            // fileUri: response?.assets[0]?.uri,
            fileUriForVideo: response?.assets[0]?.uri,
            VideoShower: true,
          },
          () => {
            this.FileCompressor();
          },
        );
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        saveToPhotos: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState(
          {
            filePath: response,
            fileData: response.data,
            fileUri: response?.assets[0]?.uri,
          },
          () => {
            this.setData();
          },
        );
      }
    });
  };

  renderFileData = () => {
    if (this.state.fileData) {
      console.log('renderFileData');
      return (
        <Image source={{uri: response?.assets[0]?.uri}} style={styles.images} />
      );
    } else {
      return (
        <Image
          source={require('./assets/background_Login.png')}
          style={styles.images}
        />
      );
    }
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('./assets/background_Login.png')}
          style={styles.images}
        />
      );
    }
  }

  async FileCompressor() {
    const result = await VideoCompressor.compress(
      this.state.fileUriForVideo,
      {
        compressionMethod: 'auto',
      },
      progress => {
        if (backgroundMode) {
          console.log('Compression Progress: ', progress);
        } else {
          // this.setstate({progress: 'Hamza'});
        }
      },
    );
    console.log(result, 'result');
    CameraRoll.save(result, 'Video')
      .then(onfulfilled => {
        console.log('saved');
        console.log(onfulfilled, 'onfulfilled');

        // ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
      })
      .catch(error => {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      });
    return result;
  }

  renderFileUriForVideo() {
    if (this.state.fileUriForVideo) {
      return (
        <View style={styles.ImageCapture}>
          <Video
            source={{uri: this.state.fileUriForVideo}}
            // Can be a URL or a local file.
            resizeMode={'contain'}
            // ref={player} // Store reference
            controls={true}
            repeat={true}
            fullscreen={true}
            muted={this.state.isMuted}
            // onBuffer={console.log('buffering')} // Callback when remote video is buffering
            // onError={err => console.warn(err)} // Callback when video cannot be loaded
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
          <TouchableOpacity
            onPress={() => this.setState({isMuted: !this.state.isMuted})}
            style={{
              height: 44,
              width: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.isMuted ? (
              <Octicons name="mute" color={'#000'} size={25} />
            ) : (
              <Octicons name="unmute" color={'#000'} size={25} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._onSelectLabel('address')}
            style={[
              {
                marginLeft: 100,
                bottom: 40,
                borderWidth: 1,
              },
            ]}>
            <View style={styles.mainLabel}>
              <TextGradient
                icon={{
                  name: 'map-marker',
                  size: 16,
                }}
                text={this.state.Location}
                style={{
                  fontSize: 16,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  setData = () => {
    console.log(this.state.fileUri, 'this.state.fileUri');
    let ImageforPath = this.state.fileUri;
    let actualPath = ImageforPath.split('//');
    PhotoEditor.Edit({
      hiddenControls: [],
      path: actualPath[1],
      onDone: response => {
        let yourPath = 'file://' + response;
        console.log(yourPath, 'yourPath');
        console.log(response, 'response');
        let yourActualPath = `${yourPath}?${new Date().getTime()}`;
        console.log(yourActualPath, 'yourActualPath');
        this.setState(
          {
            fileUri: yourActualPath,
            UIRenderer: true,
          },
          // () => {
          //   CameraRoll.save(yourActualPath, 'photo')
          //     .then(onfulfilled => {
          //       console.log('saved');
          //       console.log(onfulfilled, 'onfulfilled');
          //       // ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
          //     })
          //     .catch(error => {
          //       ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
          //     });
          // },
        );
      },
    });
  };
  onSelectedAddressLabel = address => {
    console.log(address, 'address');
    this.setState({
      Location: address.place_name,
      ViewShoot: true,
    });
  };
  _onSelectLabel = type => {
    switch (type) {
      case 'address':
        this.props.navigation.navigate('StickerImplmentation', {
          onDone: this.onSelectedAddressLabel,
        });
    }
  };

  ViewShoot = () => {
    console.log('ViewShoot');
    this.setState({ViewShoot: false}, () => {
      this.refs.viewShot.capture().then(uri => {
        console.log('do something with ', uri);
        CameraRoll.save(uri, 'photo')
          .then(onfulfilled => {
            console.log('saved');
            console.log(onfulfilled, 'onfulfilled');
            this.setState({
              ViewShoot: true,
              UIRenderer: false,
              fileUri: uri,
              fileUriForVideo: '',
              VideoShower: false,
            });
            // ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
          })
          .catch(error => {
            ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
          });
      });
    });

    // captureRef(viewRef, {
    //   format: 'jpg',
    //   quality: 0.8,
    // }).then(
    //   uri => console.log('Image saved to', uri),
    //   error => console.error('Oops, snapshot failed', error),
    // );
  };

  VideoShower = () => {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {!this.state.UIRenderer && (
          <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <View style={styles.body}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    paddingBottom: 10,
                  }}>
                  Pick Images from Camera & Gallery
                </Text>
                <View style={styles.ImageSections}>
                  {!this.state.VideoShower && (
                    <View>
                      {this.renderFileUri()}
                      <Text style={{textAlign: 'center'}}>File Uri</Text>
                    </View>
                  )}
                  {this.state.VideoShower && (
                    <View>{this.renderFileUriForVideo()}</View>
                  )}
                </View>
                <View style={styles.btnParentSection}>
                  <TouchableOpacity
                    onPress={this.launchCamera}
                    style={styles.btnSection}>
                    <Text style={styles.btnText}>Directly Launch Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.launchImageLibrary}
                    style={styles.btnSection}>
                    <Text style={styles.btnText}>
                      Directly Launch Image Library
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.launchCameraForVideo}
                    style={styles.btnSection}>
                    <Text style={styles.btnText}>
                      Directly Launch video Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </Fragment>
        )}
        {this.state.UIRenderer && (
          <ViewShot
            style={{flex: 1, backgroundColor: 'black'}}
            ref="viewShot"
            options={{format: 'jpg', quality: 0.8}}>
            <ImageBackground
              source={{
                uri: this.state.fileUri,
              }}
              resizeMode="contain"
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                // backgroundColor: 'red',
              }}>
              <Draggable x={50} y={50}>
                <TouchableOpacity
                  onPress={() => this._onSelectLabel('address')}
                  style={styles.labelItemWrapper}>
                  <View style={styles.mainLabel}>
                    <TextGradient
                      icon={{
                        name: 'map-marker',
                        size: 16,
                      }}
                      text={this.state.Location}
                      style={{
                        fontSize: 16,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Draggable>
            </ImageBackground>
            {this.state.ViewShoot && (
              <TouchableOpacity
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingRight: wp(4),
                  marginBottom: hp(3),
                }}
                onPress={() => {
                  this.ViewShoot();
                }}>
                <AntDesign name="picture" color={'white'} size={50} />
              </TouchableOpacity>
            )}
          </ViewShot>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ImageCapture: {
    // backgroundColor: 'green',
    width: wp(70),
    height: hp(20),
    borderRadius: 8,
    // justifyContent: 'center',
    alignSelf: 'center',
    // marginHorizontal: hp(2.5),
  },
  backgroundVideo: {
    position: 'absolute',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  labelItemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    paddingVertical: hp(1),
    flexDirection: 'row',
    paddingHorizontal: 10,
    // paddingVertical: 5,
    // height: 36,
    maxWidth: wp(95),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
