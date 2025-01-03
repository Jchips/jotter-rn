import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useFolder } from '../hooks/useFolder';
import { useMarkdown } from '../contexts/MDContext';
import Loading from './Loading';
import DisplayFolders from './Display/DisplayFolders';
import DisplayNotes from './Display/DisplayNotes';
import api from '../util/api';
import COLORS from '../styles/constants/colors';
import AddButton from './Buttons/AddButton';
import AddTitle from './Modals/AddTitle';

const Dashboard = ({ route }) => {
  const { folderId, folderTitle } = route.params;
  const [notes, setNotes] = useState();
  const [folders, setFolders] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const [openAddTitle, setOpenAddTitle] = useState(false);
  const { token, logout } = useAuth();
  const { setMarkdown } = useMarkdown();
  const navigation = useNavigation();
  // const theRoute = useRoute();
  // const { name = {} } = useRoute();
  const { folder } = useFolder(folderId);

  console.log('folder', folder?.data); // delete later

  // Set up bearer auth for user
  useEffect(() => {
    api.setTokenGetter(() => token);
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: folderTitle,
      });
    }, [navigation])
  );

  // Loads all the surveys in the current user's feed.
  useFocusEffect(
    React.useCallback(() => {
      const fetchContent = async () => {
        setLoading(true);
        setMarkdown('');
        let folder_id = !folderId ? null : folderId;
        try {
          setError('');
          const [foldersRes, notesRes] = await Promise.all([
            api.getFolders(folder_id),
            folder_id ? api.getNotes(folder_id) : api.getRootNotes(),
          ]);
          // console.log('folders:', foldersRes.data); // delete later
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
    }, [setMarkdown, folderId])
  );

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
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.themeWhite,
  },
});

export default Dashboard;
