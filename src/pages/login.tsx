import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { UserInfo } from 'src/types/user.type';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfoPState, userInfoState } from '../states/recoils';
import { useState } from 'react';

export default function Login() {
  const [reqId, setReqId] = useState<string>('1');
  const setUserInfo = useSetRecoilState(userInfoState);
  const [pUserInfo, setPUserInfo] = useRecoilState(userInfoPState);

  /*데이터 fetch*/
  const fetchData = async (): Promise<UserInfo> => {
    return await axios.get(`https://jsonplaceholder.typicode.com/users/${reqId}`).then((response) => response.data);
  };

  const login = async () => {
    try {
      const userInfoRes = await fetchData();
      if (userInfoRes) {
        console.log(userInfoRes);
        setUserInfo({
          id: userInfoRes.id,
          username: userInfoRes.username,
          isAuthenticated: true
        });
      }
    } catch (e) {
      console.error('[login] error : ', e);
    }
  }

  const pLogin = async () => {
    try {
      const userInfoRes = await fetchData();
      if (userInfoRes) {
        console.log(userInfoRes);
        setPUserInfo({
          id: userInfoRes.id,
          username: userInfoRes.username,
          isAuthenticated: true
        });
      }
    } catch (e) {
      console.error('[login] error : ', e);
    }
  }

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={5}>
        <Typography align="center" variant="h4">로그인</Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <TextField label="Standard" variant="standard" onChange={(e) => setReqId(e.target.value)} />
          <Button variant="contained" sx={{ ml: 3 }} onClick={() => login()}>로그인</Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Typography variant="inherit">{pUserInfo.username}</Typography>
          <Button sx={{ ml : 3 }} variant="contained" color="info" onClick={() => pLogin()}>Persist 로그인</Button>
        </Box>
      </Grid>
    </Grid>
  );
}
