import React from 'react'
import axiosEPropertyFolder from '../../api/axios'

export default function useInsertSubmit() {
 const fetchFilesInsert = async (event, files, parcelCode) => {
  event.preventDefault()
  axiosEPropertyFolder({
   method: 'post',
   url: '/filesinsert',
   data: {
    files: files,
    parcelCode: parcelCode
   }
  }).then((response) => {
   console.log(response)
  }).catch((err) => {
   console.log('Error = ' + err)
  })
 }
 return { fetchFilesInsert }
}