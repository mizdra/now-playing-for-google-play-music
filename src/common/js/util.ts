export type Music = {
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  playCount?: string | null;
};

export function renderText(template: string, music: Music) {
  return template
    .replace(/\${title}/g, music.title || '')
    .replace(/\${artist}/g, music.artist || '')
    .replace(/\${album}/g, music.album || '')
    .replace(/\${playCount}/g, music.playCount || '');
}

export function renderURL(text: string, hashtags: string) {
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = encodeURIComponent(hashtags);
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}`;
}

export function renderBugReportURL(debugInfo: any) {
  const text = `
症状: <ここに症状を記載して下さい>
デバッグ情報: ${JSON.stringify(debugInfo)}
  `.trimRight();

  const url = `https://twitter.com/intent/tweet?screen_name=mizdra&hashtags=now-playing-for-gpm&text=${encodeURIComponent(
    text,
  )}`;

  return url;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
