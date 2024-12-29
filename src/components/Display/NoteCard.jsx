import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import formatDate from '../../util/formatDate';

const NoteCard = ({ navigation, note }) => {
  return (
    <View>
      <Text>{note.title}</Text>
      <Text>{formatDate(note.createdAt)}</Text>
      <Text>{formatDate(note.updatedAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NoteCard;
