import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Typography} from 'channels-components/components';
import EntryCard from '../components/EntryCard';
import LoadingScreen from '../components/LoadingScreen';
import {useQuery} from 'react-query';
import axios from 'axios';
import {API_URL} from '../config/config';

const AllEntriesScreen = () => {
  const {
    data: {
      data: {data},
    },
    isLoading,
    isError,
    error,
  } = useQuery('all-entries', () => axios.get(`${API_URL}/entries`));

  const handleRenderListItem = itemData => {
    return <EntryCard id={itemData.item.id} data={itemData.item.attributes} />;
  };

  return (
    <>
      {isError && <Typography>{error}</Typography>}

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.screenOuter}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id}
            renderItem={handleRenderListItem}
            style={styles.screenInner}
          />
        </View>
      )}
    </>
  );
};

export default AllEntriesScreen;

const styles = StyleSheet.create({
  screenOuter: {
    paddingBottom: 16,
  },
  screenInner: {
    paddingHorizontal: 16,
  },
});
