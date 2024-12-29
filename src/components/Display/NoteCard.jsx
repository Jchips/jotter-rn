import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import formatDate from '../../util/formatDate';
import { BORDER } from '../../styles/constants/styles';
import { FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';

const NoteCard = ({ navigation, note }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{note.title}</Text>
      <Text style={styles.metaData}>{formatDate(note.createdAt)}</Text>
      <Text style={styles.metaData}>{formatDate(note.updatedAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  h1: {
    fontSize: FONTSIZE.large,
    fontFamily: FONT.bold,
    marginBottom: 10,
  },
  metaData: {
    fontSize: FONTSIZE.small,
    fontFamily: FONT.regular,
    color: '#a1a1aa',
  },
});

export default NoteCard;
