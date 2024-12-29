import React from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FolderCard from './FolderCard';
import app from '../../styles/default';

const DisplayFolders = ({ folders, error }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const folder = item;
    return (
      <Pressable
        onPress={() => {
          navigation.push('Drawer', {
            // folderId: folder.id,
            // folderTitle: folder.title,
            screen: 'Home',
            params: { folderId: folder.id, folderTitle: folder.title },
          });
        }}
      >
        <FolderCard folder={folder} />
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
    </View>
  ) : null;
};

const styles = StyleSheet.create({});

export default DisplayFolders;
