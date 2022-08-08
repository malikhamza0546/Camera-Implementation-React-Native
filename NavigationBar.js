import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const NavigationBar = ({title, callback}) => {
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={callback} style={styles.btnBack}>
        <AntDesign name="arrowleft" color={'#000'} size={25} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 44,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  btnBack: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
