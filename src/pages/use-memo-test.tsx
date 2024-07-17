import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useMemo, useRef, useState } from 'react';
import { Button } from '@mui/material';

export function UseMemoTest() {
  const [bool1, setBool1] = useState<boolean>(false);
  const [bool2, setBool2] = useState<boolean>(false);
  const num1 = useRef<number>(0);
  const num2 = useRef<number>(0);
  const num3 = useRef<number>(0);

  /*useMemo 를 사용하지 않은 함수*/
  const expensiveFunction1 = () => {
    console.log('=====[expensiveFunction1]===== Start');
    let startNum = 1;
    num1.current += 1;
    console.log('=====[expensiveFunction1]===== num1 : ', num1.current);
    for (let i = 1; i < 99999999; i++) {
      startNum += 100000;
    }
    startNum += num1.current;
    console.log('=====[expensiveFunction1]===== startNum : ', startNum);

    return startNum;
  };

  /*useMemo, deps 빈 배열을 사용한 함수*/
  const expensiveFunction2 = () => {
    console.log('=====[expensiveFunction2]===== start');
    let startNum = 1;
    num2.current += 1;
    console.log('=====[expensiveFunction2]===== num2 : ', num2.current);
    for (let i = 1; i < 99999999; i++) {
      startNum += 100000;
    }
    startNum += num2.current;
    console.log('=====[expensiveFunction2]===== startNum : ', startNum);

    return startNum;
  };

  /*useMemo, deps에 bool2를 사용한 함수*/
  const expensiveFunction3 = () => {
    console.log('=====[expensiveFunction3]===== start');
    let startNum = 1;
    num3.current += 1;
    console.log('=====[expensiveFunction3]===== num3 : ', num3.current);
    for (let i = 1; i < 99999999; i++) {
      startNum += 100000;
    }
    startNum += num3.current;
    console.log('=====[expensiveFunction3]===== startNum : ', startNum);

    return startNum;
  };

  const memoizedValue2 = useMemo(() => expensiveFunction2(), []);
  const memoizedValue3 = useMemo(() => expensiveFunction3(), [bool2]);

  return (
    <Box>
      <Typography variant="h4" sx={{ margin: 3 }}>
        useMemo 테스트 샘플
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        첫번째 컴포넌트는 버튼을 누를때마다 리렌더링되어 expensiveFunction1 이 계속 호출 된다.
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        두번쨰 컴포넌트는 useMemo() 의 deps 에 빈 배열임으로 처음 계산된 결과를 기억해 expensiveFunction2이 재호출
        되지않음.
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        세번째 컴포넌트는 deps 에 bool2 를 넣어 bool2가 변경되는 버튼2를 눌러야 변경된다.
      </Typography>

      <Button color="primary" onClick={() => setBool1(!bool1)}>버튼1</Button>

      {/** useMemo 사용하지 않은 케이스 */}
      <Box>
        <Typography variant="h4" sx={{ margin: 3 }}>
          {expensiveFunction1()}
        </Typography>
      </Box>

      {/** useMemo, deps 빈 배열 사용 한 케이스 */}
      <Box>
        <Typography variant="h4" sx={{ margin: 3 }}>
          {memoizedValue2}
        </Typography>
      </Box>

      {/** useMemo, deps bool2 사용 한 케이스 */}
      <Box>
        <Button color="info" onClick={() => setBool2(!bool2)}>버튼2</Button>
        <Typography variant="h4" sx={{ margin: 3 }}>
          {memoizedValue3}
        </Typography>
      </Box>
    </Box>
  );
}
