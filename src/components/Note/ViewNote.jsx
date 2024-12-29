import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ViewNote = ({ route }) => {
  const { note } = route.params;
  return (
    <View>
      <Text>{note.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewNote;
