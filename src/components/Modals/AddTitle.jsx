import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import api from '../../util/api';
// import app from '../../styles/appDefault';
// import buttons from '../../styles/constants/buttons';
// import COLORS from '../../styles/constants/colors';
// import { BORDER } from '../../styles/constants/constants';
import { app, COLORS, BORDER, buttons } from '../../styles';

const AddTitle = (props) => {
  const {
    openAddTitle,
    setOpenAddTitle,
    type,
    notes,
    setNotes,
    folders,
    setFolders,
  } = props;
  let { currentFolder } = props;
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  /**
   * Adds a title to a note or folder
   * Then creates the note or folder
   * @param {Object} titleControl - The input the user types as a title
   * @returns - exits the function if there is no current folder
   */
  const onSubmit = async (titleControl) => {
    if (currentFolder === null) return;
    currentFolder = currentFolder?.data ? currentFolder.data : currentFolder;
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    let currentFolderPath =
      currentFolder !== ROOT_FOLDER ? JSON.parse(currentFolder.path) : path; // parse from db
    path = [...currentFolderPath];

    // Adds current folder to the path
    if (currentFolder !== ROOT_FOLDER) {
      path.push({
        id: currentFolder.id,
        title: currentFolder.title,
      });
    }
    try {
      setError('');
      setSaving(true);
      let res;
      switch (type) {
        // add note
        case 'note':
          res = await api.addNote({
            title: titleControl.title,
            content: '',
            userId: user.id,
            folderId: currentFolder.id,
          });
          setNotes([...notes, res.data]);
          break;
        // add folder
        case 'folder':
          res = await api.addFolder({
            title: titleControl.title,
            userId: user.id,
            parentId: currentFolder.id,
            path,
          });
          setFolders([...folders, res.data]);
          break;
      }
      setOpenAddTitle(false);
    } catch (err) {
      setError('Failed to create ' + type);
      console.error(err);
    }
    reset({
      title: '',
    });
    setSaving(false);
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={openAddTitle}
      onRequestClose={() => {
        setOpenAddTitle(!openAddTitle);
      }}
    >
      <View style={app.centeredView}>
        <View style={app.modal}>
          <Text style={app.header}>Add {type}</Text>
          {error ? (
            <View style={app.errorAlert}>
              <Text>{error}</Text>
            </View>
          ) : null}
          <View style={styles.controllerContainer}>
            <Controller
              name='title'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={`Give ${type} a title`}
                  style={app.input}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            {errors.title && (
              <Text style={app.errorText}>This field is required.</Text>
            )}
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={[buttons.outlineBtn1, styles.button]}
              onPress={() => setOpenAddTitle(!openAddTitle)}
            >
              <Text style={buttons.btnText2}>Cancel</Text>
            </Pressable>
            <Pressable
              style={{
                ...buttons.btn1,
                ...styles.button,
                backgroundColor: saving ? COLORS.btn1Hover : COLORS.themePurple,
              }}
              onPress={handleSubmit(onSubmit)}
              disabled={saving}
            >
              <Text style={buttons.btnText1}>Create {type}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  controllerContainer: {
    width: '90%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: BORDER.color,
    borderRadius: BORDER.radius,
    padding: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddTitle;
