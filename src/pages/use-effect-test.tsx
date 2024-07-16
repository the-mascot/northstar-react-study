import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

export function UseEffectTest() {
  console.log('내부함수 실행');
  /**-------------------------------- useState --------------------------------------*/
  const [bool1, setBool1] = useState<boolean>(false);
  const [bool2, setBool2] = useState<boolean>(false);
  const [bool3, setBool3] = useState<boolean>(false);
  const [bool4, setBool4] = useState<boolean>(false);
  /**-------------------------------- useRef --------------------------------------*/
  const isFirstRender = useRef<boolean>(true);
  const ref1 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('dependency 없음. 매 렌더링시 실행');
  });

  useEffect(() => {
    console.log('dependency []. 첫 렌더링시 실행');
  }, []);

  useEffect(() => {
    console.log('dependency [bool1]. bool1 변경 시 실행');
  }, [bool1]);

  useEffect(() => {
    console.log('dependency [bool2]. bool2 변경 시 실행');

    return () => {
      console.log('dependency [bool2] return 함수. bool2 변경 시 실행');
    };
  }, [bool2]);

  useEffect(() => {
    // 첫 렌더링시 실행 방지
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }
    console.log('dependency [bool3]. bool3 변경 시 실행.');

    return () => {
      console.log('dependency [bool3]. bool3 unmount 시 실행.');
    };
  }, [bool3]);

  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, [bool4]);

  return (
    <Box>
      <Typography variant="h4" sx={{ margin: 3 }}>
        useEffect 테스트 샘플
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        console 을 통해 deps 에 따라 언제 useEffect 가 실행 되는지 확인 할 수 있다.
      </Typography>

      {/** 버튼 1 */}
      <Box sx={{ display: 'flex', pb: 3 }}>
        <Typography variant="h4" sx={{ margin: 3 }}>
          {bool1.toString()}
        </Typography>
        <Button color="primary" onClick={() => setBool1(!bool1)}>버튼1</Button>
      </Box>

      {/** 버튼 2 */}
      <Box sx={{ display: 'flex', pb: 3 }}>
        <Typography variant="h4" sx={{ margin: 3 }}>
          {bool2.toString()}
        </Typography>
        <Button color="secondary" onClick={() => setBool2(!bool2)}>버튼2</Button>
      </Box>

      {/** 버튼 3 */}
      <Button color="success" onClick={() => setBool3(!bool3)}>버튼3</Button>
      {bool3 && <CardComponent1 bool3={bool3} />}

      <Divider variant="fullWidth" color="black" sx={{ mt: 3, mb: 5 }} />

      {/** useRef */}
      <Typography variant="h4" sx={{ margin: 3 }}>
        useRef Test
      </Typography>
      <TextField placeholder="검색어를 입력하세요." inputRef={ref1} sx={{ mr: 3 }} />
      <Button color="error" onClick={() => setBool4(!bool4)}>input에 focus</Button>
    </Box>
  );
}

type Props = {
  bool3: boolean;
};

function CardComponent1({ bool3 }: Props) {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle2" color="#212b36">
        카드 컴포넌트1
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '74px'
        }}
      >
        <Typography variant="h3">{bool3.toString()}</Typography>
        <div />
      </div>
    </Card>
  );
}
