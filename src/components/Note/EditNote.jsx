import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';

const EditNote = ({ isEditable, markdown, update }) => {
  return (
    <View style={{ flex: 1 }}>
      {!isEditable ? (
        <ScrollView style={{ flex: 1, marginBottom: 15 }}>
          <View style={{ flex: 1 }}>
            {markdown ? (
              <Text style={styles.editor}>{markdown}</Text>
            ) : (
              <Text style={styles.placeholderText}>
                Double tap to add markdown...
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <TextInput
          style={styles.textInput}
          multiline
          value={markdown}
          onChangeText={update}
          placeholder='Add markdown...'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  editor: {
    fontFamily: FONT.code,
    fontSize: FONTSIZE.mid,
    marginBottom: 5,
    whiteSpace: 'pre-wrap',
  },
  placeholderText: {
    color: COLORS.mutedtext,
    fontFamily: FONT.code,
    fontSize: FONTSIZE.mid,
  },
  textInput: {
    fontFamily: FONT.code,
    fontSize: FONTSIZE.mid,
    marginBottom: 5,
    paddingBottom: 10,
    whiteSpace: 'pre-wrap',
  },
});

export default EditNote;
