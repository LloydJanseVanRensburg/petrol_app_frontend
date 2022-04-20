import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() =>
          props.navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]})
        }
      />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
