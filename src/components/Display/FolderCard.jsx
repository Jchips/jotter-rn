import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Popover from 'react-native-popover-view';
import { BORDER, FONT, FONTSIZE } from '../../styles/constants/styles';
import COLORS from '../../styles/constants/colors';
import buttons from '../../styles/constants/buttons';
import app from '../../styles/default';

const FolderCard = ({
  folder,
  setSelectedFolder,
  setOpenRename,
  setOpenMove,
}) => {
  const popoverRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.h1Container}>
        <Image
          source={{
            uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/folder-invoices--v1.png`,
          }}
          alt='folder-icon'
          style={styles.img}
        />
        <Text style={styles.h1}>{folder.title}</Text>
      </View>
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
              setSelectedFolder(folder);
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
            <Text style={buttons.btnText2}>Rename folder</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setSelectedFolder(folder);
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
            <Text style={buttons.btnText2}>Move folder</Text>
          </Pressable>
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...app.itemCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: 23,
    width: 23,
  },
  h1Container: {
    flexDirection: 'row',
  },
  h1: {
    fontSize: FONTSIZE.regular,
    fontFamily: FONT.bold,
    color: COLORS.themePurpleText,
    marginHorizontal: 10,
  },
  popover: {
    borderRadius: BORDER.radius,
    minHeight: 115,
    width: 180,
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

export default FolderCard;
