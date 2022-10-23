import { Music } from '../../common/js/util';

const YTM_TITLE_HEAD = 'YouTube Music で ';
const YTM_TITLE_TAIL = ' をご覧ください';

export function isYTMTitle(titleParam: string) {
  return
    titleParam.startsWith(YTM_TITLE_HEAD)
    && titleParam.endsWith(YTM_TITLE_TAIL);
}

// Web Share Target API の title パラメータをパースし, 曲情報に変換する.
// 曲情報に複数通りの可能性があるならその全てからなるリストを, 1つもない場合は空のリストを返す.
// YouTube Music では '"silky heart" を YouTube で見る' のような形式になっている
export function parseYTMTitle(titleParam: string): Music[] {
  const title = titleParam
    .slice(YTM_TITLE_HEAD.length)
    .slice(0, -YTM_TITLE_TAIL.length);
  // 両端のダブルクオテーションをカット
  return [{ title }];
}
