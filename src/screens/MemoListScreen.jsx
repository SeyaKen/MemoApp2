import React, { useEffect, useState } from 'react';
// componentの中で値を保持した場合はuseStateを使う
// useEffectを使いメモを監視しておく
import {
  StyleSheet, View, Alert, Text,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  // memosにまず空の配列が入りsetMemosでその値を更新
  const [isLoading, setLoading] = useState(false);
  // 最初の値isLoadingはfalseをsetLoadingで上書き
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
      // headerRight:<LogOutButton />ではなく、かんすうをていぎしなければならないので、
      // headerRight: () => { return <LogOutButton /> }
      // さらに今回は省略できるので省略してある
    });
    // ここでheaderの右にボタンを設置している。今回の場合だとcomponentsのファイルからLogOutButtonを読み込んで使う
  }, []);
  // 配列[]を指定することで、処理を一回だけ実行できる

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    // この処理により、今ログインしているユーザーをcurrentUserに代入できる
    let unsubscribe = () => {};
    // if文の中でしかunsubscribeが定義されていないこのになっているのでここで変更可能なletとしてunsubscribeを定義
    if (currentUser) {
      // もしcurrentUserがいれば下の処理を実行
      setLoading(true);
      // 読み込むときローディングのアニメーションを出す
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      // .orderBy('updatedAt', 'desc')を追加することで、日付（updatedAt)が早い順（降順（10.9.8.7...)) descでメモを並べ替えてくれる
      unsubscribe = ref.onSnapshot((snapshot) => {
      // (snapshot)にはメモの情報が入っている。onSnapshotによりリストを取得
        const userMemos = [];
        // userMemosというからの配列を準備
        snapshot.forEach((doc) => {
        // snapshotという配列の中身の一つ一つのdocという要素にこの下でforEachで処理を加えていく

          // コンソール上にdocのidとdocのdataを表示する処理
          // dataは関数
          const data = doc.data();
          // 定数dataにdocの中の入っているbodyTextとappdatedAtを代入
          userMemos.push({
          // pushは配列の中に要素をひとつづつ追加することができる。userMemosという配列にこの下に書いてあることをどんどん追加いく
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
            // .toDateを追加することでfirebaseのタイムカードから、javascriptで使える文字になる
          });
        });
        setMemos(userMemos);
        // setMemosを使い上で作ったuserMemos配列で、memosを更新
        setLoading(false);
        // 終わったら、ぐるぐるのアニメーションを無くす
      }, () => {
        // onSnapshotでリストを取得できなかったときの処理
        setLoading(false);
        Alert.alert('データの読み込みに失敗しました。');
        // errorメッセージをコンソール上とユーザーに知らせる
      });
    }
    return unsubscribe;
    // これを指定することで監視をキャンセルできる
  }, []);
  // []を指定することで一回だけその処理を実行することができる

  if (memos.length === 0) {
    // もしmemoの中身がなかったら、
    // この下のreturnが実行されたら、その下のreturnは実行されない
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => { navigation.navigate('MemoCreate'); }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      {/* このpropsをMemoListで受け取って入力できるようにする */}
      <CircleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
    // ボタンを真ん中にする処理
  },
});
