import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RenderTest() {
  const [open, setOpen] = useState<boolean>(false);
  const [bool, setBool] = useState<boolean>(false);
  const [age, setAge] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ ml: 3 }}
      >
        모달 OPEN
      </Button>
      <ChildrenComponent open={open} bool={bool} setBool={setBool} />
      <Box sx={{ mt: 2, ml: 3 }}>
        <Typography>COUNT : {count}</Typography>
        <Typography>AGE : {age}</Typography>
        <Button variant="outlined" onClick={() => {
          setCount(count + 1);

          if (count < 3) {
            setAge(age + 1);
          }
        }}>COUNT 증가</Button>

      </Box>
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
  const [childrenBool, setChildrenBool] = useState(false);
  console.log('ChildrenComponent 호출');

  const hello = () => {
    console.log('hello 호출');
    return '안녕하세요';
  }

  useEffect(() => {
    console.log('ChildrenComponent useEffect 호출');
  }, [])

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Typography variant="h4" sx={{ mb: 2 }}>자식 컴포넌트</Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>{hello()}</Typography>
        <Button variant="outlined" onClick={() => setChildrenBool(!childrenBool)}>childrenBool state 변경</Button>
        <Button variant="outlined" color="success" onClick={() => setBool(!bool)}>open 변경</Button>
      </Box>
    </Modal>
  );
}
