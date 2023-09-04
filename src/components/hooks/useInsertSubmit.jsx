import React from 'react'
import axiosEPropertyFolder from '../../api/axios'

export default function useInsertSubmit() {
 const fetchFilesInsert = async (event, files, parcelCode) => {
  event.preventDefault()
  axiosEPropertyFolder({
   method: 'post',
   url: '/insert',
   data: {
    filesDetail: files,
    parcelCode: parcelCode,
    imageId: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    userId: 20
   }
  }).then((response) => {
   console.log(response)
  }).catch((err) => {
   console.log('Error = ' + err)
  })
 }
 return { fetchFilesInsert }
}