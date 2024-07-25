// react
import { useState } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { userInfoPState } from 'src/states/recoils';
// libraries
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
// apis
import { fetchPost, updatePost } from 'src/api/posts-api';
// types
import { Post } from 'src/types/post.type';
// components
import OneButtonModal from 'src/components/one-button-modal';
// @mui
import { Button, Grid, TextField, Typography } from '@mui/material';
import LoadingSpinner from 'src/components/loading-spinner';
import ErrorModal from 'src/components/error-modal';

interface formType {
  title: string;
  body: string;
}

export default function PostEdit() {
  // params
  const { id } = useParams();
  // navigate
  const navigate = useNavigate();
  // recoil
  const userInfo = useRecoilValue(userInfoPState);
  // state
  const [openModal, setOpenModal] = useState<boolean>(false);
  // useForm
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formType>();
  const queryClient = useQueryClient();
  /**-------------------------------- useQuery --------------------------------------*/
  /*post 데이터 fetch*/
  const { data, isSuccess, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(parseInt(id as string)),
    enabled: !!id
  });
  /**-------------------------------- useMutation --------------------------------------*/
  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      console.log('success data : ', data);
      // invaildate and refecth
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      setOpenModal(true);
    }
  });

  if (isSuccess) {
    setValue('title', data.title);
    setValue('body', data.body);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <ErrorModal />;
  }

  /**-------------------------------- onSubmit --------------------------------------*/
  const onSubmit = (data: formType) => {
    const formData:Post = {
      ...data,
      id: parseInt(id as string),
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
              <Typography align="center" variant="h4">수정</Typography>
            </Grid>
            <Grid container item justifyContent="flex-end" alignItems="center">
              <Button variant="contained" color="info" onClick={() => handleListClick()}>목록</Button>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="제목"
                {...register('title', { required: '제목은 필수입니다.' })}
              />
              <Typography variant="caption" color="red">{errors.title?.message}</Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                rows={12}
                {...register('body')}
              />
            </Grid>
            <Grid container item justifyContent="flex-end">
              <Button variant="contained" color="warning" type="submit">수정</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <OneButtonModal open={openModal} message="수정되었습니다." onClick={() => setOpenModal(false)} />
    </>
  );
}
