import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'channels-components/components';
import {API_URL} from '../config/config';
import FormInputGroup from '../components/FormInputGroup';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from 'react-query';
import axios from 'axios';

const AddEntryScreen = ({navigation, route}) => {
  // Form Input Refs
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const input5Ref = useRef();

  const [receipt, setReceipt] = useState(null);

  const formik = useFormik({
    initialValues: {
      amount: '',
      liters: '',
      odo: '',
      distance: '',
      location: '',
    },
    validationSchema: Yup.object({
      amount: Yup.string().required('Required'),
      liters: Yup.string().required('Required'),
      odo: Yup.string().required('Required'),
      distance: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
    }),
    onSubmit: onAddEntry,
  });

  function onAddEntry(values) {
    mutation.mutate({
      amount: values.amount,
      liters: values.liters,
      odo: values.odo,
      location: values.location,
      distance: values.distance,
    });
  }

  const mutation = useMutation(handleAddEntry, {
    onSettled: () => {
      formik.setSubmitting(false);
    },
    onSuccess: () => {
      formik.resetForm();
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeDrawerScreen'}, {name: 'AllEntriesScreen'}],
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  function handleAddEntry(entry) {
    const data = {
      ...entry,
    };

    const formData = {
      data,
      files: {
        receipt: {
          uri: receipt.uri,
          name: `RECEIPT-${Date.now()}`,
          type: 'images/jpg',
        },
      },
    };

    return axios.post(`${API_URL}/entries`, formData);
  }

  useEffect(() => {
    if (route.params?.picture) {
      setReceipt(route.params.picture);
    }
  }, [route]);

  function handleTakePicture() {
    navigation.navigate('TakePictureScreen');
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.spacing}>
        <FormInputGroup
          label="Amount (R)"
          isTouched={formik.touched.amount}
          error={formik.errors.amount}
          ref={input1Ref}
          blurOnSubmit={false}
          onSubmitEditing={() => input2Ref.current.focus()}
          value={formik.values.amount}
          onChangeText={formik.handleChange('amount')}
          onBlur={formik.handleBlur('amount')}
          keyboardType="number-pad"
          returnKeyType="next"
        />
      </View>

      <View style={styles.spacing}>
        <FormInputGroup
          label="Liters"
          isTouched={formik.touched.liters}
          error={formik.errors.liters}
          ref={input2Ref}
          blurOnSubmit={false}
          onSubmitEditing={() => input3Ref.current.focus()}
          value={formik.values.liters}
          onChangeText={formik.handleChange('liters')}
          onBlur={formik.handleBlur('liters')}
          keyboardType="number-pad"
          returnKeyType="next"
        />
      </View>

      <View style={styles.spacing}>
        <FormInputGroup
          label="ODO (KM)"
          isTouched={formik.touched.odo}
          error={formik.errors.odo}
          ref={input3Ref}
          blurOnSubmit={false}
          onSubmitEditing={() => input4Ref.current.focus()}
          value={formik.values.odo}
          onChangeText={formik.handleChange('odo')}
          onBlur={formik.handleBlur('odo')}
          keyboardType="number-pad"
          returnKeyType="next"
        />
      </View>

      <View style={styles.spacing}>
        <FormInputGroup
          label="Trip Distance (KM)"
          isTouched={formik.touched.distance}
          error={formik.errors.distance}
          ref={input4Ref}
          blurOnSubmit={false}
          onSubmitEditing={() => input5Ref.current.focus()}
          value={formik.values.distance}
          onChangeText={formik.handleChange('distance')}
          onBlur={formik.handleBlur('distance')}
          keyboardType="number-pad"
          returnKeyType="next"
        />
      </View>

      <View style={styles.spacing}>
        <FormInputGroup
          label="Location"
          isTouched={formik.touched.location}
          error={formik.errors.location}
          ref={input5Ref}
          value={formik.values.location}
          onChangeText={formik.handleChange('location')}
          onBlur={formik.handleBlur('location')}
          returnKeyType="done"
        />
      </View>

      <View style={styles.spacing}>
        <Button
          title="Take Picture"
          onPress={handleTakePicture}
          style={styles.button}
        />
      </View>

      <View style={styles.spacing}>
        <Button
          title="Add"
          style={styles.button}
          onPress={formik.handleSubmit}
          disabled={
            !formik.isValid ||
            formik.isSubmitting ||
            (!formik.dirty && formik.isValid) ||
            receipt === null
          }
          loading={formik.isSubmitting}
        />
      </View>
    </ScrollView>
  );
};

export default AddEntryScreen;

const styles = StyleSheet.create({
  root: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  spacing: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
  },
  button: {
    borderRadius: 4,
  },
});
