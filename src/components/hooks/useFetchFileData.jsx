import { useState, useEffect } from 'react'
import axiosEPropertyFolder from '../../api/axios'
import { useLocation } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

export default function useFetchFileData() {
  async function fetchImage(imagesData, type,landImagesUrl, setLandImagesUrl, buildingImagesURL, setBuildingImagesURL) {
        setLandImagesUrl([])
        setBuildingImagesURL([])
    await axiosEPropertyFolder({
      method: 'post',
      url: `/downloadimage`,
      data: {
        path: imagesData.path
      },
      responseType: 'blob'
    }).then(async response => {
      // console.log(imagesURL)
      if (type === 'land') {
        const imagesURL = {
          url: URL.createObjectURL(response.data),
          parcelCode: imagesData.parcelCode,
          uploadDate: imagesData.uploadDate,
          dn: imagesData.dn
        }
        setLandImagesUrl(prev => [...prev, imagesURL])
      }
      if (type === 'building') {
        const imagesURL = {
          url: URL.createObjectURL(response.data),
          parcelCode: imagesData.parcelCode,
          uploadDate: imagesData.uploadDate,
          address: imagesData.address
        }
        // console.log(imagesURL)
        setBuildingImagesURL(prev => [...prev, imagesURL])
      }
    }).catch(error => {
      console.error(error);
    })
  }
  const fetchFileData = async (files, setFiles, fileId) => {
    if (true) {
      var response = await axiosEPropertyFolder({
        method: 'post',
        url: `/editdata`,
        data: {
          id: fileId,
        }
      })
      response = response.data
      // console.log("res", response)
      if (response.status === 'OK') {
        response = response.data

        console.log("res", response)
        setFiles({
          ...files,
          parcelCode: response.parcel_code,
          type: response.type,
          note: response.note
        })

      } else {

      }
    }
  }
  // const fetchfileEdit =async() => { 
  //     if (true) {
  //       var response = await axiosEPropertyFolder({
  //         method: 'post',
  //         url: `/edit`,
  //         data: {
  //           // id: fileId,
  //         }
  //       })
  //   }
  // }


  return { fetchFileData }
}
