import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function LoadingOutlined() {
  return (
   <div style={{
    justifyContent: 'center',
    display: "flex",
    marginTop: "10px",
    marginBottom:"10px"
  }}>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  </div>
  )
}
