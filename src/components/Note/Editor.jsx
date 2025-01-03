import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
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

  useEffect(() => {
    setLoading(true);
    setNoteDB(note);
    setMarkdown(noteDB.content);
    setLoading(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: note.title,
      headerRight: () => {
        return (
          <>
            <Text style={styles.words}>{words} words</Text>
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
          </>
        );
      },
    });
  }, [navigation, markdown, showPreview]);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(setIsEditable)(true);
    });

  const update = (value) => {
    const lines = value.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    const secondLastLine = lines[lines.length - 2]?.trim() || '';
    const thirdLastLine = lines[lines.length - 3]?.trim() || '';
    let digit = /^(\d+)\.$/;

    if (lines.length > 1) {
      if (lastLine === '' && secondLastLine !== '') {
        if (secondLastLine.startsWith('* ')) {
          const newValue = value + '* ';
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
        secondLastLine === '' &&
        (thirdLastLine === '* ' || digit.test(thirdLastLine))
      ) {
        lines.splice(lines.length - 3, 1);
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
    marginHorizontal: 10,
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
});

export default Editor;
