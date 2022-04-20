import React, {useContext, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Typography} from '../channels-components/components';
import EntryCard from '../components/EntryCard';
import LoadingScreen from '../components/LoadingScreen';
import {EntriesContext} from '../context/entries/EntriesProvider';

const AllEntriesScreen = () => {
  const {loadAllEntries, error, loading, entries} = useContext(EntriesContext);

  useEffect(() => {
    loadAllEntries();
  }, [loadAllEntries]);

  const handleRenderListItem = itemData => {
    return <EntryCard id={itemData.item.id} data={itemData.item.attributes} />;
  };

  return (
    <>
      {error && <Typography>{error}</Typography>}

      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.screenOuter}>
          <FlatList
            data={entries}
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
