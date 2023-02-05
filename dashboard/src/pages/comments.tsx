// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Auth from 'src/components/Auth'

// ** Demo Components Imports
import TableStickyHeader from 'src/views/comments/TableStickyHeader'
import WordCloud from 'src/views/comments/WordCloud'

const data = [
  { value: 'delicious', count: 38 },
  { value: 'good', count: 30 },
  { value: 'nice', count: 28 },
  { value: 'affordable', count: 25 }
]

const data2 = [
  { value: 'unhealthy', count: 38 },
  { value: 'lukewarm', count: 30 },
  { value: 'inconsistent', count: 28 },
  { value: 'missing', count: 25 }
]

const Comments = () => {
  return (
    <Auth>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={6}>
            <WordCloud title='Top Positive Keywords' data={data} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <WordCloud title='Top Negative Keywords' data={data2} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TableStickyHeader />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </Auth>
  )
}

export default Comments
