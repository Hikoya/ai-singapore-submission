// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const SentimentGraph = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      height: 200,
      stacked: true
    },
    dataLabels: {
      enabled: false
    },

    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],

    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    stroke: {
      width: [4, 4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: '20%'
      }
    },
    xaxis: {
      categories: ['Aug 2022', 'Sep 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023']
    },
    yaxis: [
      {
        seriesName: 'Positive',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true
        },
        title: {
          text: 'Number of Reviews'
        }
      },
      {
        seriesName: 'Negative',
        show: false
      },
      {
        seriesName: 'Neutral',
        show: false
      },
      {
        opposite: true,
        seriesName: 'Average Sentiment Score',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true
        },
        title: {
          text: 'Average Sentiment Score'
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  const series = [
    {
      name: 'Positive',
      type: 'column',
      data: [21, 23, 33, 34, 44, 44, 56, 58]
    },
    {
      name: 'Negative',
      type: 'column',
      data: [10, 19, 27, 26, 34, 35, 40, 38]
    },
    {
      name: 'Neutral',
      type: 'column',
      data: [10, 19, 27, 26, 34, 35, 40, 38]
    },
    {
      name: 'Average Sentiment Score',
      type: 'line',
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Sentiment Analysis'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='line' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default SentimentGraph
