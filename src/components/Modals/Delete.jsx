import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';
import api from '../../util/api';
import { FONT, FONTSIZE } from '../../styles/constants/styles';

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
          <View>
            {error ? (
              <View style={app.errorAlert}>
                <Text>{error}</Text>
              </View>
            ) : null}
            <View style={styles.modalContainer}>
              <Text>
                Are you sure that you want to delete{' '}
                <Text
                  style={{ color: COLORS.themePurpleText, ...app.boldText }}
                >
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
                  style={styles.img}
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
              style={[buttons.btn1, styles.button]}
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
    paddingHorizontal: 20,
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  warningNote: {
    fontSize: FONTSIZE.smaller,
    marginVertical: 25,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default Delete;
