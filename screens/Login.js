import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  SecureInput,
  Typography,
} from '../channels-components/components';

const Login = ({navigation}) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Validate Pin
    // Make XHR request to validate pin
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
    }, 500);
  };

  return (
    <View style={styles.root}>
      <View style={styles.spacing}>
        <Typography variant="h1" style={styles.heading}>
          Let's Go
        </Typography>
      </View>

      <View style={styles.spacing}>
        <SecureInput digits={5} secretText={pin} setSecretText={setPin} />
      </View>

      <View style={styles.spacing}>
        <Button
          title="Sign In"
          style={styles.button}
          disabled={loading || pin.length !== 5}
          onPress={handleLogin}
          loading={loading}
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
