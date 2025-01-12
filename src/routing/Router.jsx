import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import DrawerNav from './DrawerNav';
import Login from '../auth/Login';
import ViewNote from '../components/Note/ViewNote';
import Editor from '../components/Note/Editor';
import Signup from '../auth/Signup';
import COLORS from '../styles/constants/colors';
import { FONT } from '../styles/constants/styles';
// import Settings from './Settings';

const Stack = createStackNavigator();

const Router = () => {
  const { isLoggedIn, token } = useAuth();
  // console.log('signed in:', isLoggedIn); // delete later
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
                headerTintColor: COLORS.themePurpleText,
                headerShadowVisible: false,
                headerStyle: {
                  height: 90,
                },
                headerTitleStyle: {
                  fontFamily: FONT.semiBold,
                },
              }}
            />
            <Stack.Screen
              name='Editor'
              component={Editor}
              options={{
                headerTintColor: COLORS.themePurpleText,
                headerShadowVisible: false,
                headerStyle: {
                  height: 90,
                },
                headerTitleStyle: {
                  fontFamily: FONT.semiBold,
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
            <Stack.Screen
              name='Signup'
              component={Signup}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
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
  },
});

export default Router;
