import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { useFolder } from '../hooks/useFolder';
import { useMarkdown } from '../contexts/MDContext';
import Loading from './Loading';
import DisplayFolders from './Display/DisplayFolders';
import DisplayNotes from './Display/DisplayNotes';
import AddButton from './Buttons/AddButton';
import Sort from './Modals/Sort';
import Grid from './Modals/Grid';
import AddTitle from './Modals/AddTitle';
import api from '../util/api';
import { fetchConfigs } from '../reducers/configReducer';
import { app, buttons, COLORS } from '../styles';

const Dashboard = ({ route }) => {
  const { folderId, folderTitle } = route.params;
  const [notes, setNotes] = useState();
  const [folders, setFolders] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [openGrid, setOpenGrid] = useState(false);
  const [openAddTitle, setOpenAddTitle] = useState(false);
  const { token, logout } = useAuth();
  const { setMarkdown } = useMarkdown();
  const navigation = useNavigation();
  const { data } = useSelector((state) => state.configs);
  const dispatch = useDispatch();
  const { folder } = useFolder(folderId);
  const screenWidth = Dimensions.get('window').width;

  // Set up bearer auth for user
  useEffect(() => {
    api.setTokenGetter(() => token);
  }, [token]);

  useEffect(() => {
    dispatch(fetchConfigs(token));
  }, [dispatch]);

  useEffect(() => {
    setMarkdown('');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle:
          screenWidth < 440
            ? folderTitle.substring(0, 20) + '...'
            : folderTitle,
        headerRight: () => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                onPress={() => {
                  setOpenGrid(true);
                }}
                style={styles.headerButton}
              >
                <Image
                  source={{
                    uri:
                      data?.gridSize === '2'
                        ? 'https://img.icons8.com/material-outlined/100/rows.png'
                        : 'https://img.icons8.com/material-outlined/100/grid-2.png',
                  }}
                  alt='grid-button'
                  style={app.icon}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  setOpenSort(true);
                }}
                style={styles.headerButton}
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
    }, [navigation, route, data])
  );

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
          gridSize={data?.gridSize}
          error={error}
        />
      ) : null}
      {notes ? (
        <DisplayNotes
          notes={notes}
          setNotes={setNotes}
          folders={folders}
          gridSize={data?.gridSize}
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
      <Grid openGrid={openGrid} setOpenGrid={setOpenGrid} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    ...app.dashboardContainer,
  },
  headerButton: {
    ...buttons.btn1,
    backgroundColor: COLORS.themeWhite,
    margin: 0,
    paddingLeft: 0,
  },
});

export default Dashboard;
