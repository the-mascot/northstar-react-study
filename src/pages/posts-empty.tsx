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
import { SxProps, Theme } from '@mui/material/styles';
import OneButtonModal from '../components/one-button-modal';
import TableHeadCustom from '../components/table-head-custom';
import EmptyContent from '../components/empty-content';

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

export function PostsEmpty() {
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
            <Button variant="contained" color="primary">REFETCH</Button>
            <Table size="medium" sx={{ minWidth: 960 }}>
              {/** 테이블 상단 */}
              <TableHeadCustom headLabel={TABLE_HEAD} />
              {/** 데이터 바디 */}
              <TableBody>
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
function PostRow({ id, userId, title }: PostRowProps) {
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

interface TextWrapperProps {
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

type TableNodataProps = {
  sx?: SxProps<Theme>;
};
/*데이터 없음*/
export default function TableNoData({ sx }: TableNodataProps) {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent
          filled
          title="No Data"
          sx={{
            py: 10,
            ...sx
          }}
        />
      </TableCell>
    </TableRow>
  );
}
