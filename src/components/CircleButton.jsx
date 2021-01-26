import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { string, shape, func } from 'prop-types';
import { Feather } from '@expo/vector-icons';
// https://icons.expo.fyi/Feather/plusのFeathericonのなかから、iconを読み込めるようにする
export default function CircleButton(props) {
  const { style, name, onPress } = props;
  // propsのなかから、値を受け取る。
  return (
    <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
      {/* <View>にはonPressを指定できないので、TouchableOpacityに指定する。 */}
      {/* onPressをpropsで受け取り受取先で指定した動きをここで実行する */}
      {/* TouchableOpacityを指定することで押したときに色が薄くなる */}
      {/* Helloのところでもやった。配列にすることで、styles.circleButtonがなかったら、styleそれもなかったら、次の奴のstyleを充てるという指示ができる */}
      <Feather name={name} size={32} color="white" />
      {/* https://icons.expo.fyi/Feather/plusから受け取った値をここで表示する */}
      {/* {name} はpropsとして受け取る */}
    </TouchableOpacity>
  );
}

CircleButton.propTypes = {
  style: shape(),
  name: string.isRequired,
  // ciclebuttonを使うときにiconは必須になるので、isRequiredにしておく
  onPress: func,
  // onPressがfunctionである、つまり、onPressが関数であるということ
};

CircleButton.defaultProps = {
  style: null,
  onPress: null,
};

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#000000',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // shadowRadiusプロパティはiosにしか対応していない
    elevation: 8,
    // elevationはandroidにしか対応していない
  },
  circleButtonLabel: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
  },
});
