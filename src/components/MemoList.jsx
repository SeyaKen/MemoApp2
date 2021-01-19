import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
// いちいちどのページでも読み込まないと使えないので注意
import { useNavigation } from '@react-navigation/native';
// useNavigationはreacthooksの一種
export default function MemoList() {
  const navigation = useNavigation();
  // この設定をすることで、useNavigationをnavigationとして使える
  return (
    <View>
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail'); }}
        // nvigation.navigateを使いたいが、navigationを使えるのはApp.jsxに登録されてる画面だけ。
  // そのため、useNavigation使う
      >
        <View>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2020/12/24 10:00</Text>
          {/* 左側 */}
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => (Alert.alert('Are you sure?'))}
        >
          <Feather name="x" size={16} color="#b0b0b0" />
          {/* 直接cssを書ける */}
          {/* 上でFeatherを読み込んだから使える */}
          {/* 削除ボタン */}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    // フレックスボックスの向きがreactnativeだと普通と逆だから、flexDirection: 'row'と書くと普通になる
    justifyContent: 'space-between',
    paddingVertical: 16,
    // 垂直方向のpadding,verticalは「垂直の」という意味
    paddingHorizontal: 19,
    // 横方向のpadding,horizontalは「水平の」という意味
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});
