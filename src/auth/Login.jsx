import React from 'react';
import { StyleSheet, SafeAreaView, Text, Pressable } from 'react-native';
import LoginForm from './LoginForm';
import { FONTSIZE } from '../styles/constants/styles';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Log in</Text>
      <LoginForm />
      <Pressable
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Sign up' }],
          })
        }
      >
        <Text style={{ fontSize: FONTSIZE.regular }}>
          Don't have an account? Sign up
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Login;
