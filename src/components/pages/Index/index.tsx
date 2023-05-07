import { useState } from 'react';
import Modal from 'react-modal';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { usePosts } from '@/features/post/hooks/usePosts';
import { NowLoading } from '@/components/elements/NowLoading';
import styles from './index.module.css';

// Modalを表示するHTML要素のidを指定
Modal.setAppElement('#__next');

export const Index = () => {
  // useUsersからユーザー一覧などを取得して代入
  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();

  // usePostsから投稿一覧などを取得して代入
  const {
    posts,
    getPosts,
    isLoading: postsIsLoading,
    error: postsError,
  } = usePosts();

  // useStateを使用してモーダルウィンドウの表示/非表示を表すbool値を宣言
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /** モーダルウィンドウを表示にする関数 */
  const openModal = () => setModalIsOpen(true);
  /** モーダルウィンドウを非表示にする関数 */
  const closeModal = () => setModalIsOpen(false);

  /**
   * uidを引数にとり, そのユーザーの投稿一覧をモーダルウィンドウで表示する
   * @param uid user id
   */
  const viewPosts = (uid: number) => {
    // 投稿一覧の取得が成功したらモーダルウィンドウを表示する
    getPosts(uid).then(() => {
      openModal();
    });
  };

  return (
    <main>
      <h1>Hello Next</h1>
      {/* ローディング中はローディング中のUIを表示 */}
      {usersIsLoading && <NowLoading />}
      {/* エラーがある場合は表示する */}
      {usersError && <p>{usersError}</p>}
      {/* ユーザー一覧をmapを使用して動的に表示 */}
      {users.map((user) => (
        // classNameに*.module.cssで設定した名称を指定
        <div key={user.id} className={styles.userWrapper}>
          <span>{user.username}</span>
          <span className={styles.colon}>:</span>
          {/* onClickに無名関数を渡して投稿一覧を取得. () => func(arg)とすることで引数を渡せる */}
          <button className={styles.button} onClick={() => viewPosts(user.id)}>
            view posts
          </button>
        </div>
      ))}
      {/* モーダルウィンドウ. onRequestCloseを設定してモーダル外がクリックされたときでも閉じるようにする */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {postsIsLoading && <NowLoading />}
        {postsError && <p>{postsError}</p>}
        {/* 投稿一覧をmapを使用して動的に表示 */}
        {posts.map((post) => (
          <div key={post.id} className={styles.posts}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
        {/* 閉じるボタン. classNameを空白区切りで設定すると複数のstyleを当てられる */}
        <button
          className={`${styles.button} ${styles.closeButton}`}
          onClick={closeModal}
        >
          close
        </button>
      </Modal>
    </main>
  );
};
