// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Auth from 'src/components/Auth'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// import KeyPhrase from 'src/views/dashboard/KeyPhrase'
// import OverallSentiment from 'src/views/dashboard/OverallSentiment'
// import SentimentBreakdown from 'src/views/dashboard/SentimentBreakdown'

// import SentimentGraph from 'src/views/dashboard/SentimentGraph'
import TableStickyHeader from 'src/views/comments/TableStickyHeader'
import Prediction from 'src/views/dashboard/Prediction'
import LoadingModal from 'src/components/LoadingModal'

import Stack from '@mui/material/Stack'

import WordCloud from 'src/views/comments/WordCloud'
import { useEffect, useState, useCallback } from 'react'

const MAX_THRESHOLD = 4

const Dashboard = () => {
  const [progress, setProgress] = useState(true)
  const [data, setData] = useState<any[]>([])

  const constructData = useCallback(async (keywords: any[]) => {
    const cloud: any[] = []
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i]

      const word = keyword[0]
      const freq = keyword[1]

      if (parseInt(freq) >= MAX_THRESHOLD) {
        cloud.push({
          value: word,
          count: parseInt(freq)
        })
      }
    }

    setData(cloud)
  }, [])

  const onSubmit = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_CLOUD_URL !== undefined) {
      setProgress(true)

      try {
        const rawResponse = await fetch(process.env.NEXT_PUBLIC_CLOUD_URL, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        const content = await rawResponse.json()
        await constructData(content)
      } catch (error) {
        console.error(error)
      }

      setProgress(false)
    }
  }, [constructData])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Auth>
      <ApexChartWrapper>
        <LoadingModal isOpen={progress} onClose={undefined} />
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack spacing={3}>
              <StatisticsCard />
              <WordCloud title='Top Keywords' data={data} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Prediction />
          </Grid>

          {/** 
           * 
            *       <Grid item xs={12} md={4} lg={4}>
            <OverallSentiment />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <SentimentBreakdown />
          </Grid>
           * 
          */}

          {/** 
           * <Grid item xs={12} md={12} lg={12}>
               <KeyPhrase />
              </Grid>
          */}

          <Grid item xs={12} md={12} lg={12}>
            <TableStickyHeader />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </Auth>
  )
}

export default Dashboard
