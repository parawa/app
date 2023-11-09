import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function useAlert() {
 const navigate = useNavigate()
function handleErrorAlert(text, setErrorText, setErrorAlertOpen) {
  console.log('handleError')
  setErrorText(text)
  setErrorAlertOpen(true)
}
const handleSuccessAlertClose = (event, reason, parcelCode, setBackDropLoading, handleBackDropLoadingToggle, setSuccessAlertOpen) => { 
  const handleNavicate = () => {
      navigate('../search', {
          state: {
              parcelCode : parcelCode
          }
      })
  }
  if (reason === 'clickaway') {
      handleNavicate()
      return;
  }
  handleNavicate()
  setSuccessAlertOpen(false);
  handleBackDropLoadingToggle(false, setBackDropLoading)
}
const handleErrorAlertClose = (event, reason, setBackDropLoading, handleBackDropLoadingToggle, setErrorAlertOpen) => {
  if (reason === 'clickaway') {
      setErrorAlertOpen(false);
      handleBackDropLoadingToggle(false, setBackDropLoading)
      return;
  }
  setErrorAlertOpen(false);
  handleBackDropLoadingToggle(false, setBackDropLoading)
}

const handleBackDropLoadingToggle = (value, setBackDropLoading) => {
  setBackDropLoading(value)
}

  return {handleSuccessAlertClose, handleErrorAlert, handleErrorAlertClose,handleBackDropLoadingToggle}
}
