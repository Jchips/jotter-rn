import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { app } from '../styles';

// TODO: finish the settings page
const Settings = () => {
  return (
    <View style={app.container}>
      <Text>Settings</Text>
      <View>
        <Text></Text>
        {/* <SelectDropdown
          data={folderOpts}
          onSelect={(selection, index) => {
            move(selection);
          }}
          renderButton={renderButton}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
