import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalConfigs = async (configs) => {
  try {
    const serializedState = JSON.stringify(configs);
    await AsyncStorage.setItem('configs', serializedState);
  } catch (err) {
    console.error('Failed to set local configs -', err);
  }
};

export const getLocalConfigs = async () => {
  try {
    let serializedState = await AsyncStorage.getItem('configs');
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    console.error('Failed to fetch local configs -', err);
    return null;
  }
};

export const clearLocalConfigs = async () => {
  try {
    await AsyncStorage.removeItem('configs');
  } catch (err) {
    console.error('Failed to remove local configs -', err);
  }
};
