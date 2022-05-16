import React from 'react';
import Drawer from './navigators/Drawer';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddEntryScreen from './screens/AddEntryScreen';
import {ThemeProvider, createTheme} from 'channels-components/apis';
import AllEntriesScreen from './screens/AllEntriesScreen';
import EntriesProvider from './context/entries/EntriesProvider';
import TakePictureScreen from './screens/TakePictureScreen';

const Stack = createNativeStackNavigator();

const theme = createTheme({
  colors: {
    primary: '#08BDBD',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <EntriesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={Login}
              options={{title: '', headerShadowVisible: false}}
            />
            <Stack.Screen
              name="HomeScreen"
              component={Drawer}
              options={{
                title: '',
                headerStyle: {backgroundColor: theme.colors.primary},
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTintColor: theme.text.light,
              }}
            />
            <Stack.Screen
              name="AddEntryScreen"
              component={AddEntryScreen}
              options={{title: 'Add Entry'}}
            />
            <Stack.Screen
              name="TakePictureScreen"
              component={TakePictureScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AllEntriesScreen"
              component={AllEntriesScreen}
              options={{title: 'All Entries'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </EntriesProvider>
    </ThemeProvider>
  );
};

export default App;
