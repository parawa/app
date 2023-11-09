import React, { useEffect } from 'react'
import { Box, Snackbar, Alert } from '@mui/material'
import useAlert from '../hooks/useAlert'

export default function MessageAlert({errorText, successAlertOpen, errorAlertOpen, setErrorAlertOpen, fileId, setBackDropLoading, handleBackDropLoadingToggle, setSuccessAlertOpen,parcelCode}) {
    const { handleSuccessAlertClose, handleErrorAlertClose } = useAlert()
    return (
        <Box>
            <Snackbar
                open={successAlertOpen}
                autoHideDuration={2000}
                onClose={(event, reason) => {
                    handleSuccessAlertClose(event, reason, parcelCode, setBackDropLoading, handleBackDropLoadingToggle, setSuccessAlertOpen)
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert variant='filled' severity="success" sx={{ width: '100%' }}>
                    บันทึกข้อมูลสำเร็จ!
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorAlertOpen}
                onClose={(event, reason) => {
                    handleErrorAlertClose(event, reason, setBackDropLoading, handleBackDropLoadingToggle, setErrorAlertOpen)
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                    {errorText}
                </Alert>
            </Snackbar>
        </Box>
    )
}