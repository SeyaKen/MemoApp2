import React, { useState } from 'react';
import {
  StyleSheet, TextInput, View, KeyboardAvoidingView, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
// オブジェクトの中身を定義するのがshape
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  // MemoDetailScreenからidとbodyTextを受け取り、下のbodyに一時的に代入する。useStateを使って初期値として代入している
  const [body, setBody] = useState(bodyText);
  // setBodyでbodyの値を変更する
  // MemoDerailScreenにも同じのがのってるから見ろ
  // routeの中のparamsからidを取得するという意味
  // navigationもrouteもreactnativeによってもともと設定されているprops。routeというオブジェクトの中にparamsというオブジェクトのなかにidが入っている

  // MemoListScreen26行目あたりでも同じことをやっているのでそこを見ればいろいろとわかるはず
  function handlePress() {
    const { currentUser } = firebase.auth();
    // 今ログインしているユーザー＝currentUserを取り出すことができる
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref.set({
        // setを使ってbodyTextをbodyで更新
        bodyText: body,
        updatedAt: new Date(),
        // メモの内容だけでなく日付も変える
      })
        .then(() => {
          navigation.goBack();
          // 前の画面に戻る
        })
        .catch((error) => {
          Alert.alert(error.code);
          // アラートメッセージにerrorの中のcodeを入れとく
        });
      // 成功したら、then失敗したら、catch
    }
  }

  // 下のpropTypesで定義するからそこを見ればいい
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {/* KeyboardAvoidingViewを設定することで、キーボードが出ても、ボタンが隠れなくなる今回の場合 */}
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBody(text); }}
          // ユーザーがタイプした瞬間に処理を実行するのはonChangeText
        />
        {/* valueを指定することで、もともと書いておきたい文字を指定できる。 */}
        {/* multilieを指定することでdefaultで一行だけのTextInputを何行も入力できるようにできる */}
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
      {/* onPressがどのような動きになるのかをここで指定する。{() => {ここに指定する}} */}
    </KeyboardAvoidingView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};
// routeというオブジェクトの中のparamsというオブジェクトの中のidはstringという文字列ですよという意味

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
