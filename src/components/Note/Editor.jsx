import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useMarkdown } from '../../contexts/MDContext';
import Preview from './Preview';
import SaveButton from '../Buttons/SaveButton';
import TogglePreview from '../Buttons/TogglePreview';
import app from '../../styles/default';
import COLORS from '../../styles/constants/colors';
import buttons from '../../styles/constants/buttons';
import { BORDER } from '../../styles/constants/styles';

const Editor = ({ navigation, route }) => {
  const { note } = route.params;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [noteDB, setNoteDB] = useState(note);
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
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          {error ? (
            <View style={app.errorAlert}>
              <Text>{error}</Text>
            </View>
          ) : null}
          {showPreview ? <Preview markdown={markdown} /> : null}
          <View style={styles.editorContainer}>
            <TextInput
              style={styles.editor}
              multiline
              value={markdown}
              onChangeText={update}
              placeholder='Write your markdown here...'
            />
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    flexDirection: 'column',
  },
  showPreviewBtn: {
    marginHorizontal: 10,
  },
  editorContainer: {
    flex: 1,
    backgroundColor: COLORS.graySubtle,
    borderRadius: BORDER.radius,
    padding: 5,
  },
  editor: {},
  // previewWrapper: {
  //   display:
  // },
});

export default Editor;
