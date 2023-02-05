// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

import { useForm } from 'react-hook-form'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const hiddenMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchQuery: ''
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Box sx={{ mt: 6, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}

        {/** 
         * 
         *   <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
            {...register('searchQuery')}
            size='small'
            sx={{ width: hiddenMd ? '35ch' : '85ch', '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            label='URL of Reviews'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          <FormHelperText id='component-helper-text'>Press enter to search</FormHelperText>
        </form>
         * 
        */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
