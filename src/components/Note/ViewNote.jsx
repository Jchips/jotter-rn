import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useMarkdown } from '../../contexts/MDContext';
import app from '../../styles/default';
import noteView from '../../styles/constants/note';
import MARKDOWN from '../../styles/constants/markdown';
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
  }, []);

  return (
    <View style={app.container}>
      <Preview note={note} markdown={markdown} />
      {/* <ScrollView style={noteView.previewContainer}>
        <Markdown style={MARKDOWN}>{note.content}</Markdown>
      </ScrollView> */}
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
