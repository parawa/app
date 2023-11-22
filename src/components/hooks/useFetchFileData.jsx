import axiosEPropertyFolder from '../../api/axios'

export default function useFetchFileData() {
  async function fetchImage(editData, files, setFiles) {
    await axiosEPropertyFolder({
      method: 'post',
      url: `/downloadimage`,
      data: {
        path: editData.path
      },
      responseType: 'blob'
    }).then(async response => {
      const image = {
        image: null,
        imageUrl: URL.createObjectURL(response.data)
      }
      // console.log(editData)
      setFiles({
        ...files,
        parcelCode: editData.parcel_code,
        type: editData.type,
        note: editData.note,
        image: image
      })

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
        const editData = response.data

        console.log("res", editData)
        fetchImage(editData, files, setFiles)

      } else {

      }
    }
  }

  const fetchViewData = async (parcelCode, setViewData) => {
    await axiosEPropertyFolder({
      method: 'post',
      url: '/viewdata',
      data: {
        parcelCode: parcelCode
      }
    }).then((response) => {
      response = response.data.data
      // console.log(response)
      if (response?.length > 0) {
        response.forEach((data, index) => {
          fetchViewDataImage(data)
        });
      }
      // setViewData({
      //   parcelCode: response.parcel_code,
      //   type: response.type,
      //   note: response.note
      // })
    }).catch((err) => {
      console.log(err)
    })
    async function fetchViewDataImage(data) {
      console.log(data)
      setViewData([])
      await axiosEPropertyFolder({
        method: 'post',
        url: `/downloadimage`,
        data: {
          path: data.path
        },
        responseType: 'blob'
      }).then(async response => {
        const image = {
          image: null,
          imageUrl: URL.createObjectURL(response.data)
        }
        setViewData(prev => [...prev, {
          parcelCode: data.parcel_code,
          type: data.type,
          image: image,
          note: data.note,
          id:data.id
        }])
      }).catch(error => {
        console.error(error);
      })
    }
  }

  return { fetchFileData, fetchImage, fetchViewData }
}
