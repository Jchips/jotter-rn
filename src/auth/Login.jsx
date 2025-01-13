import React from 'react';
import { StyleSheet, SafeAreaView, Text, Pressable } from 'react-native';
import LoginForm from './LoginForm';
import JotterText from '../components/JotterText';
// import app from '../styles/appDefault';
// import buttons from '../styles/constants/buttons';
// import { FONT, FONTSIZE } from '../styles/constants/constants';
import { app, FONT, FONTSIZE, buttons } from '../styles';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <JotterText />
      <Text style={styles.formHeader}>Log in</Text>
      <LoginForm />
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: FONTSIZE.regular,
          marginBottom: 10,
        }}
      >
        or
      </Text>
      <Pressable
        style={buttons.outlineBtn1}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Signup' }],
          })
        }
      >
        <Text style={buttons.btnText2}>Create an account</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  formHeader: {
    fontSize: FONTSIZE.large,
    fontFamily: FONT.bold,
  },
});

export default Login;
