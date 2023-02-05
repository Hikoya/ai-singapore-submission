// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const KeyPhrase = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      height: 50
    },
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    }
  }

  const series = [
    {
      data: [
        {
          x: 'delicious',
          y: 218
        },
        {
          x: 'burger',
          y: 149
        },
        {
          x: 'value',
          y: 184
        },
        {
          x: 'excellent',
          y: 55
        },
        {
          x: 'good food',
          y: 84
        },
        {
          x: 'friendly',
          y: 31
        },
        {
          x: 'fast food',
          y: 70
        }
      ]
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Key Phrase Extraction'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='treemap' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default KeyPhrase
