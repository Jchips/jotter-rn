import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import formatDate from '../../util/formatDate';
import { FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';
import app from '../../styles/default';

const NoteCard = ({ navigation, note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.h1Container}>
        <Text style={styles.h1}>{note.title}</Text>
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
      <Text style={styles.metaData}>{formatDate(note.createdAt)}</Text>
      <Text style={styles.metaData}>{formatDate(note.updatedAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.itemCard,
  },
  h1Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  h1: {
    fontSize: FONTSIZE.regular,
    fontFamily: FONT.bold,
  },
  img: {
    height: 23,
    width: 23,
  },
  metaData: {
    fontSize: FONTSIZE.smaller,
    fontFamily: FONT.regular,
    color: COLORS.mutedtext,
  },
});

export default NoteCard;
