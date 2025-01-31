import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteCard from './NoteCard';
import Move from '../Modals/Move';
import Rename from '../Modals/Rename';
import Delete from '../Modals/Delete';
import NoteDetails from '../Note/NoteDetails';
import { app } from '../../styles';

const DisplayNotes = ({ notes, setNotes, folders, error, gridSize }) => {
  const [openMove, setOpenMove] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigation = useNavigation();
  const numColumns = Number(gridSize) || 1;

  /**
   * Renders a list of notes
   * @param {Object} param0 - The note item to be rendered
   * @returns - a note card that navigates to the note
   */
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
          setOpenDelete={setOpenDelete}
          setOpenMove={setOpenMove}
          setOpenDetails={setOpenDetails}
          numColumns={numColumns}
        />
      </Pressable>
    );
  };

  return (
    <View>
      {notes.length === 0 && folders.length === 0 ? (
        <View style={{ marginHorizontal: 10 }}>
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
            key={numColumns}
            renderItem={renderItem}
            numColumns={numColumns}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={
              numColumns > 1 ? { justifyContent: 'space-between' } : undefined
            }
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
      <NoteDetails
        note={selectedNote}
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
      />
      <Move
        navigation={navigation}
        openMove={openMove}
        setOpenMove={setOpenMove}
        type='note'
        note={selectedNote}
        allNotes={notes}
        setNotes={setNotes}
        folders={{}}
      />
      <Delete
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        notes={notes}
        setNotes={setNotes}
        note={selectedNote}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DisplayNotes;
