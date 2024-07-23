import { atom } from 'recoil';
import { UserInfo } from 'src/types/user.type';
import { persistAtom } from 'src/states/recoil-persist';


export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    id: 0,
    username: '',
    isAuthenticated: false
  }
});

export const userInfoPState = atom<UserInfo>({
  key: 'userInfoPState',
  default: {
    id: 0,
    username: '',
    isAuthenticated: false
  },
  effects_UNSTABLE: [persistAtom]
});
