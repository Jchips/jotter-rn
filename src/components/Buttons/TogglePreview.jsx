import { Image, StyleSheet } from 'react-native';
import { app } from '../../styles';

const TogglePreview = ({ showPreview }) => {
  return showPreview ? (
    <Image
      source={{
        uri: 'https://img.icons8.com/material-outlined/100/invisible.png',
      }}
      alt='show-preview'
      style={app.icon}
    />
  ) : (
    <Image
      source={{
        uri: 'https://img.icons8.com/material-outlined/100/visible--v1.png',
      }}
      alt='hide-preview'
      style={app.icon}
    />
  );
};

const styles = StyleSheet.create({});

export default TogglePreview;
