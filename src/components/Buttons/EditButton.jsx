import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { BORDER } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';

const EditButton = ({ navigation, note }) => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate('Editor', { note: note })}
    >
      <Image
        source={{
          uri: `https://img.icons8.com/material-outlined/100/${COLORS.whiteNoHash}/edit--v1.png`,
        }}
        alt='edit button'
        style={styles.img}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: '100%',
    // paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: COLORS.themePurple,
    // marginHorizontal: 15,
    margin: 15,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  img: {
    width: 22,
    height: 22,
  },
});

export default EditButton;
