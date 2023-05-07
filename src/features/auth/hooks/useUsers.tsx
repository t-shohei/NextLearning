import { Users } from '@/types/user';
import { useEffect, useState } from 'react';

// ユーザー一覧を取得するカスタムフックを作成

/**
 * ユーザーの一覧を取得するカスタムフック
 * @returns users ユーザー一覧
 * @returns isLoading データの取得中か？
 * @returns error エラーメッセージ
 */
export const useUsers = () => {
  // ユーザー一覧, データの取得中かを表すbool値, エラーメッセージ(無い場合はnull)をuseStateを使用して定義
  const [users, setUsers] = useState<Users>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffectを使用して非同期処理を行う
  useEffect(() => {
    /**
     * ユーザー一覧を取得する非同期処理関数
     */
    const fetchUsers = async () => {
      try {
        // APIを叩いてユーザー一覧を取得する
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`
        );
        // 失敗している場合は例外を投げる
        if (!res.ok) {
          throw new Error(`${res.status}. ${res.statusText}`);
        }
        // json形式に変換
        const users: Users = await res.json();
        // 変換したものをセット
        setUsers(users);
      } catch (e) {
        if (e instanceof Error) {
          // エラーメッセージをセット
          setError(e.message);
        } else {
          setError('unknown error. from useUsers.tsx');
        }
      } finally {
        // データの取得中かを変更
        setIsLoading(false);
      }
    };

    // 非同期処理を実行
    fetchUsers();

    // 第二引数に空配列をセットすることで初回レンダリング時のみ呼び出される
  }, []);

  return { users, isLoading, error };
};
