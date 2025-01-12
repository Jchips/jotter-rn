import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Popover from 'react-native-popover-view';
import { moderateScale } from '../../util/scaling';
import app from '../../styles/default';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';
import POPOVER from '../../styles/constants/popover';
import { BORDER, FONT, FONTSIZE } from '../../styles/constants/styles';

const FolderCard = (props) => {
  const {
    folder,
    setSelectedFolder,
    setOpenRename,
    setOpenDelete,
    setOpenMove,
  } = props;
  const popoverRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.h1Container}>
        <Image
          source={{
            uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/folder-invoices--v1.png`,
          }}
          alt='folder-icon'
          style={app.icon}
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
              style={app.icon}
            />
            <Text style={buttons.btnText2}>Rename folder</Text>
          </Pressable>
          <Pressable
            style={POPOVER.button}
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
              style={app.icon}
            />
            <Text style={buttons.btnText2}>Move folder</Text>
          </Pressable>
          <Pressable
            style={POPOVER.button}
            onPress={() => {
              setSelectedFolder(folder);
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
            <Text style={buttons.btnText2}>Delete folder</Text>
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
  h1Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    fontSize: moderateScale(FONTSIZE.regular),
    fontFamily: FONT.bold,
    color: COLORS.themePurpleText,
    marginHorizontal: 10,
  },
  popover: {
    borderRadius: BORDER.radius,
    minHeight: moderateScale(140),
    width: moderateScale(172),
  },
});

export default FolderCard;
