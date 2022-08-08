import React, {useState, useEffect, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NavigationBar from './NavigationBar';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
const locationConfig = {
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
};
Geolocation.setRNConfiguration(locationConfig);

// Geolocation.setRNConfiguration(config);
const StickerImplmentation = ({route}) => {
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoidnVjbXMwMjAyIiwiYSI6ImNrYzd3YXN5YjB0bzQyeWxqaHk3cndkZWUifQ.Rrt9iMYACnqGK-rCblD0Ag';
  const navigation = useNavigation();
  const onDone = route.params.onDone;
  console.log(onDone, 'onDone');
  const [query, setQuery] = useState(route.params?.address?.place_name || '');
  const [address, setAddress] = useState({...route.params.address});
  const [result, setResult] = useState([]);

  const ref = {
    timeout: setTimeout(() => {}, 0),
  };

  const searchLocation = query => {
    return new Promise((resolve, reject) => {
      fetch(
        `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
          query.trim(),
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`,
      )
        .then(res => res.json())
        .then(data => {
          const address = [];
          const result = data;
          result.features.map(feature => {
            address.push({
              id: feature.id,
              place_name: feature.place_name,
              center: feature.center,
            });
          });
          resolve(address);
        })
        .catch(err => reject(err, 'error'));
    });
  };
  function goBack() {
    navigation.goBack();
  }

  const searchLocationwithLongLatitude = query => {
    console.log(query.coords, 'searchLocationwithLongLatitude');
    const {longitude, latitude} = query.coords;
    const curl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${MAPBOX_ACCESS_TOKEN}`;
    console.log(longitude, 'longitude');
    return new Promise((resolve, reject) => {
      fetch(curl)
        .then(res => res.json())
        .then(data => {
          const address = [];
          const result = data;
          console.log('result', result);
          result.features.map(feature => {
            address.push({
              id: feature.id,
              place_name: feature.place_name,
              center: feature.center,
            });
          });

          console.log('searchLocationwithLongLatitude');
          // onDone({...addressItem});
          // goBack();
          resolve(address);
        })
        .catch(err => reject(err, 'error'));
    });
  };

  function currentLocationGetter() {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
    Geolocation.getCurrentPosition(info =>
      searchLocationwithLongLatitude(info).then(data => {
        console.log(data, 'getCurrentPosition');

        if (onDone) {
          console.log(result);
          onDone(data[0]);
          goBack();
        }
      }),
    );
  }
  useEffect(() => {
    if (query.length > 0) {
      console.log('useEffect');
      let x = setTimeout(() => {
        searchLocation(query).then(data => {
          setResult([...data]);
        });
      }, 700);
    }

    // if (dummy.length > 0) {
    //   let y = setTimeout(() => {
    //     searchLocationwithLongLatitude(query).then(data => {
    //       setResult([...data]);
    //       console.log('HAmza');
    //     });
    //   }, 700);
    // }
    console.log(result, 'result');
  }, [query]);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar title="Select a Location" callback={goBack} />
      <View
        style={{
          marginTop: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: 250,
            marginHorizontal: 15,
            height: 44,
            borderBottomColor: '#318bfb',
            borderBottomWidth: 1,
          }}>
          <View style={styles.centerBtn}>
            <Entypo name="magnifying-glass" color={'#000'} size={25} />
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Find a location"
            style={{
              height: '100%',
              width: 250,
            }}
          />
          <TouchableOpacity onPress={currentLocationGetter}>
            <Ionicons name="md-locate-sharp" color={'#000'} size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          {result.map((addressItem, index) => (
            <View
              key={index}
              style={{
                marginVertical: 5,
                backgroundColor: '#000',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (onDone) {
                    onDone({...addressItem});
                    goBack();
                  }
                }}
                activeOpacity={0.9}
                style={{
                  backgroundColor: '#fff',
                  height: 44,

                  justifyContent: 'center',
                  paddingHorizontal: 15,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    width: '100%',
                    fontSize: 16,
                  }}>
                  {addressItem.place_name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  centerBtn: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StickerImplmentation;
