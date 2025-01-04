import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Popover from 'react-native-popover-view';
import formatDate from '../../util/formatDate';
import { BORDER, FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';

const NoteCard = ({ note, setSelectedNote, setOpenRename, setOpenMove }) => {
  const popoverRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.h1Container}>
        <Text style={styles.h1}>{note.title}</Text>
        <Popover
          ref={popoverRef}
          from={
            <Pressable>
              <Image
                source={{
                  uri: `https://img.icons8.com/material-outlined/100/more.png`,
                }}
                alt='more-icon'
                style={styles.img}
              />
            </Pressable>
          }
          arrowSize={{ width: 0, height: 0 }}
          popoverStyle={styles.popover}
        >
          <View style={styles.popoverContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setSelectedNote(note);
                setOpenRename(true);
                popoverRef.current.requestClose();
              }}
            >
              <Image
                source={{
                  uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/rename.png`,
                }}
                alt='rename-icon'
                style={styles.img}
              />
              <Text style={buttons.btnText2}>Rename note</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                setSelectedNote(note);
                setOpenMove(true);
                popoverRef.current.requestClose();
              }}
            >
              <Image
                source={{
                  uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/reorder.png`,
                }}
                alt='move-icon'
                style={styles.img}
              />
              <Text style={buttons.btnText2}>Move note</Text>
            </Pressable>
          </View>
        </Popover>
      </View>
      <Text style={styles.metaData}>{formatDate(note.createdAt)}</Text>
      <Text style={styles.metaData}>{formatDate(note.updatedAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.itemCard,
  },
  h1Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    marginBottom: 10,
  },
  h1: {
    fontSize: FONTSIZE.regular,
    fontFamily: FONT.bold,
  },
  img: {
    height: 23,
    width: 23,
  },
  metaData: {
    fontSize: FONTSIZE.smaller,
    fontFamily: FONT.regular,
    color: COLORS.mutedtext,
  },
  popover: {
    borderRadius: BORDER.radius,
    minHeight: 115,
    width: 170,
  },
  popoverContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    ...buttons.btn3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 0,
  },
});

export default NoteCard;
