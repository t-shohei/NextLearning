import { Posts } from '@/types/post';
import { useState } from 'react';

// 投稿を取得するカスタムフックを作成

/**
 * 投稿を取得するカスタムフック
 * @returns posts 投稿一覧
 * @returns getPosts 投稿一覧を取得する関数
 * @returns isLoading データの取得中か？
 * @returns error エラーメッセージ
 */
export const usePosts = () => {
  // 投稿一覧, データの取得中かを表すbool値, エラーメッセージ(無い場合はnull)をuseStateを使用して定義
  const [posts, setPosts] = useState<Posts>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EXチャレンジ(岩見はやってみよう^^). useRefとMapを使用して取得結果をメモ化する
  // この辺参考に
  // https://github.com/ishida-0622/yumemi-coding-test/blob/main/src/hooks/usePopulation.tsx

  /**
   * uidを引数にとり, ユーザーの投稿一覧を取得する
   * @param uid user id
   */
  const getPosts = async (uid: number) => {
    // データの取得中に変更
    setIsLoading(true);
    try {
      // APIを叩いて投稿一覧を取得する
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts?userId=${uid}`
      );
      // 失敗している場合は例外を投げる
      if (!res.ok) {
        throw new Error(`${res.status}. ${res.statusText}`);
      }
      // json形式に変換
      const posts: Posts = await res.json();
      // 変換したものをセット
      setPosts(posts);
    } catch (e) {
      // エラーメッセージをセット
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('unknown error. from usePosts.tsx');
      }
    } finally {
      // データの取得中かを変更
      setIsLoading(false);
    }
  };

  return { posts, getPosts, isLoading, error };
};
