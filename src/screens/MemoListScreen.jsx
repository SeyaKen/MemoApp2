import React, { useEffect, useState } from 'react';
// componentの中で値を保持した場合はuseStateを使う
// useEffectを使いメモを監視しておく
import { StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  // memosにまず空の配列が入りsetMemosでその値を更新
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
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      // .orderBy('updatedAt', 'desc')を追加することで、日付（updatedAt)が早い順（降順（10.9.8.7...)) descでメモを並べ替えてくれる
      unsubscribe = ref.onSnapshot((snapshot) => {
      // (snapshot)にはメモの情報が入っている。onSnapshotによりリストを取得
        const userMemos = [];
        // userMemosというからの配列を準備
        snapshot.forEach((doc) => {
        // snapshotという配列の中身の一つ一つのdocという要素にこの下でforEachで処理を加えていく
          console.log(doc.id, doc.data());
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
      }, (error) => {
        // onSnapshotでリストを取得できなかったときの処理
        console.log(error);
        Alert.alert('データの読み込みに失敗しました。');
        // errorメッセージをコンソール上とユーザーに知らせる
      });
    }
    return unsubscribe;
    // これを指定することで監視をキャンセルできる
  }, []);
  // []を指定することで一回だけその処理を実行することができる

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
