import {StyleSheet, View} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {useMutation} from 'react-query';
import {Button, Typography} from 'channels-components/components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {API_URL} from '../config/config';
import FormInputGroup from '../components/FormInputGroup';
import {useThemeProvider} from 'channels-components/apis';

const Login = ({navigation}) => {
  const theme = useThemeProvider();

  const emailRef = useRef();
  const passwordRef = useRef();

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

  function onLogin(values) {
    const userInfo = {
      identifier: values.email,
      password: values.password,
    };

    mutation.mutate(userInfo);
  }

  const mutation = useMutation(handleLogin, {
    onSettled: () => {
      formik.setSubmitting(false);
    },
    onError: () => {
      formik.setErrors({
        form: 'Invalid email or password',
      });
      emailRef.current.focus();
      setTimeout(() => {
        formik.setErrors({});
      }, 5000);
    },
    onSuccess: () => {
      navigation.reset({index: 0, routes: [{name: 'HomeDrawerScreen'}]});
    },
  });

  function handleLogin(userInfo) {
    return axios.post(`${API_URL}/auth/local`, userInfo);
  }

  const styles = useMemo(() => {
    return StyleSheet.create({
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
      error_container: {
        borderWidth: 2,
        borderColor: theme.colors.error,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
      error_message: {
        color: theme.colors.error,
      },
    });
  }, [theme]);

  return (
    <View style={styles.root}>
      <View style={styles.spacing}>
        <Typography variant="h1" style={styles.heading}>
          Login
        </Typography>
      </View>

      {formik.errors.form && (
        <View style={[styles.spacing, styles.error_container]}>
          <Typography variant="body2" style={styles.error_message}>
            {formik.errors.form}
          </Typography>
        </View>
      )}

      <View style={styles.spacing}>
        <FormInputGroup
          ref={emailRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          label="Email"
          isTouched={formik.touched.email}
          error={formik.errors.email}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          autoComplete="off"
        />
      </View>

      <View style={styles.spacing}>
        <FormInputGroup
          ref={passwordRef}
          returnKeyType="done"
          label="Password"
          isTouched={formik.touched.password}
          error={formik.errors.password}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          onSubmitEditing={() => formik.isValid && formik.handleSubmit()}
          secureTextEntry={true}
        />
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
