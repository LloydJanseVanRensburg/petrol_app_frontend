import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutScreen from '../../screens/AboutScreen';
import HomeScreen from '../../screens/HomeScreen';
import DrawerContent from '../DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
