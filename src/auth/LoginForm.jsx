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
import app from '../styles/default';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, setIsLoggedIn, token } = useAuth();
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
          ? 'Incorrect username or password'
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
    <View>
      {error ? (
        <View style={app.errorAlert}>
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
        style={app.button}
        disabled={loading}
      >
        <Text>Log In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
