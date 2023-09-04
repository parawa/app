import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingOutlined from "../loadingOutlined";
import Layouts from "../Layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosEPropertyFolder from '../../api/axios'
import { Space, Table, Popconfirm } from "antd";
// import "./insert.css";
import "../../../src/index.css";
import { Row, Col } from "antd";
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
import Item from "antd/es/list/Item";

function Search() {
  const { theme } = useCustomTheme();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [parcelCodeSearch, setParcelCodeSearch] = useState()
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
  const handleSearchFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    await axiosEPropertyFolder({
      method: 'post',
      url: '/search',
      data: {
        parcelCodeSearch: parcelCodeSearch
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
        render: (type) => <a>{type}</a>,
      },

      {
        // field: 'Parcel Code',
        // title: "รหัสแปลงที่ดิน",
        width: 400,
        render: (params) => {
          const pacelCodeID = params.id
          return (

            <Button style={{ color: "#6a5acd", }}
              onClick={(params) => {
                console.log(pacelCodeID)

                navigate('/edit', { state: { id: pacelCodeID } })
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
  useEffect(() => {
    console.log(data)
  }, [data])

  const refreshButton = document.getElementById("refreshButton");
    
  // refreshButton.addEventListener("click", function() {
  //     location.reload();
  // });

  return (
    <ThemeProvider theme={theme}>
      <div className="otherSide" id="otherSide">
        <div>
          <Layouts />
        </div>
        {/* <Box className="Box-title">
          <Typography className="text-font">ค้นหาข้อมูล</Typography>
        </Box> */}
        <Box
          className="content"
          component="form"
          onSubmit={handleSearchFormSubmit}
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
              <TextField
                onChange={(event) => setParcelCodeSearch(event.target.value)}
                label="รหัสแปลงที่ดิน" />
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
            <Col>

            </Col>
          </Row>
        </Box>
        <Box className="content">
          <Row>
            <Typography
              style={{
                color: '#025464',
                // textAlign: "center",
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
              columns={columns}
              // rowSelection={{}}
              expandable={{
                expandedRowRender: (child) => (
                  <a style={{ margin: 0, }} >
                    หมายเหตุ : {child.note}
                  </a>
                ),
                rowExpandable: (child) => child.note !== null,
              }}
              dataSource={data}

            />
          </Row>
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
            component="form"
            id="refreshButton"
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
              // startIcon={<RemoveCircleIcon />}

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
