import { Button, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPost } from 'src/api/posts-api';
import LoadingSpinner from 'src/components/loading-spinner';
import ErrorModal from 'src/components/error-modal';
import { Post } from 'src/types/post.type';

export default function PostDetail() {
  // params
  const { id } = useParams();
  // navigate
  const navigate = useNavigate();

  /**-------------------------------- useQuery --------------------------------------*/
  const { data, isLoading, isError } = useQuery<Post>({
    queryKey: [id],
    queryFn: () => fetchPost(id as string),
    enabled: !!id
  })

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <ErrorModal />;
  }

  /**-------------------------------- 이벤트 헨들러 --------------------------------------*/
  const handleListClick = () => {
    navigate('/posts');
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid item xs={8}>
        <Grid container item justifyContent="flex-end">
          <Button variant="contained" color="info" onClick={() => handleListClick()}>목록</Button>
        </Grid>
        <Grid item mt={3}>
          <Typography variant="h4">
            {data.title}
          </Typography>
        </Grid>
        <Grid item mt={5}>
          <Typography variant="subtitle1">
            {data.body}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
