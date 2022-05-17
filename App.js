import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import Drawer from './navigators/Drawer';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddEntryScreen from './screens/AddEntryScreen';
import {ThemeProvider, createTheme} from 'channels-components/apis';
import AllEntriesScreen from './screens/AllEntriesScreen';
import TakePictureScreen from './screens/TakePictureScreen';

const Stack = createNativeStackNavigator();

const theme = createTheme({
  colors: {
    primary: '#08BDBD',
  },
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeDrawerScreen"
              component={Drawer}
              options={{headerShown: false}}
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
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
