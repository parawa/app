import React, { useEffect, useState } from "react";
import useCustomTheme from "../hooks/useCustomTheme"
import { TextField, Typography, Box, ThemeProvider, Button, Card, CardActionArea, CardContent, CardMedia, } from "@mui/material";
import Layouts from "../Layout";
import MenuItem from "@mui/material/MenuItem";
import LoadingOutlined from "../LoadingOutlined";
import { Row, Col, Divider, message, Image, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from 'react-router-dom';
import useFetchFileData from "../hooks/useFetchFileData";

export default function Edit() {

  const { theme } = useCustomTheme();
  const location = useLocation()
  const [parcelCode, setParcelCode] = useState('')
  const [editData, setEditData] = useState({})
  // const fileId = useFetchFileData()
  const [files, setFiles] = useState({
    parcelCode: '',
    type: 0,
    image: {
      image: null,
      imageUrl: null
    },
    note: null,

  })

  const navigate = useNavigate()
  const { fetchFileData } = useFetchFileData()
  useEffect(() => {
    if (location.state.fileId) {
      fetchFileData(files, setFiles, location.state.fileId)
    }
  }, [])
  useEffect(() => {
    console.log(files)
  }, [files])

  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleCancel = () => setPreviewOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <Box
          component='form'
        >
          {/* <div> */}
          <Layouts />
          <Box className="Box-title" >
            <Row >
              <Col className="text-font backgroud " span={12}>
                <Typography style={{ fontWeight: '900', fontSize: '1.5rem', marginTop: '7px' }} >แฟ้มเอกสาร</Typography>
              </Col>
              <Col span={12}>
                <Row>
                  <Col className="text-font" span={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button
                      style={{ fontWeight: '900', color: '#ffffff', fontSize: '1.2rem' }}
                      onClick={() => { navigate('../search') }}
                    >
                      <SearchOutlined />
                      ค้นหาข้อมูล
                    </Button>
                  </Col>
                  <Col className="text-font" span={12} style={{ display: 'flex', justifyContent: 'flex-start', borderLeft: '3px solid #e8aa42ba' }} >
                    <Button
                      style={{ fontWeight: '900', color: '#ffffff', fontSize: '1.2rem' }}
                      onClick={() => { navigate('../') }}
                    >
                      เพิ่มแฟ้มเอกสาร
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Box>
          <Box className="content">
            <Box className="backgroud-formInput">
              <Typography sx={{ fontSize: "1.5em", fontWeight: "900" }}>ข้อมูลแฟ้มเอกสาร</Typography>
            </Box>
            <Row gutter={[24, 24]}>
              <Col className="form-input">
                {/* รหัสแปลงที่ดิน */}
                <TextField
                  disabled
                  id=""
                  className="text-field"
                  label="รหัสแปลงที่ดิน"
                  value={files.parcelCode || ''}
                />
              </Col>
            </Row>
            <Box>
              <Divider orientation="left" className="divider">
                <Typography style={{ fontWeight: "900" }}>อัพโหลดเอกสาร</Typography>
              </Divider>
              <Row gutter={[24, 24]}>
                <Col span={10} className="form-input">
                  <TextField
                    className="text-field"
                    label="เอกสาร"
                    select
                    value={files.type}
                    onChange={(event) => {
                      setFiles({ ...files, type: event.target.value })
                    }}
                  >
                    <MenuItem value={0}>กรุณากรอก</MenuItem>
                    <MenuItem value={1}>เอกสารสิทธิ์</MenuItem>
                    <MenuItem value={2}>ทด.1</MenuItem>
                    <MenuItem value={3}>แบบสำรวจที่ดินและสิ่งปลูกสร้าง</MenuItem>
                    <MenuItem value={4}>แบบสำรวจป้าย</MenuItem>
                    <MenuItem value={5}>อื่นๆ</MenuItem>
                  </TextField>
                </Col>
                <Col span={10} >

                  {/* <TextField
                    className="text-field"
                    type="file"
                    // value={files.file}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setFiles({ ...files, file: event.target.value })
                    }}
                  /> */}
                  {/* <Box sx={{  height: 400, mt: 1 }}>
                    
                  </Box> */}
                 
                    {/* <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="auto"
                          title="Contemplative Reptile"
                          image={files.image.imageUrl}
                        />
                      </CardActionArea>
                    </Card> */}

                  {/* <Modal > */}
                    <Image
                      width={200}
                      // height={200}
                      src={files.image.imageUrl}
                    />
                  {/* </Modal> */}
                </Col>

              </Row>
              <Divider />
              <TextField
                id=""
                className="text-field"
                label="หมายเหตุ"
                value={files.note || ''}
                onChange={(event) => {
                  setFiles({ ...files, note: event.target.value })
                }}
              />
            </Box>
          </Box>
          <Row style={{ justifyContent: "flex-end", marginRight: "24px" }}>
            {contextHolder}
            <Button
              style={{
                height: "3rem",
                backgroundColor: "#e57c23",
                marginTop: "24px",
                marginRight: "10px"
              }}
              variant="contained"
              // type="submit"
              onClick={() => { navigate('../search') }}

            >
              ยกเลิก
            </Button>
            <Button
              style={{
                height: "3rem",
                backgroundColor: "#3cb371",
                marginTop: "24px",
              }}
              variant="contained"
              type="submit"
            // onClick={(params) => {
            //   navigate('/search', { state: { parcelCode: parcelCode } })
            //   console.log("PP", parcelCode)
            // }}

            >
              บันทึกข้อมูล
            </Button>
          </Row>
          {/* </div> */}

        </Box>
      </div>

    </ThemeProvider>
  )
}
