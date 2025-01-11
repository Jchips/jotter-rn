import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import noteView from '../../styles/constants/note';
import MARKDOWN from '../../styles/constants/markdown';
import { FONT } from '../../styles/constants/styles';

const Preview = ({ markdown }) => {
  const extractText = (node) => {
    if (!node) return '';
    if (node.content) return node.content;
    if (node.children && node.children.length > 0) {
      return node.children.map(extractText).join('');
    }
    return '';
  };
  const rules = {
    list_item: (node, children, parent) => {
      const content = extractText(node).trim();

      // Match checkboxes: - [ ] or - [x]
      const checkboxMatch = content.match(/^\[( |x)\]\s*(.*)$/i);
      if (checkboxMatch) {
        const isChecked = checkboxMatch[1].toLowerCase() === 'x';
        const label = checkboxMatch[2];

        return (
          <TouchableOpacity key={node.key} style={styles.checkboxContainer}>
            <View
              style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
            />
            <Text style={styles.bulletText}>{label}</Text>
          </TouchableOpacity>
        );
      }

      // Fallback for regular list items (without checkboxes)
      return (
        <View key={node.key} style={styles.listItemContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{content}</Text>
        </View>
      );
    },
  };

  return (
    <ScrollView
      style={noteView.previewContainer}
      contentContainerStyle={{ paddingBottom: 20 }}
      keyboardShouldPersistTaps='handled'
    >
      <Markdown style={{ ...MARKDOWN, ...styles.markdown }} rules={rules}>
        {markdown}
      </Markdown>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  markdown: {
    height: '100%',
    paddingBottom: 20,
    whiteSpace: 'pre-wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: FONT.regular,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    lineHeight: 20,
    borderColor: '#000',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: FONT.regular,
  },
  checkedCheckbox: {
    backgroundColor: '#000',
    fontFamily: FONT.regular,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontFamily: FONT.regular,
  },
  bullet: {
    fontFamily: FONT.regular,
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 10,
    color: '#000',
  },
  bulletText: {
    fontFamily: FONT.regular,
    lineHeight: 20,
    paddingRight: 20,
  },
});

export default Preview;
