// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// import { useRouter } from 'next/router'
import Image from 'next/image'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import { useForm } from 'react-hook-form'
import { checkerString } from '@helper/common'
import { signIn } from 'next-auth/react'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = (props: Promise<{ data: string }>) => {
  const [url, setURL] = useState('http://localhost:3000') // default

  useEffect(() => {
    async function fetchData(propsField: Promise<{ data: string }>) {
      const propRes = await propsField
      if (checkerString(propRes.data)) {
        setURL(propRes.data)
      }
    }
    fetchData(props)
  }, [url, props])

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: any) => {
    if (checkerString(data.email) && checkerString(data.password)) {
      try {
        await signIn('credentials', {
          username: data.email,
          password: data.password,
          callbackUrl: `${url}/`
        })

        return true
      } catch (error) {
        return false
      }
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image alt='favicon' width={100} height={100} src='/images/favicon.png' />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} {...register('email')} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput label='Password' type='password' id='auth-login-password' {...register('password')} />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            />
            <Button type='submit' fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }}>
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  Create an account
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

export async function getServerSideProps() {
  return {
    props: (async function Props() {
      try {
        return {
          data: process.env.NEXTAUTH_URL
        }
      } catch (error) {
        return {
          data: null
        }
      }
    })()
  }
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
