import { SxProps, TableCell, TableRow, Theme } from '@mui/material';
import EmptyContent from './empty-content';
import React from 'react';

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
