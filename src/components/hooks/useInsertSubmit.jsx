import React from 'react'
import axiosEPropertyFolder from '../../api/axios'
import { useNavigate } from 'react-router-dom';

export default function useInsertSubmit() {
  const navigate = useNavigate()
  const fetchFilesInsert = async (event, filesDetail, parcelCode,setSuccessAlertOpen,handleErrorAlert, setErrorText,setErrorAlertOpen) => {
    event.preventDefault()
    const formData = new FormData()
    for (let index = 0; index < filesDetail.length; index++) {
      formData.append('files', filesDetail[index].image.image)
    }
    formData.append('parcelCode', parcelCode)
    formData.append('userId', 20)
    formData.append('filesDetail', JSON.stringify(filesDetail))

    axiosEPropertyFolder.post(`/insert`, formData)
      .then((response) => {
        console.log(response)
        console.log(response.data.status === 'OK')
        if (response.data.status === 'OK') {
          setSuccessAlertOpen(true)
        } else {
          handleErrorAlert(response.msg, setErrorText, setErrorAlertOpen)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  const isValid = (value, regexType) => {
    if (regexType === 1) {
      return /^[A-Za-z0-9/]+$/.test(value);
    }

  }

  return { fetchFilesInsert, isValid }
}