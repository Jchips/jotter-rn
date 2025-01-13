import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useMarkdown } from '../../contexts/MDContext';
import app from '../../styles/appDefault';
import EditButton from '../Buttons/EditButton';
import Preview from './Preview';
// import COLORS from '../../styles/constants/colors';
import { COLORS } from '../../styles';

const ViewNote = ({ navigation, route }) => {
  const { note } = route.params;
  const { markdown, setMarkdown } = useMarkdown();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: note.title,
      headerTint: COLORS.themePurpleText,
    });
  }, [navigation]);

  useEffect(() => {
    setMarkdown(note.content);
  }, [note]);

  return (
    <View style={styles.container}>
      <Preview note={note} markdown={markdown} />
      <EditButton navigation={navigation} note={note} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    paddingVertical: 10,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default ViewNote;
