import React from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteCard from './NoteCard';

const DisplayNotes = ({ notes, folders, error }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const note = item;
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('View', { note: note });
        }}
      >
        <NoteCard note={note} />
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
          {/* <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {notes.map((note) => (
              <NoteCard note={note} key={note.id} />
            ))}
          </Grid> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DisplayNotes;
