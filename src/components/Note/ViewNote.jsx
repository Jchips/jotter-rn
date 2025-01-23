import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useMarkdown } from '../../contexts/MDContext';
import EditButton from '../Buttons/EditButton';
import Preview from './Preview';
import { app, COLORS } from '../../styles';

const ViewNote = ({ navigation, route }) => {
  const { note } = route.params;
  const [editBtnVisible, setEditBtnVisible] = useState(true);
  const { markdown, setMarkdown } = useMarkdown();
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(setEditBtnVisible)(true);
    });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: note.title,
      headerTint: COLORS.themePurpleText,
    });
  }, [navigation]);

  useEffect(() => {
    setMarkdown(note.content);
  }, [note]);

  useFocusEffect(
    React.useCallback(() => {
      const timer = setTimeout(() => {
        setEditBtnVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }, [doubleTap])
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={doubleTap}>
        <View style={{ flex: 1 }}>
          <Preview note={note} markdown={markdown} />
          <EditButton
            navigation={navigation}
            note={note}
            editBtnVisible={editBtnVisible}
          />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.container,
    paddingVertical: 10,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default ViewNote;
