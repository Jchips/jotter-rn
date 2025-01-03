import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FONT, FONTSIZE } from '../../styles/constants/styles';

const Toolbar = (props) => {
  const { words } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.words}>{words} words</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
  },
  words: {
    textAlign: 'center',
    fontSize: FONTSIZE.smaller,
    fontFamily: FONT.semiBold,
  },
});

export default Toolbar;
