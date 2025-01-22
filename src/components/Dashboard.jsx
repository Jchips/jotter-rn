import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useFolder } from '../hooks/useFolder';
import { useMarkdown } from '../contexts/MDContext';
import Loading from './Loading';
import DisplayFolders from './Display/DisplayFolders';
import DisplayNotes from './Display/DisplayNotes';
import AddButton from './Buttons/AddButton';
import Sort from './Modals/Sort';
import AddTitle from './Modals/AddTitle';
import api from '../util/api';
import { app, buttons, COLORS } from '../styles';

const Dashboard = ({ route }) => {
  const { folderId, folderTitle } = route.params;
  const [notes, setNotes] = useState();
  const [folders, setFolders] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [openAddTitle, setOpenAddTitle] = useState(false);
  const { token, logout } = useAuth();
  const { setMarkdown } = useMarkdown();
  const navigation = useNavigation();
  const { folder } = useFolder(folderId);

  // Set up bearer auth for user
  useEffect(() => {
    api.setTokenGetter(() => token);
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: folderTitle,
        headerRight: () => {
          return (
            <View>
              <Pressable
                onPress={() => {
                  setOpenSort(true);
                }}
                style={styles.sortButton}
              >
                <Image
                  source={{
                    uri: 'https://img.icons8.com/material-outlined/100/sorting-arrows.png',
                  }}
                  alt='sort-button'
                  style={app.icon}
                />
              </Pressable>
            </View>
          );
        },
      });
    }, [navigation, route])
  );

  useEffect(() => {
    setMarkdown('');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchContent = async () => {
        setLoading(true);
        let folder_id = !folderId ? null : folderId;
        try {
          setError('');
          const [foldersRes, notesRes] = await Promise.all([
            api.getFolders(folder_id),
            folder_id ? api.getNotes(folder_id) : api.getRootNotes(),
          ]);
          setFolders(foldersRes.data);
          setNotes(notesRes.data);
        } catch (err) {
          console.error(err);
          if (err.response?.data?.message === 'jwt expired') {
            logUserOut();
          } else {
            setError('Could not fetch content');
          }
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
    }, [folderId])
  );

  // logs the user out
  const logUserOut = () => {
    logout();
  };

  // Loading circle
  if (loading) {
    return <Loading />;
  }

  return !loading ? (
    <View style={styles.container}>
      {folders ? (
        <DisplayFolders
          folders={folders}
          setFolders={setFolders}
          error={error}
        />
      ) : null}
      {notes ? (
        <DisplayNotes
          notes={notes}
          setNotes={setNotes}
          folders={folders}
          error={error}
        />
      ) : null}
      <AddButton setOpenAddTitle={setOpenAddTitle} setType={setType} />
      <AddTitle
        openAddTitle={openAddTitle}
        setOpenAddTitle={setOpenAddTitle}
        type={type}
        notes={notes}
        setNotes={setNotes}
        folders={folders}
        setFolders={setFolders}
        currentFolder={folder}
      />
      <Sort
        openSort={openSort}
        setOpenSort={setOpenSort}
        folders={folders}
        notes={notes}
        setNotes={setNotes}
        setFolders={setFolders}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.themeWhite,
  },
  sortButton: {
    ...buttons.btn1,
    backgroundColor: COLORS.themeWhite,
    margin: 0,
  },
});

export default Dashboard;
