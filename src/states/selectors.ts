import { selector } from 'recoil';
import { UserInfo } from 'src/types/user.type';
import { userInfoState } from './recoils';

export const userInfoSelector = selector<UserInfo>({
  key: 'userInfoSelector',
  get: ({ get }) => {
    return get(userInfoState);
  },
  set: ({ set }, newResponse) => {
    set(userInfoState, (prevValue) => ({
      ...prevValue,
      ...newResponse
    }));
  }
});
