import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Popover from 'react-native-popover-view';
import formatDate from '../../util/formatDate';
// import app from '../../styles/appDefault';
// import buttons from '../../styles/constants/buttons';
// import COLORS from '../../styles/constants/colors';
// import POPOVER from '../../styles/constants/popover';
import { moderateScale } from '../../util/scaling';
// import { BORDER, FONT, FONTSIZE } from '../../styles/constants/constants';
import {
  app,
  COLORS,
  FONT,
  FONTSIZE,
  BORDER,
  POPOVER,
  buttons,
} from '../../styles';

const NoteCard = (props) => {
  const {
    note,
    setSelectedNote,
    setOpenRename,
    setOpenMove,
    setOpenDelete,
    setOpenDetails,
  } = props;
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
                style={app.icon}
              />
            </Pressable>
          }
          arrowSize={{ width: 0, height: 0 }}
          popoverStyle={styles.popover}
        >
          <View style={POPOVER.popoverContainer}>
            <Pressable
              style={POPOVER.button}
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
                style={app.icon}
              />
              <Text style={buttons.btnText2}>Rename note</Text>
            </Pressable>
            <Pressable
              style={POPOVER.button}
              onPress={() => {
                setSelectedNote(note);
                setOpenDetails(true);
                popoverRef.current.requestClose();
              }}
            >
              <Image
                source={{
                  uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/info--v1.png`,
                }}
                alt='details-icon'
                style={app.icon}
              />
              <Text style={buttons.btnText2}>View details</Text>
            </Pressable>
            <Pressable
              style={POPOVER.button}
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
                style={app.icon}
              />
              <Text style={buttons.btnText2}>Move note</Text>
            </Pressable>
            <Pressable
              style={POPOVER.button}
              onPress={() => {
                setSelectedNote(note);
                setOpenDelete(true);
                popoverRef.current.requestClose();
              }}
            >
              <Image
                source={{
                  uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/trash--v1.png`,
                }}
                alt='delete-icon'
                style={app.icon}
              />
              <Text style={buttons.btnText2}>Delete note</Text>
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
    fontSize: moderateScale(FONTSIZE.regular),
    fontFamily: FONT.bold,
  },
  metaData: {
    fontSize: moderateScale(FONTSIZE.smaller),
    fontFamily: FONT.regular,
    color: COLORS.mutedtext,
  },
  popover: {
    borderRadius: BORDER.radius,
    minHeight: moderateScale(190),
    width: moderateScale(170),
  },
});

export default NoteCard;
