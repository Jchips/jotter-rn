import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import app from '../styles/default';
import COLORS from '../styles/constants/colors';
import { FONT, FONTSIZE } from '../styles/constants/styles';

const Account = () => {
  const { user, logout } = useAuth();

  const logUserOut = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{user?.email}</Text>
      <Pressable style={app.button} onPress={logUserOut}>
        <Text style={app.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.themeWhite,
  },
  h1: {
    fontFamily: FONT.bold,
    fontSize: FONTSIZE.xlarge,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Account;
