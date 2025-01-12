import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { extractText } from '../../util/extract';
import noteView from '../../styles/constants/note';
import MARKDOWN from '../../styles/constants/markdown';
import { FONT } from '../../styles/constants/styles';
const Preview = ({ markdown }) => {
  /**
   * Flattens all the styles into one array
   * Filters out all undefined or null values
   * @param {Object[]} allStyles - All the styles on list item
   * @returns {Object[]} - All the styling with null/undefined values removed
   */
  const combineStyles = (allStyles) => {
    return allStyles.flat().filter(Boolean);
  };

  const rules = {
    list_item: (node, children, parent, style) => {
      const content = extractText(node).trim();
      const allStyles = [];

      // Match checkboxes: - [ ] or - [x]
      const checkboxMatch = content.match(/^\[( |x)\]\s*/i);
      if (checkboxMatch) {
        const isChecked = checkboxMatch[1].toLowerCase() === 'x';

        // Get styling for checkbox label
        children.forEach((child) => {
          if (child?.props?.children && Array.isArray(child?.props?.children)) {
            child.props.children.forEach((nestedChild) => {
              if (nestedChild?.props?.style) {
                allStyles.push(nestedChild.props.style);
              }
            });
          }
          if (child?.props?.style) {
            allStyles.push(child.props.style);
          }
        });
        const finalStyles = combineStyles(allStyles);
        const filteredChildren = content.replace(/^\[( |x)\]\s*/, ''); // Removes checbox
        return (
          <TouchableOpacity key={node.key} style={styles.checkboxContainer}>
            <View
              style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
            />
            <Text style={finalStyles}>{filteredChildren}</Text>
          </TouchableOpacity>
        );
      }

      if (parent[1]?.sourceType === 'list_item') {
        return (
          <View
            key={node.key}
            style={[styles.listItemContainer, style.list_item]}
          >
            <Text style={styles.innerBullet}>
              {Platform.select({
                android: '\u25E6',
                ios: '\u25E6',
                default: '\u25E6',
              })}
            </Text>
            <View>{children}</View>
          </View>
        );
      }

      // Fallback for regular list items (without checkboxes and not nested)
      return (
        <View
          key={node.key}
          style={[styles.listItemContainer, style.list_item]}
        >
          <Text style={styles.bullet}>
            {Platform.select({
              android: '\u2022',
              ios: '\u00B7',
              default: '\u2022',
            })}
          </Text>
          <View>{children}</View>
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
    width: '100%',
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
    marginLeft: 5,
    marginRight: 10,
    fontFamily: FONT.regular,
  },
  checkedCheckbox: {
    backgroundColor: '#000',
    fontFamily: FONT.regular,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontFamily: FONT.regular,
    maxWidth: '100%',
  },
  bullet: {
    fontFamily: FONT.regular,
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 10,
    color: '#000',
  },
  innerBullet: {
    fontFamily: FONT.regular,
    lineHeight: 20,
    marginLeft: 0,
    marginRight: 10,
    color: '#000',
  },
});

export default Preview;
