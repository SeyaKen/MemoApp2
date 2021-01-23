// このページでは日付をわかりやすい形に変換していきます
import { format } from 'date-fns';

export function dateToString(date) {
  if (!date) { return ''; }
  // もし日付が存在しない場合空の文字列を返す
  return format(date, 'yyyy年M月d日 HH時mm分');
}
