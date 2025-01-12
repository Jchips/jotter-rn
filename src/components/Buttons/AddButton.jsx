import React, { useRef } from 'react';
import { StyleSheet, Image, Pressable, View, Text } from 'react-native';
import Popover from 'react-native-popover-view';
import { moderateScale } from '../../util/scaling';
import buttons from '../../styles/constants/buttons';
import COLORS from '../../styles/constants/colors';
import { BORDER } from '../../styles/constants/styles';

const AddButton = ({ setOpenAddTitle, setType }) => {
  const popoverRef = useRef();

  return (
    <Popover
      ref={popoverRef}
      from={
        <Pressable style={buttons.roundBtn}>
          <Image
            source={{
              uri: `https://img.icons8.com/material-outlined/100/${COLORS.whiteNoHash}/plus-math--v1.png`,
            }}
            alt='add-icon'
            style={styles.icon}
          />
        </Pressable>
      }
      arrowSize={{ width: 0, height: 0 }}
      offset={7}
      popoverStyle={styles.popover}
    >
      <View style={styles.popoverContainer}>
        <Pressable
          style={styles.popoverButton}
          onPress={() => {
            setType('folder');
            setOpenAddTitle(true);
            popoverRef.current.requestClose();
          }}
        >
          <Image
            source={{
              uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/folder-invoices--v1.png`,
            }}
            alt='folder-icon'
            style={styles.icon}
          />
          <Text style={buttons.btnText2}>New Folder</Text>
        </Pressable>
        <Pressable
          style={styles.popoverButton}
          onPress={() => {
            setType('note');
            setOpenAddTitle(true);
            popoverRef.current.requestClose();
          }}
        >
          <Image
            source={{
              uri: `https://img.icons8.com/material-outlined/100/${COLORS.textNoHash}/file.png`,
            }}
            alt='note-icon'
            style={styles.icon}
          />
          <Text style={buttons.btnText2}>New Note</Text>
        </Pressable>
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  popover: {
    borderRadius: BORDER.radius,
    minHeight: moderateScale(115),
    width: moderateScale(160),
  },
  popoverContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingVertical: '4%',
  },
  popoverButton: {
    ...buttons.btn3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: moderateScale(48),
    paddingHorizontal: 10,
    marginVertical: '2%',
  },
  icon: {
    width: 22,
    height: 22,
  },
});

export default AddButton;
