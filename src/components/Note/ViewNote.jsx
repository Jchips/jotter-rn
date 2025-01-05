import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useMarkdown } from '../../contexts/MDContext';
import app from '../../styles/default';
import EditButton from '../Buttons/EditButton';
import Preview from './Preview';

const ViewNote = ({ navigation, route }) => {
  const { note } = route.params;
  const { markdown, setMarkdown } = useMarkdown();
  useEffect(() => {
    navigation.setOptions({ headerTitle: note.title });
  }, [navigation]);

  useEffect(() => {
    setMarkdown(note.content);
  }, [note]);

  return (
    <View style={app.container}>
      <Preview note={note} markdown={markdown} />
      <EditButton navigation={navigation} note={note} />
    </View>
  );
};

const styles = StyleSheet.create({
  editBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default ViewNote;
