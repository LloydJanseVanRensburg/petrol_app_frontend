import {StyleSheet, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {Typography, Paper, Button} from 'channels-components/components';
import {EntriesContext} from '../../context/entries/EntriesProvider';

const EntryCard = ({id, data}) => {
  const {deleteEntry} = useContext(EntriesContext);

  const handleEntryDelete = async () => {
    deleteEntry(id);
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
