import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import Markdown from 'react-native-markdown-display';
import noteView from '../../styles/constants/note';
import MARKDOWN from '../../styles/constants/markdown';

const Preview = ({ markdown }) => {
  return (
    // <View style={{ flex: 1 }}>
    <ScrollView
      style={noteView.previewContainer}
      contentContainerStyle={{ paddingBottom: 20 }}
      // contentInsetAdjustmentBehavior='automatic'
      keyboardShouldPersistTaps='handled'
    >
      <Markdown style={{ ...MARKDOWN, ...styles.markdown }}>
        {markdown}
      </Markdown>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  markdown: {
    height: '100%',
    paddingBottom: 20,
  },
});

export default Preview;
