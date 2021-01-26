import { func, shape, string } from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button(props) {
  const { label, onPress, style } = props;
  // labelはTextInputの中身をあらかじめ指定するときなんかに使われる
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]}>
      {/* styleに複数指定したい場合は配列にする */}
      <Text style={styles.buttonLabel} onPress={onPress}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  label: string.isRequired,
  // 空のボタンをせってすることはないので、isReauiredはあっている
  onPress: func,
  style: shape(),
  // styleの中身はオブジェクトだから、ここはshape
};

Button.defaultProps = {
  onPress: null,
  style: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#000',
    borderRadius: 4,
    alignSelf: 'flex-start',
    // alignSelfは自分自身を並べるという意味flex-startとは左揃えにしなさいという意味
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#fff',
  },
});
