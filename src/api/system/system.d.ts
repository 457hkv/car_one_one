export type LoginIn = {
  code: string;
};

export type LoginOut = {
  token: string;
};

export type userProfileInfo = {
  username: string;
  avatarUrl: string;
};

export interface userProfileInfoGetOut extends userProfileInfo {
  phoneNumber: string;
  id: number;
}
