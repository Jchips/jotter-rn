import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTSIZE } from '../../styles/constants/styles';

const FolderCard = ({ folder }) => {
  return (
    <View>
      <Text>{folder.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: FONTSIZE.large,
  },
});

export default FolderCard;
