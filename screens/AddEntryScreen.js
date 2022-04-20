import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';
import {Button, Input, Typography} from '../channels-components/components';
import {API_URL} from '../config/config';
import {EntriesContext} from '../context/entries/EntriesProvider';

const AddEntryScreen = ({navigation, route}) => {
  // Global Entries
  const {setEntries} = useContext(EntriesContext);

  // Form State
  const [amount, setAmount] = useState();
  const [liters, setLiters] = useState();
  const [odo, setOdo] = useState();
  const [tripDistance, setTripDistance] = useState();
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Form Input Refs
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const input5Ref = useRef();

  const submitEntry = async () => {
    try {
      // Validate All Fields for correctness
      if (
        !amount ||
        !liters ||
        !odo ||
        !tripDistance ||
        !location ||
        !receipt
      ) {
        console.error('Invalid form');
        return;
      }

      setLoading(true);

      const formData = new FormData();

      const data = {
        amount,
        liters,
        odo,
        location,
        distance: tripDistance,
      };

      formData.append('data', JSON.stringify(data));
      formData.append('files.receipt', {
        uri: receipt.uri,
        name: `RECEIPT-${Date.now()}`,
        type: 'images/jpg',
      });

      const entryRes = await fetch(`${API_URL}/entries`, {
        method: 'POST',
        body: formData,
      });

      const entryData = await entryRes.json();

      if (!entryRes.ok) {
        console.error('Something went wrong');
        console.error(entryData);
        setLoading(false);
        return;
      }

      // Would have to connect to the context global state to add item to list
      setEntries();

      setLoading(false);
      setAmount(null);
      setLiters(null);
      setOdo(null);
      setTripDistance(null);
      setReceipt(null);
      setLocation('');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const isDisabledButton = () => {
    if (
      !amount ||
      !liters ||
      !odo ||
      !tripDistance ||
      !location ||
      loading ||
      !receipt
    ) {
      return true;
    }
  };

  const handleTakePicture = () => {
    navigation.navigate('TakePictureScreen');
  };

  useEffect(() => {
    if (route.params && route.params.picture) {
      setReceipt(route.params.picture);
    }
  }, [route]);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.spacing}>
        <Typography style={styles.label}>Amount (R)</Typography>
        <Input
          keyboardType="number-pad"
          returnKeyType="next"
          value={amount}
          onChangeText={setAmount}
          blurOnSubmit={false}
          ref={input1Ref}
          onSubmitEditing={() => input2Ref.current.focus()}
        />
      </View>

      <View style={styles.spacing}>
        <Typography style={styles.label}>Liters (R)</Typography>
        <Input
          keyboardType="number-pad"
          returnKeyType="next"
          value={liters}
          onChangeText={setLiters}
          blurOnSubmit={false}
          ref={input2Ref}
          onSubmitEditing={() => input3Ref.current.focus()}
        />
      </View>

      <View style={styles.spacing}>
        <Typography style={styles.label}>ODO (KM)</Typography>
        <Input
          keyboardType="number-pad"
          value={odo}
          onChangeText={setOdo}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={input3Ref}
          onSubmitEditing={() => input4Ref.current.focus()}
        />
      </View>

      <View style={styles.spacing}>
        <Typography style={styles.label}>Trip Distance (KM)</Typography>
        <Input
          keyboardType="number-pad"
          returnKeyType="next"
          value={tripDistance}
          onChangeText={setTripDistance}
          blurOnSubmit={false}
          ref={input4Ref}
          onSubmitEditing={() => input5Ref.current.focus()}
        />
      </View>

      <View style={styles.spacing}>
        <Typography style={styles.label}>Location</Typography>
        <Input
          value={location}
          onChangeText={setLocation}
          returnKeyType="done"
          ref={input5Ref}
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
          onPress={submitEntry}
          disabled={isDisabledButton()}
          loading={loading}
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
