import { Box, Button, Modal, Typography } from '@mui/material';

type Props = {
  open: boolean;
  message: string;
  onClick: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function OneButtonModal({ open, message, onClick }: Props) {
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Box>
          <Typography variant="inherit"  sx={{ mb: 2 }}>{message}</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button variant="outlined" color="success" onClick={() => onClick()}>확인</Button>
        </Box>
      </Box>
    </Modal>
  );
}
