import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {Button} from '../channels-components/components';
import Icon from 'react-native-vector-icons/Ionicons';

const TakePictureScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const camera = useRef();

  const takePicture = async () => {
    try {
      setLoading(true);
      const options = {quality: 0.85, base64: true, pauseAfterCapture: true};
      const data = await camera.current.takePictureAsync(options);
      setPicture(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptPicture = () => {
    navigation.navigate('AddEntryScreen', {picture: picture});
  };

  const rejectPicture = () => {
    setPicture(null);
    camera.current.resumePreview();
  };

  return (
    <View style={styles.cameraScreen}>
      <RNCamera
        ref={camera}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        style={styles.camera}>
        {picture ? (
          <View style={styles.previewButtons}>
            <Button
              onPress={rejectPicture}
              color="secondary"
              loading={loading}
              disabled={loading}
              icon={<Icon name="close-outline" color="#fff" size={35} />}
              style={styles.captureBtn}
            />

            <Button
              onPress={acceptPicture}
              loading={loading}
              disabled={loading}
              icon={<Icon name="checkmark-outline" color="#fff" size={35} />}
              style={styles.captureBtn}
            />
          </View>
        ) : (
          <Button
            onPress={takePicture}
            loading={loading}
            disabled={loading}
            icon={<Icon name="camera-outline" color="#fff" size={35} />}
            style={styles.captureBtn}
          />
        )}
      </RNCamera>
    </View>
  );
};

export default TakePictureScreen;

const styles = StyleSheet.create({
  cameraScreen: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  captureBtn: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
});
