import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import api from '../../util/api';
import buttons from '../../styles/constants/buttons';

const SaveButton = ({ note, markdown, setNoteDB, setError }) => {
  const [saving, setSaving] = useState(false);
  const saveNote = async () => {
    try {
      setError('');
      setSaving(true);
      let res = await api.updateNote(
        {
          content: markdown,
          updatedAt: Date.now(),
        },
        note.id
      );
      // note = res.data;
      console.log('res.data:', res.data); // delete later
      setNoteDB(res.data);
    } catch (err) {
      setError('Failed to save changes');
      console.error('Failed to save changes', err);
    }
    setSaving(false);
  };
  return (
    <Pressable disabled={saving} onPress={saveNote} style={buttons.outlineBtn1}>
      <Image
        source={{
          uri: `https://img.icons8.com/material-outlined/100/save.png`,
        }}
        alt='save-button'
        style={styles.img}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 22,
    height: 22,
  },
});

export default SaveButton;
