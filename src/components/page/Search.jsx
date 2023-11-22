import * as React from 'react';
import Layouts from "../Layout";
import "../../../src/index.css";
import { useEffect, useState } from "react";
import LoadingOutlined from "../LoadingOutlined";
import axiosEPropertyFolder from '../../api/axios'
import { FileSearchOutlined } from "@ant-design/icons";
import { Table, Row, Col, Image, Modal, Divider } from "antd";
import { useNavigate, useSearchParams, useLocation} from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  ThemeProvider,
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import useCustomTheme from "../hooks/useCustomTheme";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import useFetchFileData from "../hooks/useFetchFileData";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useCustomTheme();
  const location = useLocation()
  const { fetchViewData } = useFetchFileData()
  const navigate = useNavigate()
  const [viewData, setViewData] = useState([{
    parcelCode: '',
    type: 0,
    image: {
      image: null,
      imageUrl: null
    },
    note: null,
  }])

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [parcelCodeSearch, setParcelCodeSearch] = useState(
    searchParams.get('parcelCodeSearch'
    ))
  const [parcelCode, setParcelCode] = useState('')
  const [deleteId, setDeleteId] = useState()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusChangedNote, setStatusChangedNote] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);

  };
  const typeName = [
    {
      idType: 1,
      type_name: "เอกสารสิทธิ์"
    },
    {
      idType: 2,
      type_name: "ทด.1"
    },
    {
      idType: 3,
      type_name: "แบบสำรวจที่ดินและสิ่งปลูกสร้าง"
    },
    {
      idType: 4,
      type_name: "แบบสำรวจป้าย"
    },
    {
      idType: 5,
      type_name: "อื่นๆ"
    }]
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteDialogClickOpen = () => {
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
    setStatusChangedNote('')
    setDeleteId(null)
  };
  const handleSearchFormSubmit = async (parcelCode) => {
    setLoading(true);
    await axiosEPropertyFolder({
      method: 'post',
      url: '/search',
      data: {
        parcelCodeSearch: parcelCode
      }
    }).then((response) => {
      response = response.data
      if (response.status === 'OK') {
        setData(response.data);
      }
    })
    setLoading(false);
  }

  const fetchDeletedata = async () => {
    await axiosEPropertyFolder({
      method: 'post',
      url: '/delete',
      data: {
        fileId: deleteId,
        userId: 1,
        deleteNote: statusChangedNote
      }
    }).then((response) => {
      console.log(response)
      handleDeleteDialogClose()
    }).catch((err) => {
      console.log(err)
    })
  }




  useEffect(() => {
    if (location?.state?.parcelCode) {
      handleSearchFormSubmit(location.state.parcelCode)
    }
  }, [parcelCodeSearch])

  useEffect(() => {
    setColumns([
      Table.EXPAND_COLUMN,
      {
        title: "รหัสแปลงที่ดิน",
        dataIndex: 'parcel_code',
        width: 400,
        render: (_, record) => <p style={{fontWeight: 500}}>{record.parcel_code}</p>,
      },
      {
        width: 400,
        render: (params) => {
          const paramParcelCode = params.parcel_code
          return (
            <>
              <Button
                type="primary"
                onClick={() => {
                  console.log("parcelCode", paramParcelCode)
                  setParcelCode(paramParcelCode)
                  fetchViewData(paramParcelCode, setViewData)
                  showModal()
                }}>
                <FileSearchOutlined /> Open File
              </Button>
            </>
          )
        }
      }
    ])
  }, [])
  useEffect(() => { console.log(viewData) }, [viewData])
  return (
    <ThemeProvider theme={theme}>
      <Box className="otherSide" id="otherSide">
        <Box>
          <Layouts />
        </Box>
        <Box
          className="content"
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            setSearchParams({ parcelCodeSearch: parcelCodeSearch })
            handleSearchFormSubmit(parcelCodeSearch)
          }}
        >
          <Typography
            style={{
              color: '#025464',
              textAlign: "center",
              fontWeight: '900',
              fontSize: '25px',
              margin: '10px 5px'
            }}>
            ค้นหาข้อมูล</Typography>

          <Row
            gutter={[24, 24]}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Col>
            </Col>
            <Col>
              <TextField
                onChange={(event) => {
                  setParcelCodeSearch(event.target.value.toUpperCase())
                }}
                label="รหัสแปลงที่ดิน"
                value={parcelCodeSearch}
              />
            </Col>
            <Col>
              <Button
                style={{
                  height: "3rem",
                  backgroundColor: "#ffa500",
                }}
                variant="contained"
                type="submit"
              >
                <SearchIcon />
                ค้นหา
              </Button>
            </Col>
          </Row>
        </Box>
        <Box className="content">
          <Col>
          <Row>
            <Typography
              style={{
                color: '#025464',
                fontWeight: '900',
                fontSize: '25px',
                margin: '10px 5px'
              }}>
              รายการแฟ้มเอกสาร</Typography>
            <Button
              style={{
                height: "3rem",
                backgroundColor: "#3cb371",
                marginLeft: '10px'
              }}
              variant="contained"
              // type="submit"
              onClick={() => { navigate('../') }}
            >

              <AddIcon />
              เพิ่มแฟ้มเอกสาร
            </Button>
          </Row>
          </Col>
          <Col>
          <Box>
            <Typography  style={{color:'#f5222d'}}>
              **หากข้อมูลในเอกสารผิด ผู้ใช้งานต้องลบข้อมูลในเอกสารและเพิ่มข้อมูลใหม่
            </Typography>
            </Box>
          </Col>
          <Row style={{ justifyContent: "center" }}>
            {loading ? <LoadingOutlined /> : ""}
            <Table
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} columns={columns}
              dataSource={data}
            />
          </Row>
        </Box>
        <Modal
        // title='1111'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ }}
        >
          <Typography 
          style={{ 
            fontWeight: '900', 
            fontSize: '1.5rem',
            color:'#117c91',
            margin: '10px 0px 10px 0px'
            }} >
             รหัสแปลงที่ดิน  {parcelCode}
          </Typography>
          <Box>
            {viewData.map((view, index) => (
              <Box style={{ mg: '40px 10px 10px 10px' }}>
                <Row
                  style={{
                    display: 'flex',
                    flexflow: 'row wrap',
                    minWidth: '0',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    // mg: '40px 10px 10px 10px'
                  }}>
                  <Col>
                    <Row>
                      <Typography style={{ fontWeight: '900' }} >
                        ประเภทเอกสาร :
                      </Typography>
                      <Typography>
                        {typeName.map((data) => (data.idType === view.type ? data.type_name : ' '))}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography style={{ fontWeight: '900' }} >
                        หมายเหตุ :
                      </Typography>
                      <Typography>
                        {view.note}
                      </Typography>
                    </Row>
                  </Col>
                  <Col>
                    {/* <Button
                      color="warning"
                      onClick={() => navigate('/edit', { state: { fileId: view.id } })}
                    >แก้ไข
                    </Button> */}
                    <Button
                      color='error'
                      onClick={() => {
                        setDeleteId(view.id)
                        console.log(view.id)
                        handleDeleteDialogClickOpen()
                      }}
                    >ลบข้อมูล</Button>
                  </Col>
                </Row>
                <Image
                  src={view.image.imageUrl}
                />
                <Divider orientation="left" className="divider" />
              </Box>
            ))}

          </Box>
        </Modal>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          component="form"

        >
          <DialogTitle>ท่านต้องการลบแบบสำรวจ?</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ width: '60ch' }}>
              โปรดระบุสาเหตุการลบแบบสำรวจ
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="note"
              label="สาเหตุ"
              multiline
              rows={3}
              fullWidth
              variant="standard"
              value={statusChangedNote}
              onChange={(event) => {
                setStatusChangedNote(event.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={(event) => {
                fetchDeletedata(event)
              }}
              color='error'
              type="submit"
              id="refreshButton"
            >
              ลบ
            </Button>
            <Button
              variant="contained"
              color='warning'
              onClick={handleDeleteDialogClose}>
              ยกเลิก
            </Button>
          </DialogActions>
        </Dialog>
      </Box >
    </ThemeProvider >
  );
}

export default Search;
