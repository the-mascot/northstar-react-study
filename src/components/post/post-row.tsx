import { TableCell, TableRow, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type PostRowProps = {
  id: number;
  userId: number;
  title: string;
  onClick: (id: number) => void;
};

/*테이블 Row 컴포넌트*/
export default function PostRow({ id, userId, title, onClick }: PostRowProps) {
  return (
    <>
      <TableRow onClick={() => onClick(id)} hover sx={{ cursor: 'pointer' }}>
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
