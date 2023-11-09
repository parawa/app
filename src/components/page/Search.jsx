import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import LoadingOutlined from "../LoadingOutlined";
import Layouts from "../Layout";
import MenuItem from "@mui/material/MenuItem";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosEPropertyFolder from '../../api/axios'
import { Table, Row, Col } from "antd";
import "../../../src/index.css";
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
  const { fetchfileEdit } = useFetchFileData()
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [parcelCodeSearch, setParcelCodeSearch] = useState(
    searchParams.get('parcelCodeSearch'
    ))
  const [deleteId, setDeleteId] = useState()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusChangedNote, setStatusChangedNote] = useState('')
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
        // render: (_, record) => <a>{record.parcel_code}</a>,
      },
      {
        title: "ประเภทเอกสาร",
        dataIndex: 'type',
        width: 400,
        render: (params) => {
          console.log(params)
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
            },
          ]
          return (
            <p style={{ fontFamily: 'IBM Plex Sans Thai' }} > {typeName.map((data) => (data.idType === params ? data.type_name : ' '))}</p>
          )
        }
      },
      {
        title: "หมายเหตุ",
        dataIndex: 'note',
        width: 400,
         render: (_, record) => <p style={{ fontFamily: 'IBM Plex Sans Thai' }}>{record.note}</p>,
      },
      // {
      //   title: "หมายเหตุ",
      //   dataIndex: 'path',
      //   width: 400,
      //    render: (_, record) => <a style={{ fontFamily: 'IBM Plex Sans Thai' }}>{record.path}</a>,
      // },
      {
        width: 400,
        render: (params) => {
          const fileId = params.id
          return (
            <Button style={{ color: "#6a5acd", }}
              onClick={() => {
                console.log(fileId)
                navigate('/edit', { state: { fileId: fileId } })
              }}
            >
              <EditOutlined /> แก้ไขข้อมูล
            </Button>)
        }
      },
      {
        width: 400,
        render: (params) => {
          const pacelCodeID = params.id
          return (
            <Button
              // variant="contained"
              // color="error"

              style={{ color: "#cf1322", }}
              onClick={() => {
                setDeleteId(pacelCodeID)
                console.log(pacelCodeID)
                handleDeleteDialogClickOpen()
              }}
            >
              <DeleteOutlined />
              ลบข้อมูล
            </Button>
          

          )
        }
      }
    ])
  }, [])
  useEffect(() => { console.log(data) }, [data])


  const refreshButton = document.getElementById("refreshButton");

  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <div>
          <Layouts />
        </div>
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
                  setParcelCodeSearch(event.target.value)
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
          <Row style={{ justifyContent: "center" }}>
            {loading ? <LoadingOutlined /> : ""}
            <Table
              rowClassName={(record, index) => index % 2  === 0 ? 'table-row-light' : 'table-row-dark'} columns={columns}
              // rowSelection={{}}
              // expandable={{
              //   expandedRowRender: (child) => (
              //     <a style={{ margin: 0, }} >
              //       หมายเหตุ : {child.note}
              //     </a>
              //   ),
              //   rowExpandable: (child) => child.note !== '' && null,
              // }}
              dataSource={data}

            />
          </Row>
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
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Search;
