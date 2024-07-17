import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';

export default function RenderTest() {
  const [open, setOpen] = useState<boolean>(false);
  const [bool, setBool] = useState<boolean>(false);
  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>모달 OPEN</Button>
      <ChildrenComponent open={open} bool={bool} setBool={setBool} />
    </Box>
  );
}

type Props = {
  open: boolean;
  bool: boolean;
  setBool: React.Dispatch<React.SetStateAction<boolean>>
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

/*자식컴포넌트*/
function ChildrenComponent({ open, bool, setBool }: Props) {
  const [modalBtn, setModalBtn] = useState(false);
  console.log('ChildrenComponent 호출');
  const hello = () => {
    console.log('hello 호출');
    return '안녕하세요';
  }
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Typography variant="h4">모달</Typography>
        <Typography variant="h4">{hello()}</Typography>
        <Button variant="outlined" onClick={() => setModalBtn(!modalBtn)}>modalBtn state 변경</Button>
        <Button variant="outlined" color="success" onClick={() => setBool(!bool)}>open 변경</Button>
      </Box>
    </Modal>
  );
}

