import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import LoginForm from './LoginForm';
import { FONT, FONTSIZE } from '../styles/constants/styles';
import app from '../styles/default';
import buttons from '../styles/constants/buttons';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>J</Text>
        <Image
          style={styles.img}
          source={require('../../assets/imgs/jotter-circle.png')}
          alt='Jotter logo'
        />
        <Text style={styles.header}>tter</Text>
      </View>
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
            routes: [{ name: 'Sign up' }],
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
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  img: {
    width: 28,
    height: 28,
    marginLeft: 3,
    marginRight: 4,
    marginTop: 4,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  formHeader: {
    fontSize: FONTSIZE.large,
    fontFamily: FONT.bold,
  },
});

export default Login;
