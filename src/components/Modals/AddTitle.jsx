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
import { BORDER } from '../../styles/constants/styles';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';

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

  const onSubmit = async (titleControl) => {
    if (currentFolder === null) return;
    currentFolder = currentFolder?.data ? currentFolder.data : currentFolder;
    console.log('currentFolder', currentFolder); // delete later
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
                  style={styles.input}
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
              style={[buttons.btn1, styles.button]}
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
  input: {
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddTitle;
