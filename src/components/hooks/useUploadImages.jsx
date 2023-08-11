
import axiosEPropertyFolder from '../../api/axios'

export default function useUploadImages() {
 const fetchImageUpload = async (parcelCode, files) => {
  const formData = new FormData()
  if (files?.length>0) {
   console.log(files)
   for (let index = 0; index < files.length; index++) {
    if (files[index].images) {
     const file = files[index].images.image;
     formData.append('files', file)
    } else {
     return []
    }
   }
   formData.append('parcelCode', parcelCode)
   try {
    var result = await axiosEPropertyFolder.post(`/upload`, formData)
   console.log(result.data)
   } catch (error) {
    // console.error(error)
    return []
   }
   return result.data
  } else {
   return []
  }
 }
 return { fetchImageUpload }
}
