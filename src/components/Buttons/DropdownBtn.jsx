import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { moderateScale } from '../../util/scaling';
import { app, COLORS, FONT, FONTSIZE, BORDER } from '../../styles';

const DropdownBtn = (selectedItem, isOpened, text, saving) => {
  return (
    <View
      style={{
        ...styles.dropdownButtonStyle,
        // backgroundColor: COLORS.themeWhite,
        backgroundColor: saving ? COLORS.graySubtle : COLORS.themeWhite,
      }}
    >
      <Text style={styles.dropdownButtonTxtStyle}>
        {(selectedItem && selectedItem.label) ||
          // <Text>
          //   Select folder to move{' '}
          //   <Text style={{ fontFamily: FONT.bold }}>
          //     {type === 'note' ? note.title : folder.title}
          //   </Text>{' '}
          //   to
          // </Text>
          text()}
      </Text>
      {!isOpened ? (
        <Image
          source={{
            uri: 'https://img.icons8.com/material-outlined/100/expand-arrow--v1.png',
          }}
          alt='dropdown arrow'
          style={app.icon}
        />
      ) : (
        <Image
          source={{
            uri: 'https://img.icons8.com/material-outlined/100/collapse-arrow.png',
          }}
          alt='dropdown arrow'
          style={app.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '95%',
    height: 50,
    borderWidth: 1,
    borderColor: BORDER.color,
    borderRadius: BORDER.radius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: moderateScale(FONTSIZE.mid),
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: COLORS.themeWhite,
    borderRadius: BORDER.radius,
  },
});

export default DropdownBtn;
