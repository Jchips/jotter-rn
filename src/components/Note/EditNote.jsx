import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { FONT, FONTSIZE } from '../../styles/constants/styles';

const EditNote = ({ isEditable, markdown, update, setIsEditable }) => {
  return (
    <View style={{ flex: 1 }}>
      {!isEditable ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.editor}>{markdown}</Text>
          </View>
        </ScrollView>
      ) : (
        <TextInput
          style={styles.editor}
          multiline
          value={markdown}
          onChangeText={update}
          placeholder='Double tap here to add markdown...'
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
    height: '100%',
  },
});

export default EditNote;
