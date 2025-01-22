import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import DropdownBtn from '../Buttons/DropdownBtn';
import sortMethods from '../../util/sortMethods';
import api from '../../util/api';
import sortBy from '../../util/sortBy';
import { setConfigs } from '../../reducers/configReducer';
import { setLocalConfigs } from '../../util/persist';
import { moderateScale } from '../../util/scaling';
import {
  app,
  buttons,
  COLORS,
  BORDER,
  FONT,
  FONTSIZE,
  MODAL,
} from '../../styles';

let sortOptions = [
  { label: 'Last created', value: '1' },
  { label: 'First created', value: '2' },
  { label: 'Title - AZ', value: '3' },
  { label: 'Title - ZA', value: '4' },
  { label: 'Recently updated', value: '5' },
  { label: 'Oldest updated', value: '6' },
];

const Sort = (props) => {
  const { openSort, setOpenSort, notes, folders, setNotes, setFolders } = props;
  const configs = useSelector((state) => state.configs.value);
  const [sort, setSort] = useState(configs?.sort);
  const dispatch = useDispatch();
  const sortMethod = sortMethods;

  // Sorts notes and folders
  const sortNotes = (notes) => setNotes(notes);
  const sortFolders = (folders) => setFolders(folders);

  /**
   * Updates the user's new sort option in the db, global state,
   * and local storage
   * @param {String} sortOption - The selected sort option
   */
  const setUConfigs = (sortOption) => {
    const updateSort = async (sortOption) => {
      let configObj = { sort: sortOption };
      try {
        let res = await api.updateConfigs(configObj);
        dispatch(setConfigs({ ...res.data, ...configObj }));
        setLocalConfigs({ ...res.data, ...configObj });
      } catch (err) {
        console.error('Failed to update sort -', err);
      }
    };
    updateSort(sortOption);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchConfigs = async () => {
        let uConfigs = await api.getConfigs();
        setSort(uConfigs?.data?.sort);
      };
      fetchConfigs();
    }, [])
  );

  // Dropdown button default text
  const dropdownBtnText = () => {
    return <Text>Choose sort</Text>;
  };

  /**
   * Renders a sort option
   * @param {Object} item - Sort option
   * @param {Integer} index - The index of sort option in dropdown
   * @param {Boolean} isSelected - Whether the sort option is selected or not
   * @returns - The sort option item
   */
  const renderItem = (item, index, isSelected) => {
    return (
      <View
        style={{
          ...styles.dropdownItemStyle,
          ...(isSelected && { backgroundColor: COLORS.graySubtle }),
          // ...(isSelected && { backgroundColor: '#D2D9DF' }),
        }}
      >
        <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={openSort}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setOpenSort(!openSort);
      }}
    >
      <View style={MODAL.centeredView}>
        <View style={MODAL.modal}>
          <Text style={app.header}>Sort</Text>
          <SelectDropdown
            data={sortOptions}
            defaultValueByIndex={sort - 1}
            onSelect={(selection, index) => {
              setSort(selection.value);
              sortBy(
                selection.value,
                sortMethod,
                notes,
                folders,
                sortNotes,
                sortFolders,
                setUConfigs
              );
              setUConfigs(selection.value);
              setOpenSort(false);
            }}
            renderButton={(selectedItem, isOpened) =>
              DropdownBtn(selectedItem, isOpened, dropdownBtnText)
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
          <Pressable
            style={[buttons.btn1, styles.button]}
            onPress={() => {
              setOpenSort(!openSort);
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
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: FONT.semiBold,
    color: COLORS.themePurpleText,
    fontSize: moderateScale(FONTSIZE.regular),
  },
  dropdownMenuStyle: {
    backgroundColor: COLORS.themeWhite,
    borderRadius: BORDER.radius,
  },
  button: {
    width: '90%',
    marginTop: 20,
  },
});

export default Sort;
