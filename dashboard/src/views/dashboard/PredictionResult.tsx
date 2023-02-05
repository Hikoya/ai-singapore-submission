// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const PredictionResult = ({ aspects, labels, overall }: { aspects: any; labels: any; overall: string }) => {
  return (
    <Card>
      <CardHeader
        title='Prediction Results'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[10, 10, 10, 10]}>
          <Grid item xs={12} sm={'auto'} key={'prediction-result-grid'}>
            <Box key={'prediction-result-box'} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6'>Aspects: {aspects.join(', ')}</Typography>
                <Typography variant='h6'>Sentiments: {labels.join(', ')}</Typography>
                {overall.length > 0 && <Typography variant='h6'>Overall Sentiment: {overall}</Typography>}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PredictionResult
