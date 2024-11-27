import { Stack } from '@mui/material'
import {FC} from 'react'
import Comment from '../../../components/home/post/Comment'

const Replies:FC = () => {
  return (
    <>
      <Stack
      flexDirection={"column"}
      gap={2}
      width={"800px"}
      mx={"auto"}
      >
      <Comment/>
      </Stack>
    </>
  )
}

export default Replies
