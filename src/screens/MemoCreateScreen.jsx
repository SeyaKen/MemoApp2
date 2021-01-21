import React, { useState } from 'react';
// ユーザーが入力した情報を受け取るためにuseStateをここで読み込む
import {
  StyleSheet, TextInput, View, KeyboardAvoidingView,
} from 'react-native';

import firebase from 'firebase';

import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');
  // bodyTextのデフォルトの値を空に指定、それを更新するためにはsetBodyTextを使うことを指定

  //  handlePress関数を定義
  function handlePress() {
    const { currentUser } = firebase.auth();
    // ここでcurretUserをfirebaseから取得
    const db = firebase.firestore();
    // firebase()の結果をdb定数に代入
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    // users/${currentUser.uid}/memosの意味はusersの中の${currentUser.uid}の中のmemosという意味。ユーザーごとにmemosを作成。
    // currentUserはfirebaseから取得することができる。上で実行
    // const ref = db.collection('memos');だとユーザ-ごとのmemosにならないので、上のようにする
    // referenceを作りcollectionにmemosという名前を付けている。collectionに対するreference
    // firestoreはcollection.document.dataとなっている。collectionの中のdocument中のdataという構造
    ref.add({
      // refに処理を加える(何を加えるのかを指定)
      // ref.addはaddとcatchをとることができる。
      bodyText,
      // bodyText: bodyText,キーも変数も同じなので上のような書き方になる
      // ここで、firebaseに保存するデータを決める今回の場合はbodyText
      updatedAt: new Date(),
      // new Date()とすることで、時間を返してくれる
    })
      .then((docRef) => {
        // documentへのreferenceの作成
        console.log('Created!', docRef.id);
        // docRefで参照し、それに.idと加えることで、idを受け取ることができる。
      })
      .catch((error) => {
        // catch()の中でerrorを受け取っている
        console.log('Effof!', error);
      });
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {/* KeyboardAvoidingViewを設定することで、キーボードが出ても、ボタンが隠れなくなる今回の場合 */}
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
        //  valueを指定することで、もともと書いておきたい文字を指定できる。下のsetBodyTextで更新した値を入れる
          multiline
          //  multilieを指定することでdefaultで一行だけのTextInputを何行も入力できるようにできる
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          // ユーザーがなにかタイプするたびにsetBodyTextを実行したいので、onchangeテキストを指定
          // textはユーザーが入力した文字を引数として受け取り、setBodyTextでその値を更新している
          autoFocus
          // 自動でキーボードが出てくる処理。
          // ちなみにautoFocus={true}と同じ意味になる
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
        // handlePressという関数をという関数をを上で定義
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
