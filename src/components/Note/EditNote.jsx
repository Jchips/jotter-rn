import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';

const EditNote = ({ isEditable, markdown, update, setIsEditable }) => {
  return (
    <View style={{ flex: 1 }}>
      {!isEditable ? (
        <ScrollView style={{ flex: 1 }}>
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
          style={styles.editor}
          multiline
          value={markdown}
          onChangeText={update}
          placeholder='Double tap to add markdown...'
          onBlur={() => setIsEditable(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  editor: {
    fontFamily: FONT.code,
    fontSize: FONTSIZE.mid,
    // height: '100%',
  },
  placeholderText: {
    color: COLORS.mutedtext,
    fontFamily: FONT.code,
    fontSize: FONTSIZE.mid,
  },
});

export default EditNote;
