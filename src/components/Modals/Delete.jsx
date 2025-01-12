import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import api from '../../util/api';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';
import { FONT, FONTSIZE } from '../../styles/constants/styles';
import { moderateScale } from '../../util/scaling';

const Delete = (props) => {
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const {
    openDelete,
    setOpenDelete,
    notes,
    setNotes,
    note,
    folders,
    setFolders,
    folder,
  } = props;

  // Deletes the note or folder (and all its contents)
  const handleSubmit = async () => {
    try {
      setError('');
      setSaving(true);
      if (note) {
        await api.deleteNote(note.id);
        let notesCopy = [...notes];
        notesCopy.splice(notes.indexOf(note), 1);
        setNotes(notesCopy);
      } else {
        await api.deleteFolder(folder.id);
        let foldersCopy = [...folders];
        foldersCopy.splice(folders.indexOf(folder), 1);
        setFolders(foldersCopy);
      }
      setOpenDelete(false);
    } catch (err) {
      setError('Failed to delete ' + note ? 'note' : 'folder');
      console.error('Failed to delete note', err);
    }
    setSaving(false);
  };
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={openDelete}
      onRequestClose={() => {
        setOpenDelete(!openDelete);
      }}
    >
      <View style={app.centeredView}>
        <View style={app.modal}>
          <Text style={styles.header}>Delete</Text>
          <View style={styles.modalContainer}>
            {error ? (
              <View style={app.errorAlert}>
                <Text style={app.errorText}>{error}</Text>
              </View>
            ) : null}
            <Text style={styles.modalText}>
              Are you sure that you want to delete{' '}
              <Text style={{ color: COLORS.themePurpleText, ...app.boldText }}>
                {note?.title || folder?.title}
              </Text>
              ?
            </Text>
            <View style={styles.warningContainer}>
              <Image
                source={{
                  uri: `https://img.icons8.com/material-outlined/100/${COLORS.warningYellowNH}/error--v1.png`,
                }}
                alt='warning-icon'
                style={styles.icon}
              />
              {folder ? (
                <Text style={styles.warningNote}>
                  This will delete all folders and notes stored within{' '}
                  <Text style={app.boldText}>
                    {note?.title || folder?.title}
                  </Text>
                  .
                </Text>
              ) : (
                <Text style={styles.warningNote}>
                  This action cannot be undone.
                </Text>
              )}
            </View>
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={[buttons.outlineBtn1, styles.button]}
              onPress={() => {
                setOpenDelete(!openDelete);
                setError('');
              }}
            >
              <Text style={buttons.btnText2}>Cancel</Text>
            </Pressable>
            <Pressable
              style={{
                ...buttons.btn1,
                ...styles.button,
                backgroundColor: saving ? COLORS.btn1Hover : COLORS.themePurple,
              }}
              onPress={handleSubmit}
              disabled={saving}
            >
              <Text style={buttons.btnText1}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    ...app.header,
    marginBottom: 15,
  },
  modalContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  modalText: {
    fontFamily: FONT.regular,
    lineHeight: moderateScale(19),
    width: '100%',
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  warningNote: {
    fontFamily: FONT.regular,
    fontSize: moderateScale(FONTSIZE.smaller),
    marginVertical: 25,
    marginHorizontal: 3,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    height: 27,
    width: 27,
    marginHorizontal: 3,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Delete;
