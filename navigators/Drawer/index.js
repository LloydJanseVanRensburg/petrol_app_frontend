import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutScreen from '../../screens/AboutScreen';
import HomeScreen from '../../screens/HomeScreen';
import DrawerContent from '../DrawerContent';
import {useThemeProvider} from 'channels-components/apis';

const Drawer = createDrawerNavigator();

const getDrawerContent = props => {
  return <DrawerContent {...props} />;
};

const DrawerNavigator = () => {
  const theme = useThemeProvider();

  return (
    <Drawer.Navigator drawerContent={getDrawerContent}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          headerStyle: {backgroundColor: theme.colors.primary},
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerTintColor: theme.text.light,
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: 'About',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
