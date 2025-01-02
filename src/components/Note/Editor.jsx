import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useMarkdown } from '../../contexts/MDContext';
import Preview from './Preview';
import SaveButton from '../Buttons/SaveButton';
import app from '../../styles/default';

const Editor = ({ navigation, route }) => {
  const { note } = route.params;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [noteDB, setNoteDB] = useState(note);
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
          <SaveButton
            note={note}
            markdown={markdown}
            setNoteDB={setNoteDB}
            setError={setError}
          />
        );
      },
    });
  }, [navigation, markdown]);

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
          <Preview markdown={markdown} />
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
  editorContainer: {
    flex: 1,
    // margin: 10,
    // padding: 10,
  },
  editor: {},
});

export default Editor;
