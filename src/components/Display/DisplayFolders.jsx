import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FolderCard from './FolderCard';
import Rename from '../Modals/Rename';
import app from '../../styles/default';

const DisplayFolders = ({ folders, setFolders, error }) => {
  const [openRename, setOpenRename] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const navigation = useNavigation();

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
    </View>
  ) : null;
};

const styles = StyleSheet.create({});

export default DisplayFolders;
