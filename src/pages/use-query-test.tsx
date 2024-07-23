import Typography from '@mui/material/Typography';
import React, { ReactNode, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, CircularProgress, Grid } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import OneButtonModal from '../components/one-button-modal';
import TableHeadCustom from '../components/table-head-custom';
import TableNoData from '../components/table-no-data';

/*테이블 헤더*/
const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 100 },
  { id: 'userId', label: 'USER ID', width: 100 },
  { id: 'title', label: 'TITLE', width: 500 }
];

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/*데이터 fetch*/
const fetchData = async (): Promise<Post[]> => {
  return await axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => response.data);
};

export function UseQueryTest() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, isError, error, isLoading, isSuccess, refetch } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchData
  });

  if (isSuccess) {
    console.log(data);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <OneButtonModal
        open={openModal}
        message="에러가 발생했습니다. 잠시후에 시도해주세요"
        onClick={() => setOpenModal(false)}
      />
    );
  }

  return (
    <Grid direction="column" justifyContent="center" alignItems="center" container>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ margin: 3 }}>
          useQuery 테스트 샘플
        </Typography>
      </Grid>
      <Grid justifyContent="center" item xs={8}>
        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset', minWidth: '1350px' }}>
            <Button variant="contained" color="primary" onClick={() => refetch()}>REFETCH</Button>
            <Table size="medium" sx={{ minWidth: 960 }}>
              {/** 테이블 상단 */}
              <TableHeadCustom headLabel={TABLE_HEAD} />
              {/** 데이터 바디 */}
              <TableBody>
                {data &&
                  data.map((post) => <PostRow key={post.id} id={post.id} userId={post.userId} title={post.title} />)}
                {!data && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
}

type PostRowProps = {
  id: number;
  userId: number;
  title: string;
};

/*테이블 Row 컴포넌트*/
export default function PostRow({ id, userId, title }: PostRowProps) {
  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TextWrapper>{id}</TextWrapper>
        <TextWrapper>{userId}</TextWrapper>
        <TextWrapper>{title}</TextWrapper>
      </TableRow>
    </>
  );
}

type TextWrapperProps = {
  children: ReactNode;
}

function TextWrapper({ children }: TextWrapperProps) {
  return (
    <TableCell sx={{ whiteSpace: 'nowrap' }}>
      <Typography variant="body2" color="#212b36">
        {children}
      </Typography>
    </TableCell>
  );
}
