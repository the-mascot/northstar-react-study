import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export function UseCallbackTest() {
  const [bool1, setBool1] = useState<boolean>(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // 동등성 확인
    functionEquality();
  }, []);

  const fetchData = useCallback(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.data)
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * 함수 동등성
   * add1 과 add2 는 같은 기능의 함수라도 객체 참조주소가 다르기 때문 에 === 결과는 false 이다
   * */
  const functionEquality = () => {
    console.log(add1 === add2);
  };
  const add1 = () => 1 + 2;
  const add2 = () => 1 + 2;

  const handleOnClick = () => {
    console.log('=====[handleOnClick]===== 실행');
  };

  // useCallback 선언
  const callbackHandleOnClick = useCallback(handleOnClick, [data]);

  return (
    <Box>
      <Typography variant="h4" sx={{ margin: 3 }}>
        useCallback 테스트 샘플
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        부모 컴포넌트 버튼을 클릭시 부모 컴포넌트에 있는 state가 변경되어 리렌더링이 발생한다.
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        자식 컴포넌트는 useCallback 을 사용하지 않아 props 에 handleOnClick 의 동등성이 바뀌어 재호출 된다.
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        자식 컴포넌트 - useCallback 은 useCallback 을 사용하여 기존 함수가 반환되어 리렌더링 되지 않는다.
      </Typography>
      <Button color="primary" onClick={() => setBool1(!bool1)}>부모컴포넌트</Button>
      {/** 자식 컴포넌트 */}
      <MemoButton handleOnClick={handleOnClick} />
      {/** 자식 컴포넌트 - useCallback */}
      <MemoCallbackButton handleOnClick={callbackHandleOnClick} />
    </Box>
  );
}

type Props = {
  handleOnClick: any;
};

/*자식 컴포넌트*/
function SonButton({ handleOnClick }: Props) {
  console.log('=====[SonButton]===== 렌더링');

  return (
    <Box sx={{ mt: 3 }}>
      <Button color="success" onClick={handleOnClick}>자식 컴포넌트</Button>
    </Box>
  );
}

/*자식 컴포넌트 - useCallback*/
function CallbackButton({ handleOnClick }: Props) {
  console.log('=====[CallbackButton]===== 렌더링');

  return (
    <Box sx={{ mt: 3 }}>
      <Button color="error" onClick={handleOnClick}>자식 컴포넌트 - useCallback</Button>
    </Box>
  );
}

/*React.memo() 사용*/
const MemoButton = React.memo(SonButton);
const MemoCallbackButton = React.memo(CallbackButton);
