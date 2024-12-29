import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useMarkdown } from '../contexts/MDContext';
import DisplayFolders from './Display/DisplayFolders';
import api from '../util/api';
import DisplayNotes from './Display/DisplayNotes';

const Dashboard = ({ route }) => {
  const { folderId, folderTitle } = route.params;
  const [notes, setNotes] = useState();
  const [folders, setFolders] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
  const { setMarkdown } = useMarkdown();
  const navigation = useNavigation();

  console.log('folderId:', folderId); // delete later

  // Set up bearer auth for user
  useEffect(() => {
    api.setTokenGetter(() => token);
  }, [token]);

  // useEffect(() => {
  //   navigation.setOptions({ headerTitle: folderTitle });
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: folderTitle,
        // headerTitle: folderId ? folderTitle : 'Home',
        // headerLeft: () =>
        //   folderId ? (
        //     <Pressable onPress={() => navigation.goBack()}>
        //       <Text>back</Text>
        //     </Pressable>
        //   ) : null,
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
    }, [])
  );

  const logUserOut = () => {
    navigation.navigate('Login');
    logout();
  };

  return !loading ? (
    <View>
      {folders ? <DisplayFolders folders={folders} error={error} /> : null}
      {notes ? (
        <DisplayNotes notes={notes} folders={folders} error={error} />
      ) : null}
    </View>
  ) : null;
};

const styles = StyleSheet.create({});

export default Dashboard;
