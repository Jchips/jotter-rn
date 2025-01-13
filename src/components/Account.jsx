import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { app, buttons, FONT, FONTSIZE } from '../styles';

const Account = () => {
  const { user, logout } = useAuth();

  // logs user out
  const logUserOut = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{user?.email}</Text>
      <Pressable style={styles.button} onPress={logUserOut}>
        <Text style={buttons.btnText1}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    alignItems: 'center',
    padding: 30,
  },
  h1: {
    fontFamily: FONT.bold,
    fontSize: FONTSIZE.xlarge,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    ...buttons.btn2,
    width: '100%',
  },
});

export default Account;
