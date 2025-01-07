import axios from 'axios';
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
import { API_URL } from '@env';
import app from '../styles/default';
import buttons from '../styles/constants/buttons';
import COLORS from '../styles/constants/colors';
import { BORDER, FONT, FONTSIZE } from '../styles/constants/styles';

const SignupForm = () => {
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
      confirmPassword: '',
    },
  });

  /**
   * Creates an account for new user
   * @param {Object} formData - The form data the user submits (email and password)
   */
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      if (formData.password !== formData.confirmPassword) {
        setLoading(false);
        return setError('Passwords do not match');
      }
      const isEmailAddr =
        /^[a-zA-z]+(\.)*(-)*(_)*[a-zA-z]*(@)[a-zA-z]+(\.)[a-zA-z]+$/gm;
      if (!isEmailAddr.test(formData.email)) {
        setLoading(false);
        return setError('Must use an email address');
      }
      const signupInfo = {
        email: formData.email,
        password: formData.password,
      };
      let requestUrl = `${API_URL}/jotter/signup`;
      let res = await axios.post(requestUrl, signupInfo);
      if (res.data.message) {
        return setError(res.data.message);
      }
      await login(signupInfo.email, signupInfo.password); // log user in
    } catch (err) {
      setIsLoggedIn(false);
      setError('Failed to sign up');
      console.error('Failed to sign up', err);
    } finally {
      reset({
        email: '',
        password: '',
        confirmPassword: '',
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
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{fieldRequired}</Text>
        )}
      </View>
      <View style={styles.controllerContainer}>
        <Controller
          name='confirmPassword'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Confirm password'
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
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{fieldRequired}</Text>
        )}
      </View>
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={loading}
      >
        <Text style={buttons.btnText1}>Sign up</Text>
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

export default SignupForm;
