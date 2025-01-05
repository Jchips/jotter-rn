import React, { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import api from '../../util/api';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';

const SaveButton = ({ note, markdown, setError }) => {
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
      console.log('res.data:', res.data); // delete later
    } catch (err) {
      setError('Failed to save changes');
      console.error('Failed to save changes', err);
    }
    setSaving(false);
  };
  return (
    <Pressable
      disabled={saving}
      onPress={saveNote}
      style={{
        ...styles.saveButton,
        backgroundColor: saving
          ? `${COLORS.graySubtle}`
          : `${COLORS.themeWhite}`,
      }}
    >
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
  saveButton: {
    ...buttons.outlineBtn1,
    height: 40,
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 10,
  },
  img: {
    width: 22,
    height: 22,
  },
});

export default SaveButton;
