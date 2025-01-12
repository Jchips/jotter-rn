import React from 'react';
import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';
import getWordCount from '../../util/getWordCount';
import formatDate from '../../util/formatDate';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';
import { FONT, FONTSIZE } from '../../styles/constants/styles';

const NoteDetails = ({ openDetails, setOpenDetails, note }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={openDetails}
      onRequestClose={() => {
        setOpenDetails(!openDetails);
      }}
    >
      <View style={app.centeredView}>
        <View style={styles.modal}>
          <Text style={app.header}>
            {note?.title}{' '}
            <Text style={{ fontSize: FONTSIZE.regular }}>details</Text>
          </Text>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
              <Text style={app.boldText}>Date created:</Text>{' '}
              {formatDate(note?.createdAt)}
            </Text>
            <Text style={styles.modalText}>
              <Text style={app.boldText}>Last edited:</Text>{' '}
              {formatDate(note?.updatedAt)}
            </Text>
            <Text style={styles.modalText}>
              <Text style={app.boldText}>Word count:</Text>{' '}
              {getWordCount(note?.content)}
            </Text>
          </View>
          <Pressable
            style={[buttons.btn1, styles.button]}
            onPress={() => {
              setOpenDetails(!openDetails);
            }}
          >
            <Text style={buttons.btnText1}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
  },
  modal: {
    ...app.modal,
    width: '85%',
  },
  modalBody: {
    textAlign: 'left',
  },
  modalText: {
    fontFamily: FONT.regular,
    color: COLORS.themePurpleText,
    lineHeight: 25,
  },
});

export default NoteDetails;
