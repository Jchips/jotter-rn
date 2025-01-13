import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
// import app from '../styles/appDefault';
// import buttons from '../styles/constants/buttons';
// import COLORS from '../styles/constants/colors';
// import { BORDER, FONT, FONTSIZE } from '../styles/constants/constants';
import { app, COLORS, FONT, FONTSIZE, BORDER, buttons } from '../styles';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, setIsLoggedIn } = useAuth();
  const fieldRequired = 'This field is required';
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Logs user into Jotter
   * @param {Object} formData - The form data the user submits (email and password)
   */
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      let res = await login(formData.email, formData.password);
      if (res?.response?.data === 'Invalid login') {
        setIsLoggedIn(false);
        setError('Incorrect email or password');
      }
    } catch (err) {
      setIsLoggedIn(false);
      setError(
        error.message === 'Request failed with status code 403'
          ? 'Incorrect email or password'
          : 'Sorry, there has been a server error :('
      );
      console.error(err);
    } finally {
      reset({
        email: '',
        password: '',
      });
      setLoading(false);
      Keyboard.dismiss();
    }
  };
  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorAlert}>
          <Text>{error}</Text>
        </View>
      ) : null}
      <View style={styles.controllerContainer}>
        <Controller
          name='email'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              autoCapitalize='none'
              autoCorrect={false}
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{fieldRequired}</Text>}
      </View>

      <View style={styles.controllerContainer}>
        <Controller
          name='password'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              textContentType='password'
              autoCapitalize='none'
              autoCorrect={false}
              onSubmitEditing={handleSubmit(onSubmit)}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{fieldRequired}</Text>
        )}
      </View>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={loading}
      >
        <Text style={buttons.btnText1}>Log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  errorAlert: {
    ...app.errorAlert,
    marginHorizontal: 0,
  },
  controllerContainer: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: BORDER.color,
    borderRadius: BORDER.radius,
    padding: 5,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 5,
  },
  button: {
    ...buttons.btn2,
    marginHorizontal: 0,
  },
  errorText: {
    fontFamily: FONT.bold,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.themePurpleText,
  },
});

export default LoginForm;
