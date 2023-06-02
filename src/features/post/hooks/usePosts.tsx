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
  // TODO: 実装
  // TODO: 実装

  // EXチャレンジ(岩見はやってみよう^^). useRefとMapを使用して取得結果をメモ化する
  // この辺参考に
  // https://github.com/ishida-0622/yumemi-coding-test/blob/main/src/hooks/usePopulation.tsx

  /**
   * uidを引数にとり, ユーザーの投稿一覧を取得する
   * @param uid user id
   */
  const getPosts = async (uid: number) => {
    // データの取得中に変更
    // TODO: 実装
    try {
      // APIを叩いて投稿一覧を取得する. リクエストURLの末尾に「?userId=1」のように指定すると該当ユーザーの投稿を取得できます
      // TODO: 実装
      // 失敗している場合は例外を投げる
      // TODO: 実装
      // json形式に変換
      // TODO: 実装
      // 変換したものをセット
      // TODO: 実装
    } catch (e) {
      // エラーメッセージをセット
      // TODO: 実装
    } finally {
      // データの取得中かを変更
      // TODO: 実装
    }
  };

  // posts, getPosts, isLoading, errorを返す
  // TODO: 実装
  return { getPosts };
};
