import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { BORDER, FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';
import app from '../../styles/default';

const FolderCard = ({ folder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.h1Container}>
        <Image
          source={{
            uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/folder-invoices--v1.png`,
          }}
          alt='folder-icon'
          style={styles.img}
        />
        <Text style={styles.h1}>{folder.title}</Text>
      </View>
      <Pressable>
        <Image
          source={{
            uri: `https://img.icons8.com/material-outlined/100/more.png`,
          }}
          alt='more-icon'
          style={styles.img}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.itemCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: 23,
    width: 23,
  },
  h1Container: {
    flexDirection: 'row',
  },
  h1: {
    fontSize: FONTSIZE.regular,
    fontFamily: FONT.bold,
    color: COLORS.themePurpleText,
    marginHorizontal: 10,
  },
});

export default FolderCard;
