// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const OverallSentiment = () => {
  // ** Hook
  const theme = useTheme()

  const series = [(3.71 / 5) * 100]

  const options: ApexOptions = {
    chart: {
      width: 40,
      height: 40
    },
    labels: ['Positive'],
    colors: [theme.palette.primary.main]
  }

  return (
    <Card>
      <CardHeader
        title='Overall Sentiment'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='radialBar' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default OverallSentiment
