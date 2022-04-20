import {StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import {Paper, Typography} from '../../channels-components/components';

const MenuCard = ({data}) => {
  return (
    <View style={styles.outerItem}>
      <Paper style={styles.menuItem}>
        <Pressable
          android_ripple={{color: '#ccc'}}
          style={styles.innerItem}
          onPress={data.cb}>
          <Typography variant="h3">{data.title}</Typography>
        </Pressable>
      </Paper>
    </View>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  outerItem: {
    padding: 4,
    width: '100%',
    flex: 1,
  },
  menuItem: {
    height: 100,
    overflow: 'hidden',
  },
  innerItem: {
    padding: 16,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});
