import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import api from '../../util/api';
import { BORDER } from '../../styles/constants/styles';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';

const Rename = ({ openRename, setOpenRename, notes, setNotes, note }) => {
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (title) => {
    try {
      setError('');
      setSaving(true);
      let res = await api.updateNote(
        {
          title: title.rename,
          updatedAt: Date.now(),
        },
        note.id
      );
      console.log('res.data:', res.data); // delete later
      let notesCopy = [...notes];
      notesCopy.splice(notes.indexOf(note), 1, res.data);
      setNotes(notesCopy);
    } catch (err) {
      setError('Failed to rename note');
      console.error('Failed to rename note: ', err);
    }
    reset({
      title: '',
    });
    setOpenRename(false);
    setSaving(false);
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={openRename}
      onRequestClose={() => {
        setOpenRename(!openRename);
      }}
    >
      <View style={app.centeredView}>
        <View style={app.modal}>
          <Text style={app.header}>
            Rename{' '}
            <Text style={{ color: COLORS.themePurpleText }}>{note?.title}</Text>
          </Text>
          {error ? (
            <View style={app.errorAlert}>
              <Text>{error}</Text>
            </View>
          ) : null}
          <View style={styles.controllerContainer}>
            <Controller
              name='rename'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  defaultValue={note.title}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            {errors.rename && (
              <Text style={styles.errorText}>This field is required.</Text>
            )}
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={[buttons.outlineBtn1, styles.button]}
              onPress={() => setOpenRename(!openRename)}
            >
              <Text style={buttons.btnText2}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[buttons.btn1, styles.button]}
              onPress={handleSubmit(onSubmit)}
              disabled={saving}
            >
              <Text style={buttons.btnText1}>Rename</Text>
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
});

export default Rename;
