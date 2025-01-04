import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useMarkdown } from '../../contexts/MDContext';
import Preview from './Preview';
import EditNote from './EditNote';
import SaveButton from '../Buttons/SaveButton';
import TogglePreview from '../Buttons/TogglePreview';
import getWordCount from '../../util/getWordCount';
import app from '../../styles/default';
import COLORS from '../../styles/constants/colors';
import buttons from '../../styles/constants/buttons';
import { FONTSIZE } from '../../styles/constants/styles';

const Editor = ({ navigation, route }) => {
  const { note } = route.params;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [noteDB, setNoteDB] = useState(note);
  const [words, setWords] = useState(getWordCount(note.content));
  const [isEditable, setIsEditable] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const { markdown, setMarkdown } = useMarkdown();

  // useEffect(() => {
  //   setLoading(true);
  //   setNoteDB(note);
  //   setMarkdown(noteDB.content);
  //   setLoading(false);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setNoteDB(note);
      setMarkdown(noteDB.content);
      setLoading(false);
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: note.title,
      headerRight: () => {
        return (
          <>
            <Text style={styles.words}>{words} words</Text>
          </>
        );
      },
    });
  }, [navigation]);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(setIsEditable)(true);
    });

  const update = (value) => {
    const lines = value.split('\n');
    const lastLine = lines[lines.length - 1].trim() || '';
    const secondLastLine = lines[lines.length - 2]?.trim() || '';
    const thirdLastLine = lines[lines.length - 3]?.trim() || '';
    const thirdLastLineMatchDash = thirdLastLine.match(/^(-\s+)/);
    const thirdLastLineMatchBullet = thirdLastLine.match(/^(\*\s+)/);
    let digit = /^(\d+)\.$/;

    if (lines.length > 1) {
      if (lastLine === '' && secondLastLine !== '') {
        if (secondLastLine.startsWith('* ')) {
          const newValue = value + '* ';
          setMarkdown(newValue);
          return;
        }
        if (secondLastLine.startsWith('- ')) {
          const newValue = value + '- ';
          setMarkdown(newValue);
          return;
        }
        const match = secondLastLine.match(/^(\d+)\. /);
        if (match) {
          const count = parseInt(match[1], 10);
          const newValue = value + `${count + 1}. `;
          setMarkdown(newValue);
          return;
        }
      }

      if (
        lastLine === '' &&
        secondLastLine ===
          ''(
            thirdLastLineMatchBullet ||
              thirdLastLineMatchDash ||
              digit.test(thirdLastLine)
          )
      ) {
        lines.splice(lines.length - 3, 1);
        console.log('here'); // delete later
        const newValue = lines.join('\n');
        setMarkdown(newValue);
        return;
      }
    }

    setMarkdown(value);
    setWords(getWordCount(value));
  };

  return !loading ? (
    <GestureHandlerRootView style={styles.container}>
      {error ? (
        <View style={app.errorAlert}>
          <Text>{error}</Text>
        </View>
      ) : null}
      {showPreview ? <Preview markdown={markdown} /> : null}
      <GestureDetector gesture={doubleTap}>
        <View style={styles.editorContainer}>
          <EditNote
            isEditable={isEditable}
            markdown={markdown}
            setIsEditable={setIsEditable}
            update={update}
            doubleTap={doubleTap}
          />
        </View>
      </GestureDetector>
      <View style={styles.footer}>
        <Pressable
          onPress={() => setShowPreview(!showPreview)}
          style={styles.showPreviewBtn}
        >
          <TogglePreview showPreview={showPreview} />
        </Pressable>
        <SaveButton
          note={note}
          markdown={markdown}
          setNoteDB={setNoteDB}
          setError={setError}
        />
      </View>
    </GestureHandlerRootView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    paddingTop: 10,
    flexDirection: 'column',
  },
  showPreviewBtn: {
    ...buttons.outlineBtn1,
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    marginVertical: 0,
  },
  editorContainer: {
    flex: 1,
    padding: 5,
    borderTopWidth: 1,
    borderColor: COLORS.graySubtle,
  },
  words: {
    textAlign: 'center',
    fontSize: FONTSIZE.smaller,
    marginHorizontal: 10,
  },
  footer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Editor;
