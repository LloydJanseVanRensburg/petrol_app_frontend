import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import {useMutation} from 'react-query';
import {Button, Input, Typography} from 'channels-components/components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {API_URL} from '../config/config';

const Login = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter valid email')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Min 6 characters')
        .max(20, 'Max 20 characters')
        .required('Required'),
    }),
    onSubmit: onLogin,
  });

  const mutation = useMutation(handleLogin);

  function handleLogin(userInfo) {
    return axios.post(`${API_URL}/auth/local`, userInfo);
  }

  function onLogin(values) {
    const userInfo = {
      identifier: values.email,
      password: values.password,
    };

    console.log(userInfo);

    mutation.mutate(userInfo, {
      onSettled: () => {
        formik.setSubmitting(false);
      },
      onError: (error, _variables, _context) => {
        console.log(error);
      },
      onSuccess: () => {
        navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
      },
    });
  }

  return (
    <View style={styles.root}>
      <View style={styles.spacing}>
        <Typography variant="h1" style={styles.heading}>
          Let's Go
        </Typography>
      </View>

      <View style={styles.spacing}>
        <Typography variant="body1">Email</Typography>

        <Input
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />

        {formik.touched.email && formik.errors.email && (
          <Typography variant="body2">{formik.errors.email}</Typography>
        )}
      </View>

      <View style={styles.spacing}>
        <Typography variant="body1">Password</Typography>

        <Input
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry={true}
        />

        {formik.touched.password && formik.errors.password && (
          <Typography variant="body2">{formik.errors.password}</Typography>
        )}
      </View>

      <View style={styles.spacing}>
        <Button
          title="Sign In"
          style={styles.button}
          disabled={
            !formik.isValid ||
            formik.isSubmitting ||
            (!formik.dirty && formik.isValid)
          }
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 4,
  },
  spacing: {
    marginVertical: 16,
    width: '100%',
  },
});
