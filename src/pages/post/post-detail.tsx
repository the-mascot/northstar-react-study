// react
import { useEffect, useState } from 'react';
// recoil
import { useRecoilValue } from 'recoil';
import { userInfoPState } from 'src/states/recoils';
// apis
import { deletePost, fetchPost } from 'src/api/posts-api';
// libraries
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
// components
import ErrorModal from 'src/components/error-modal';
import LoadingSpinner from 'src/components/loading-spinner';
import OneButtonModal from 'src/components/one-button-modal';
// types
import { Post } from 'src/types/post.type';
// @mui
import { Button, Grid, Typography } from '@mui/material';

export default function PostDetail() {
  // params
  const { id } = useParams();
  // navigate
  const navigate = useNavigate();
  // recoil
  const userInfo = useRecoilValue(userInfoPState);
  // state
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  /**-------------------------------- useQuery --------------------------------------*/
  /*post 데이터 fetch*/
  const { data, isSuccess, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(parseInt(id as string)),
    enabled: !!id
  });

  /**-------------------------------- useMutation --------------------------------------*/
  /*post 데이터 delete*/
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      console.log(data);
      setOpenModal(true);
    }
  });

  /**-------------------------------- uesEffect --------------------------------------*/
  useEffect(() => {
    // 편집 가능여부 확인
    if (isSuccess && data) {
      if ((data.userId === userInfo.id) && userInfo.isAuthenticated) {
        setIsAuthor(true);
      }
    }
  }, [isSuccess, data, userInfo.id])

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <ErrorModal />;
  }

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  /*목록 클릭이벤트*/
  const handleListClick = () => {
    navigate('/posts');
  }
  /*수정 클릭이벤트*/
  const handleEditClick = () => {
    navigate(`/post/edit/${data.id}`);
  }
  /*삭제 클릭이벤트*/
  const handleDeleteClick = () => {
    mutation.mutate(parseInt(id as string));
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container item direction="column" justifyContent="center" alignItems="center"  xl={9} spacing={5}>
        <Grid container item justifyContent="flex-end">
          <Button variant="contained" color="info" onClick={() => handleListClick()}>목록</Button>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {data.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            {data.body}
          </Typography>
        </Grid>
        {isAuthor && (
          <Grid container item justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" color="warning" onClick={handleEditClick}>수정</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={handleDeleteClick}>삭제</Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      <OneButtonModal open={openModal} message="삭제 되었습니다." onClick={handleListClick} />
    </Grid>
  );
}
