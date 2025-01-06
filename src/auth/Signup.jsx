import React from 'react';
import { StyleSheet, SafeAreaView, Text, Pressable } from 'react-native';
import JotterText from '../components/JotterText';
import SignupForm from './SignupForm';
import app from '../styles/default';
import buttons from '../styles/constants/buttons';
import { FONT, FONTSIZE } from '../styles/constants/styles';

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <JotterText />
      <Text style={styles.formHeader}>Sign up</Text>
      <SignupForm />
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
            routes: [{ name: 'Login' }],
          })
        }
      >
        <Text style={buttons.btnText2}>Log in to account</Text>
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

export default Signup;
