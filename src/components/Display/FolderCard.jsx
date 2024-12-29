import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { BORDER, FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';

const FolderCard = ({ folder }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://img.icons8.com/material-outlined/24/${COLORS.textNoHash}/folder-invoices--v1.png`,
        }}
        alt='folder-icon'
        style={styles.img}
      />
      <Text style={styles.h1}>{folder.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4e4e7', // change based on theme
    borderRadius: BORDER.radius,
    marginVertical: 5,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  img: {
    height: 25,
    width: 25,
  },
  h1: {
    fontSize: FONTSIZE.xlarge,
    fontFamily: FONT.bold,
    color: COLORS.themePurpleText,
    marginHorizontal: 10,
  },
});

export default FolderCard;
