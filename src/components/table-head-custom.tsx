// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)'
} as const;

// ----------------------------------------------------------------------

const LabelWrapper = styled.div<{ issublabel: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ issublabel }) => (issublabel ? 'center' : 'none')};
`;

const CustomTableCell = styled(TableCell)<{ issublabel: boolean }>`
  padding-top: ${({ issublabel }) => (issublabel ? '6px' : '16px')} !important;
  padding-bottom: ${({ issublabel }) => (issublabel ? '6px' : '16px')} !important;
`;

type Props = {
  order?: 'asc' | 'desc';
  orderBy?: string;
  headLabel: any[];
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
};

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx
}: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <CustomTableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
            issublabel={headCell.subLabel}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <LabelWrapper issublabel={headCell.subLabel}>
                {headCell.label}
                {headCell.subLabel && <Typography variant="subtitle2">{headCell.subLabel}</Typography>}
              </LabelWrapper>
            )}
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
