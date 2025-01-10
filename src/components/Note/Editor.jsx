import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
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
  const [words, setWords] = useState(getWordCount(note.content));
  const [isEditable, setIsEditable] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const { markdown, setMarkdown } = useMarkdown();
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(setIsEditable)(true);
    });

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        note.title.length > 13
          ? note.title.substring(0, 13) + '...'
          : note.title,
      headerRight: () => {
        return (
          <>
            <Text style={styles.words}>{words} words</Text>
            <View style={styles.headerBtns}>
              <Pressable
                onPress={undo}
                disabled={undoStack.length < 1}
                style={{
                  ...styles.headerBtn,
                  backgroundColor:
                    undoStack?.length < 1
                      ? COLORS.graySubtle
                      : COLORS.themeWhite,
                }}
              >
                <Image
                  source={{
                    uri: 'https://img.icons8.com/material-outlined/100/undo.png',
                  }}
                  alt='undo-button'
                  style={styles.img}
                />
              </Pressable>
              <Pressable
                onPress={redo}
                disabled={redoStack.length < 1}
                style={{
                  ...styles.headerBtn,
                  backgroundColor:
                    redoStack?.length < 1
                      ? COLORS.graySubtle
                      : COLORS.themeWhite,
                }}
              >
                <Image
                  source={{
                    uri: 'https://img.icons8.com/material-outlined/100/redo.png',
                  }}
                  alt='redo-button'
                  style={styles.img}
                />
              </Pressable>
            </View>
          </>
        );
      },
    });
  }, [navigation, undoStack, redoStack]);

  // Clean up function to reset undo and redo stacks
  useEffect(() => {
    return () => {
      setUndoStack([]);
      setRedoStack([]);
    };
  }, []);

  /**
   * Updates the markdown content with every change the user makes
   * Auto-generates bullet points and number lists
   * Adds to the undo/redo stacks
   * @param {String} value - The current markdown content
   * @returns - exits the function
   */
  const update = (value) => {
    const lines = value.split('\n');
    const lastLine = lines[lines.length - 1] || '';
    const secondLastLine = lines[lines.length - 2] || '';
    let digit = /^(\d+)\.$/;

    if (lines.length > 1) {
      if (
        lastLine === '' &&
        secondLastLine !== '-' &&
        secondLastLine !== '*' &&
        !secondLastLine.match(digit) &&
        secondLastLine !== ''
      ) {
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
      } else if (secondLastLine === '-' && lastLine === '') {
        lines.splice(lines.length - 2, 1);
        const newValue = lines.join('\n');
        setMarkdown(newValue);
        return;
      } else if (secondLastLine === '*' && lastLine === '') {
        lines.splice(lines.length - 2, 1);
        const newValue = lines.join('\n');
        setMarkdown(newValue);
        return;
      } else if (secondLastLine.match(digit) && lastLine === '') {
        lines.splice(lines.length - 2, 1);
        const newValue = lines.join('\n');
        setMarkdown(newValue);
        return;
      }
    }

    setUndoStack([...undoStack, markdown]);
    setMarkdown(value);
    setRedoStack([]);
    setWords(getWordCount(value));
  };

  /**
   * (LIFO)
   * Add current markdown to redo stack
   * Set markdown to previous update
   * Remove last item (previous update) from undo stack
   */
  const undo = () => {
    if (undoStack.length > 0) {
      const prev = undoStack.pop();
      setRedoStack([markdown, ...redoStack]);
      setMarkdown(prev);
      setUndoStack([...undoStack]);
    }
  };

  /**
   * (LIFO)
   * Add current markdown to undo stack
   * Set markdown to next update
   * Remove the first item (next update) from redo stack
   */
  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack[0];
      setUndoStack([...undoStack, markdown]);
      setMarkdown(next);
      setRedoStack(redoStack.slice(1));
    }
  };

  return (
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
        <SaveButton note={note} markdown={markdown} setError={setError} />
      </View>
    </GestureHandlerRootView>
  );
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
  headerBtns: {
    height: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingRight: 5,
  },
  headerBtn: {
    ...buttons.outlineBtn1,
    height: 30,
    width: 50,
    marginHorizontal: 2,
  },
  footer: {
    height: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 22,
    width: 22,
  },
});

export default Editor;
