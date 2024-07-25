// react
import React, { useEffect, useState } from 'react';
// react-query
import { useQuery } from '@tanstack/react-query';
// apis
import { fetchPosts } from 'src/api/posts-api';
// components
import TableHeadCustom from 'src/components/table-head-custom';
import LoadingSpinner from 'src/components/loading-spinner';
import PostRow from 'src/components/post/post-row';
import TableNoData from 'src/components/table-no-data';
// types
import { Post } from 'src/types/post.type';
// @mui
import { Button, Grid, SxProps, Table, TableBody, TableContainer, Theme, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/error-modal';
import { useRecoilValue } from 'recoil';
import { userInfoPState } from '../../states/recoils';


/*테이블 헤더*/
const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 100 },
  { id: 'userId', label: 'USER ID', width: 100 },
  { id: 'title', label: 'TITLE', width: 500 }
];

export function PostList() {
  // navigate
  const navigate = useNavigate();
  // recoil
  const userInfo = useRecoilValue(userInfoPState);

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isSuccess, isLoading, isError } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  if (isSuccess) {
    console.log(data);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorModal />;
  }

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  /*테이블 ROW 클릭이벤트*/
  const handleRowClick = (id: number) => {
    navigate(`/post/${id}`);
  }

  /*글쓰기 클릭이벤트*/
  const handleWriteClick = () => {
    navigate('/post/write');
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid direction="column" container item xs={6} justifyContent="center" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h4">
            useQuery 테스트 샘플
          </Typography>
        </Grid>
        {userInfo.isAuthenticated && (
          <Grid container item justifyContent="flex-end">
            <Button variant="contained" onClick={() => handleWriteClick()}>글쓰기</Button>
          </Grid>
        )}
        <Grid justifyContent="center" item>
          <TableContainer>
            <Table size="medium" sx={{ minWidth: 960 }}>
              {/** 테이블 상단 */}
              <TableHeadCustom headLabel={TABLE_HEAD} />
              {/** 데이터 바디 */}
              <TableBody>
                {data && data.map((post) => (<PostRow key={post.id} id={post.id} userId={post.userId} title={post.title} onClick={(id) => handleRowClick(id)} />))}
                {!data && (<TableNoData />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
