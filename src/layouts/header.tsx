import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../states/recoils';

export default function Header() {
  return(
    <Stack justifyContent="space-between" direction="row">
      <Typography variant="h4">react-study</Typography>
      <UserProfile />
    </Stack>
  )
}

function UserProfile() {
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  }

  if (!userInfo.isAuthenticated) {
    return <Button variant="outlined" onClick={() => handleLoginClick()}>로그인</Button>;
  }

  return (
    <>
      <Typography variant="subtitle1" sx={{ mr: 3 }}>{userInfo.username}</Typography>
    </>
  );

}
