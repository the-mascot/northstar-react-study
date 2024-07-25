import { Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/posts-api';
import { PostCreateReq } from '../../types/post.type';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { userInfoPState } from '../../states/recoils';
import { useState } from 'react';
import OneButtonModal from '../../components/one-button-modal';

interface formType {
  title: string;
  body: string;
}

export default function PostWrite() {
  // navigate
  const navigate = useNavigate();
  // recoil
  const userInfo = useRecoilValue(userInfoPState);
  // state
  const [openModal, setOpenModal] = useState<boolean>(false);
  /**-------------------------------- useMutation --------------------------------------*/
  const { register, handleSubmit, reset, formState: { errors } } = useForm<formType>();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log('success data : ', data);
      setOpenModal(true);
    }
  });

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  const handleListClick = () => {
    navigate('/posts');
  }

  const onSubmit = (data: formType) => {
    const formData:PostCreateReq = {
      ...data,
      userId: userInfo.id
    }
    mutation.mutate(formData);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" alignItems="center" xl={12}>
          <Grid direction="column" container item xl={8} spacing={3}>
            <Grid item>
              <Typography align="center" variant="h4">글쓰기</Typography>
            </Grid>
            <Grid container item justifyContent="flex-end" alignItems="center">
              <Button variant="contained" color="info" onClick={() => handleListClick()}>목록</Button>
            </Grid>
            <Grid item>
              <TextField fullWidth label="제목" {...register('title', { required: '제목은 필수입니다.' })}></TextField>
              <Typography variant="caption" color="red">{errors.title?.message}</Typography>
            </Grid>
            <Grid item>
              <TextField fullWidth multiline rows={12} {...register('body')}></TextField>
            </Grid>
            <Grid container item justifyContent="flex-end">
              <Button variant="contained" color="warning" type="submit">등록</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <OneButtonModal open={openModal} message="등록되었습니다." onClick={() => setOpenModal(false)} />
    </>
  );
}
