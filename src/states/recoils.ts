import { atom } from 'recoil';
import { UserInfo } from 'src/types/user.type';

export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    id: '',
    username: '',
    isAuthenticated: false
  }
});
