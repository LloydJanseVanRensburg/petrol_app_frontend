import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Typography, Paper, Button} from 'channels-components/components';
import {useMutation} from 'react-query';
import axios from 'axios';
import {API_URL} from '../../config/config';

const deleteEntry = id => {
  return axios.delete(`${API_URL}/entries/${id}`);
};

const EntryCard = ({id, data}) => {
  const mutation = useMutation(deleteEntry);

  const handleEntryDelete = () => {
    mutation.mutate(id);
  };

  return (
    <Paper style={styles.item}>
      <Pressable android_ripple={{color: '#ccc'}} style={styles.button}>
        <Typography>Amount: {data.amount}</Typography>
        <Typography>Liters: {data.liters}</Typography>
        <Typography>Trip Distance: {data.distance}</Typography>
        <Typography>ODO: {data.odo}</Typography>
        <Typography>Location: {data.location}</Typography>
        <Button title="Edit" />
        <Button color="secondary" title="Delete" onPress={handleEntryDelete} />
      </Pressable>
    </Paper>
  );
};

export default EntryCard;

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
  },
  button: {
    padding: 16,
  },
});
