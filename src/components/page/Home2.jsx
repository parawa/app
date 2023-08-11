import React from 'react'
import "../../../src/index.css";
import { Box, ThemeProvider, Typography } from '@mui/material';
import { Col, Row,Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import useCustomTheme from '../hooks/useCustomTheme';
import useUploadImages from '../hooks/useUploadImages';

export default function Home2() {
  const navigate = useNavigate()
  const { theme } = useCustomTheme();
 
  
  return (
    <ThemeProvider theme={theme} >
      <div style={{
        opacity: 0.9,
        backgroundImage: 'url(BG.png)',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        minWidth: '-webkit-fill-available'
      }}>
        <Box className='box-title' >
          <Row >
            <Box style={{ color: "#fff",textShadow: '2px 2px #000' }}>
              <Typography style={{fontSize:'2.5rem',  fontWeight: '900',}}>ระบบแฟ้มเอกสาร</Typography>
            </Box>
          </Row>
          <Row gutter={[48, 48]} >
            <Col ><Button
              className='button'
              onClick={() => { navigate('../home') }} >
                <Typography>เพิ่มแฟ้มเอกสาร</Typography>    
            </Button>
            </Col>
            <Col ><Button
             className='button'
              onClick={() => { navigate('../search') }} >
                <Typography> ค้นหาข้อมูล</Typography>  
            </Button>
            </Col>
          </Row>
        </Box>
      </div>
    </ThemeProvider>
  )
}
