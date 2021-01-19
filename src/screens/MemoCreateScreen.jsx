import React from 'react';
import {
  StyleSheet, TextInput, View, KeyboardAvoidingView,
} from 'react-native';
import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {/* KeyboardAvoidingViewを設定することで、キーボードが出ても、ボタンが隠れなくなる今回の場合 */}
      <View style={styles.inputContainer}>
        <TextInput value="" multiline style={styles.input} />
        {/* valueを指定することで、もともと書いておきたい文字を指定できる。 */}
        {/* multilieを指定することでdefaultで一行だけのTextInputを何行も入力できるようにできる */}
      </View>
      <CircleButton
        name="check"
        onPress={() => { navigation.goBack(); }}
      />
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
