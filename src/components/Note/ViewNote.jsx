import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import app from '../../styles/default';

const ViewNote = ({ route }) => {
  const { note } = route.params;
  return (
    <View style={app.container}>
      <Text>{note.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewNote;
