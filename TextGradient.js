import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const TextGradient = props => {
  return (
    <MaskedView
      maskElement={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // paddingVertical: hp(5),
          }}>
          {props.icon && (
            <Fontisto
              name="map-marker-alt"
              size={props.icon.size}
              style={{paddingRight: wp(2)}}
            />
          )}
          <Text {...props}>{props.text}</Text>
        </View>
      }>
      <LinearGradient
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        colors={['#c62f90', '#db3072', '#f19d4c']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // paddingVertical: hp(2),
            // paddingBottom:hp(1)
            // marginBottom: hp(0.5),
          }}>
          {props.icon && (
            <Fontisto
              style={{paddingRight: wp(2)}}
              name="map-marker-alt"
              size={props.icon.size}
              color="rgba(0,0,0,0)"
            />
          )}
          <Text
            {...props}
            style={[
              props.style,
              {
                opacity: 0,
              },
            ]}>
            {props.text}
          </Text>
        </View>
      </LinearGradient>
    </MaskedView>
  );
};

export default TextGradient;

const styles = StyleSheet.create({});
