import { string } from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Button(props) {
  const { label } = props;
  // labelはTextInputの中身をあらかじめ指定するときなんかに使われる
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );
}

Button.propTypes = {
  label: string.isRequired,
  // 空のボタンをせってすることはないので、isReauiredはあっている
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#467fd3',
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
