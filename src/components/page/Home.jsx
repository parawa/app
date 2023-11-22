import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Box, ThemeProvider, Button } from "@mui/material";
import { Row, Col, message } from "antd";
import Layouts from "../Layout";
import Forminput from "../Forminput";
// import Alert from "../Alert/MessageAlert";
import "../../../src/index.css";
import { Layout, Divider } from "antd";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import useCustomTheme from "../hooks/useCustomTheme";
import useInsertSubmit from "../hooks/useInsertSubmit";
import { SearchOutlined } from "@ant-design/icons"
import useAlert from "../hooks/useAlert";
import MessageAlert from "../Alert/MessageAlert";
function Home() {
  const navigate = useNavigate()
  const { theme } = useCustomTheme()
  const { isValid } = useInsertSubmit()
  const { handleErrorAlert } = useAlert()
  const [parcelCode, setParcelCode] = useState('')
  const [errorText, setErrorText] = useState('')
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  const [errorAlertOpen, setErrorAlertOpen] = useState(false)
  const [backDropLoading, setBackDropLoading] = useState(false)
  const [errorParcelCode, setErrorParcelCode] = useState('')
  const { handleBackDropLoadingToggle } = useAlert()
  const [fileId, setFileId] = useState()
  const [filesDetail, setFilesDetail] = useState([
    {
      parcelCode: '',
      type: 0,
      image: {
        image: null,
        imageUrl: null,
      },
      note: '',
    }
  ]);
  const [errorfilesDetail, setErrorFilesDetail] = useState([
    {
      parcelCode: '',
      type: 0,
      image: {
        image: null,
        imageUrl: null,
      },
      note: '',
    }
  ]);
  const { fetchFilesInsert } = useInsertSubmit()
  const [messageApi, contextHolder] = message.useMessage();
  const refreshButton = document.getElementById("refreshButton");


  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <Layouts />
        <Box className="Box-title" >
          <Row >
            <Col className="text-font backgroud " span={10}>
              <Typography xs={2} style={{ fontWeight: '900', fontSize: '1.5rem', marginTop: '7px' }} >เพิ่มแฟ้มเอกสาร</Typography>
            </Col>
            <Col className="text-font" span={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
              <Button
                style={{ fontWeight: '900', color: '#ffffff', fontSize: '1.2rem' }}
                onClick={() => { navigate('../search') }}
              >
                <SearchOutlined />
                ค้นหาข้อมูล
              </Button>
            </Col>
          </Row>
        </Box>
        <Box
          component='form'
          onSubmit={(event) => {
            console.log(filesDetail)
            fetchFilesInsert(event, filesDetail, parcelCode, setSuccessAlertOpen, handleErrorAlert, setErrorText, setErrorAlertOpen, setBackDropLoading)
          }}
        >
          <Box className="content">
            <Box className="backgroud-formInput">
              <Typography sx={{ fontSize: "1.5em", fontWeight: "900" }}>ข้อมูลแฟ้มเอกสาร</Typography>
            </Box>
            <Row gutter={[24, 24]}>
              <Col className="form-input">
                <TextField

                  id=""
                  className="text-field"
                  label="รหัสแปลงที่ดิน"
                  value={parcelCode}
                  onChange={(event) => {
                    setParcelCode(event.target.value)
                  }}
                />
              </Col>
            </Row>
            {filesDetail?.map((data, index) => (
              <Box key={index}>
                <Divider orientation="left" className="divider">
                  <Typography style={{ fontWeight: "900" }}>อัพโหลดเอกสาร</Typography>
                </Divider>
                <Row gutter={[24, 24]}>
                  <Col >
                    <TextField
                      sx={{ width: '8ch' }}
                      id=""
                      label="ลำดับที่"
                      value={index + 1}
                      disabled
                    />
                  </Col>
                  <Col span={10} className="form-input">
                    <TextField
                      className="text-field"
                      label="เอกสาร"
                      select
                      value={data.type}
                      onChange={(e) => {
                        var arr = [...filesDetail]
                        arr[index].type = e.target.value
                        setFilesDetail(arr)
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
                  <Col span={10}>
                    <TextField
                      className="text-field"
                      type="file"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        console.log(e.target.files)
                        var arr = [...filesDetail]
                        arr[index].image = {
                          image: e.target.files[0],
                          imageUrl: URL.createObjectURL(e.target.files[0])
                        }
                        setFilesDetail(arr)
                      }}
                    />
                  </Col>

                </Row>
                <Divider />
                <TextField
                  id=""
                  className="text-field"
                  label="หมายเหตุ"
                  value={data.note}
                  onChange={(e) => {
                    var arr = [...filesDetail]
                    arr[index].note = e.target.value
                    setFilesDetail(arr)
                  }}
                />
                {index > 0 ?
                  <Button
                    style={{
                      height: "3rem",
                      backgroundColor: "#FF0000",
                      marginTop: "24px",
                      color: "#ffff",
                      padding: "20px"
                    }}
                    variant="contained"
                    onClick={() => {
                      var arr = [...filesDetail]
                      arr.splice(index, 1)
                      setFilesDetail(arr)
                    }}
                  >ลบ</Button>
                  : ''
                }
              </Box>
            ))}
            <Row gutter={[24, 24]} style={{ justifyContent: "flex-start" }}>
              <Col>

                <Button
                  style={{
                    height: "3rem",
                    backgroundColor: "#ffa500",
                    marginTop: "24px",
                    color: "#ffff"
                  }}
                  variant="contained"
                  onClick={() => {
                    setFilesDetail([...filesDetail, {
                      type: 0,
                      image: {
                        image: '',
                        imageUrl: '',
                      },
                      note: '',
                    }])
                  }}
                >
                  <AddIcon />
                  เพิ่ม
                </Button>
              </Col>
              <Col>

              </Col>
              <Col>

              </Col>
            </Row>
          </Box>
          {/* <Forminput
            filesDetail={filesDetail}
            setFilesDetail={setFilesDetail}
            parcelCode={parcelCode}
            setParcelCode={setParcelCode}
            errorParcelCode={errorParcelCode}
            setErrorParcelCode={setErrorParcelCode}
            errorfilesDetail={errorfilesDetail}
            setErrorFilesDetail={setErrorFilesDetail}
          /> */}
          <MessageAlert
            errorText={errorText}
            successAlertOpen={successAlertOpen}
            setSuccessAlertOpen={setSuccessAlertOpen}
            errorAlertOpen={errorAlertOpen}
            setErrorAlertOpen={setErrorAlertOpen}
            parcelCode={parcelCode}
            handleBackDropLoadingToggle={handleBackDropLoadingToggle}
            setBackDropLoading={setBackDropLoading}
          />

          <Row style={{ justifyContent: "flex-end", marginRight: "24px" }}>
            {contextHolder}
            <Button
              style={{
                height: "3rem",
                backgroundColor: "#3cb371",
                marginTop: "24px",
              }}
              variant="contained"
              type="submit"
            >
              บันทึกข้อมูล
            </Button>
          </Row>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Home;
