import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import DrawerNav from './DrawerNav';
import Login from '../auth/Login';
import ViewNote from '../components/Note/ViewNote';
import EditButton from '../components/Buttons/EditButton';
import Editor from '../components/Note/Editor';
// import Settings from './Settings';

const Stack = createStackNavigator();

const Routing = () => {
  const { isLoggedIn, token } = useAuth();
  console.log('signed in:', isLoggedIn); // delete later
  console.log('token:', token); // delete later
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name='Drawer'
              component={DrawerNav}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='View'
              component={ViewNote}
              options={{
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name='Editor'
              component={Editor}
              options={{
                headerShadowVisible: false,
                headerStyle: {
                  height: 68,
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name='Sign Up'
              component={S}
            /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Routing;
