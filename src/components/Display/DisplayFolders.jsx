import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Delete from '../Modals/Delete';
import FolderCard from './FolderCard';
import Move from '../Modals/Move';
import Rename from '../Modals/Rename';
// import app from '../../styles/appDefault';
import { app } from '../../styles';

const DisplayFolders = ({ folders, setFolders, error }) => {
  const [openMove, setOpenMove] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const navigation = useNavigation();

  /**
   * Renders list of folders
   * @param {Object} param0 - The folder item to be rendered
   * @returns - a folder card that navigates inside folder
   */
  const renderItem = ({ item }) => {
    const folder = item;
    return (
      <Pressable
        onPress={() => {
          navigation.push('Drawer', {
            screen: 'Home',
            params: { folderId: folder.id, folderTitle: folder.title },
          });
        }}
      >
        <FolderCard
          folder={folder}
          setSelectedFolder={setSelectedFolder}
          setOpenRename={setOpenRename}
          setOpenDelete={setOpenDelete}
          setOpenMove={setOpenMove}
        />
      </Pressable>
    );
  };

  return folders.length > 0 ? (
    <View>
      {error ? (
        <View style={app.errorAlert}>
          <Text>{error}</Text>
        </View>
      ) : null}
      <FlatList
        data={folders}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item) => item.id}
      />
      <Rename
        openRename={openRename}
        setOpenRename={setOpenRename}
        folders={folders}
        setFolders={setFolders}
        folder={selectedFolder}
      />
      <Move
        navigation={navigation}
        openMove={openMove}
        setOpenMove={setOpenMove}
        type='folder'
        folder={selectedFolder}
        allFolders={folders}
        setFolders={setFolders}
      />
      <Delete
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        folders={folders}
        setFolders={setFolders}
        folder={selectedFolder}
        navigation={navigation}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({});

export default DisplayFolders;
