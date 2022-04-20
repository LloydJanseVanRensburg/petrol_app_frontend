import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator color="#CCC" size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
