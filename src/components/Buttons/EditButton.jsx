import { Image, Pressable, StyleSheet } from 'react-native';
import { app, COLORS, buttons } from '../../styles';

const EditButton = ({ navigation, note }) => {
  return (
    <Pressable
      style={buttons.roundBtn}
      onPress={() => navigation.navigate('Editor', { note: note })}
    >
      <Image
        source={{
          uri: `https://img.icons8.com/material-outlined/100/${COLORS.whiteNoHash}/edit--v1.png`,
        }}
        alt='edit button'
        style={app.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default EditButton;
