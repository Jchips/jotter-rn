import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import COLORS from '../../styles/constants/colors';
import buttons from '../../styles/constants/buttons';

const EditButton = ({ navigation, note }) => {
  return (
    <Pressable
      style={buttons.roundBtn}
      onPress={() => navigation.navigate('Editor', { note: note })}
    >
      <Image
        source={{
          uri: `https://img.icons8.com/material-outlined/100/${COLORS.whiteNoHash}/edit--v1.png`,
        }}
        alt='edit button'
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});

export default EditButton;
