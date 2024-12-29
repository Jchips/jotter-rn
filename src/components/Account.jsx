import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import app from '../styles/default';

const Account = ({ navigation }) => {
  const { user, logout } = useAuth();

  const logUserOut = () => {
    // navigation.navigate('Login');
    logout();
  };
  return (
    <View>
      <Text>{user?.email}</Text>
      <Pressable style={app.button} onPress={logUserOut}>
        <Text>Log Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Account;
