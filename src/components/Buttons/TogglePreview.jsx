import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const TogglePreview = ({ showPreview }) => {
  return showPreview ? (
    <Image
      source={{
        uri: 'https://img.icons8.com/material-outlined/100/invisible.png',
      }}
      alt='show-preview'
      style={styles.img}
    />
  ) : (
    <Image
      source={{
        uri: 'https://img.icons8.com/material-outlined/100/visible--v1.png',
      }}
      alt='hide-preview'
      style={styles.img}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: 22,
    height: 22,
  },
});

export default TogglePreview;
