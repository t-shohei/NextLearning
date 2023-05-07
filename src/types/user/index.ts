// https://jsonplaceholder.typicode.com/users を参考にしてUser型を定義してエクスポートする
export type User = {
  id: number;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

// Users型(Userの配列)を定義してエクスポートする
export type Users = User[];
