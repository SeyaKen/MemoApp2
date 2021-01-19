import React, { useState } from 'react';
import {
  StyleSheet, TextInput, View, Text, TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 一つ上のnavigationとおなじでuseState('初期値')という配列から、emailとsetEmailという値を取り出している。
  // 最初のemailには保持したい内容が入り、setEmailには更新したい内容が入る

  function handlePress() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    // https://firebase.google.com/docs/auth/web/password-auth?hl=jaに詳しく乗ってるが、毎回このようにsignIn画面に書くのがお決まりになっているらしい↓のも
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
        // onPress={() => { navigation.reset({
        // index: 0,
        // 履歴の一番目だけを表指示するという意味
        // routes: [{ name: 'MemoList' }],
        // });
        // }}のように指定することで、routesで指定した値に履歴を上書きする。今回の場合だと、signinして、MemoListに移動した時backボタンを消せる。
      })
    // then(ここに会員登録が成功したときの関数を書く)
    // 上のconstで値をしてしているので、ここで、emialとpasswordを使うことができる。
      .catch((error) => {
        Alert.alert(error.code);
        // Alertを使いエラーコードを出力
      });
    // catchにはerrorの時の処理を書くことができる。
  }
  return (
    <View style={styles.create}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          // ユーザーが打ち込んだ値を引数引数textとして受け取って、setEmailの中で使い打ち込まれるごとに、値を更新している
          //  ここでうえで設定した、emailとsetEmailを使う
          // onChangetext={(text) => { setEmail(text); }}を指定することで、ユーザーが入力した値を受け取れる
          autoCapitalize="none"
          // 最初の文字を大文字にしない設定
          keyboardType="email-address"
          // キーボードのタイプをemailaddressようにしてくれる
          placeholder="Email Adress"
          // デフォルトでうっすらと文字を入力しといてくれる
          textContentType="emailAddress"
          // これを設定することで、iosの場合自動でメールアドレスとパスワードをとってきてくれる
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          // 最初の文字を大文字にしない設定
          placeholder="Password"
          secureTextEntry
          // パスワードを入力するとき●にしてくれる
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={handlePress}
          // onPress={() => { navigation.reset({
            // index: 0,
            // 履歴の一番目だけを表指示するという意味
            // routes: [{ name: 'MemoList' }],
          // });
          // }}のように指定することで、routesで指定した値に履歴を上書きする。今回の場合だと、signinして、MemoListに移動した時backボタンを消せる。
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 16,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
  footer: {
    flexDirection: 'row',
    // 元々react nativeはflexが逆になっているからflexDirection: 'row'を指定することで、ここではwebと同じ向きにflexを指定している
  },
});
