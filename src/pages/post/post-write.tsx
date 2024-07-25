// react
import { useState } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { userInfoPState } from 'src/states/recoils';
// libraries
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// apis
import { createPost } from 'src/api/posts-api';
// types
import { PostCreateReq } from 'src/types/post.type';
// components
import OneButtonModal from 'src/components/one-button-modal';
// @mui
import { Button, Grid, TextField, Typography } from '@mui/material';

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
  // useForm
  const { register, handleSubmit, formState: { errors } } = useForm<formType>();

  /**-------------------------------- useMutation --------------------------------------*/
  /*post 데이터 생성*/
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log('success data : ', data);
      setOpenModal(true);
    }
  });

  /**-------------------------------- onSubmit --------------------------------------*/
  const onSubmit = (data: formType) => {
    const formData:PostCreateReq = {
      ...data,
      userId: userInfo.id
    }
    mutation.mutate(formData);
  }

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  const handleListClick = () => {
    navigate('/posts');
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
