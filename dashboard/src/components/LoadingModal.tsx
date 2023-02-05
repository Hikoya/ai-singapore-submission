import React from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * Renders a modal with a loading spinner and message
 *
 * This modal is used to block out all buttons and display a message to the user
 *
 * @param param0 Modal functions
 * @returns A loading modal
 */
export default function LoadingModal({ isOpen, onClose }: { isOpen: any; onClose: any }) {
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Stack justifyContent='center' alignItems='center'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Submitting request...
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Please wait a few moments
          </Typography>
          <CircularProgress />
        </Stack>
      </Box>
    </Modal>
  )
}
