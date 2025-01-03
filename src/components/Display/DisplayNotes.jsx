import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteCard from './NoteCard';
import Rename from '../Modals/Rename';
import app from '../../styles/default';

const DisplayNotes = ({ notes, setNotes, folders, error }) => {
  const [openRename, setOpenRename] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const note = item;
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('View', { note: note });
        }}
      >
        <NoteCard
          note={note}
          setSelectedNote={setSelectedNote}
          setOpenRename={setOpenRename}
        />
      </Pressable>
    );
  };
  return (
    <View>
      {notes.length === 0 && folders.length === 0 ? (
        <View>
          <Text>No notes.</Text>
        </View>
      ) : (
        <View>
          {error ? (
            <View style={app.errorAlert}>
              <Text>{error}</Text>
            </View>
          ) : null}
          <FlatList
            data={notes}
            renderItem={renderItem}
            numColumns={1}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <Rename
        openRename={openRename}
        setOpenRename={setOpenRename}
        notes={notes}
        setNotes={setNotes}
        note={selectedNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DisplayNotes;
