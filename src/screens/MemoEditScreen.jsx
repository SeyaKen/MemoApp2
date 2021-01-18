import React from 'react';
import {
  StyleSheet, TextInput, View, KeyboardAvoidingView, Alert,
} from 'react-native';
import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function MemoEditScreen() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {/* KeyboardAvoidingViewを設定することで、キーボードが出ても、ボタンが隠れなくなる今回の場合 */}
      <AppBar />
      <View style={styles.inputContainer}>
        <TextInput value="買い物リスト" multiline style={styles.input} />
        {/* valueを指定することで、もともと書いておきたい文字を指定できる。 */}
        {/* multilieを指定することでdefaultで一行だけのTextInputを何行も入力できるようにできる */}
      </View>
      <CircleButton name="check" />
      {/* onPressがどのような動きになるのかをここで指定する。{() => {ここに指定する}} */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
