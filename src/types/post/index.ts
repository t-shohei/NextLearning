// https://jsonplaceholder.typicode.com/posts を参考にしてPost型を定義してエクスポートする
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Posts型(Postの配列)を定義してエクスポートする
export type Posts = Post[];
