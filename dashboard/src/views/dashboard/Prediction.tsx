// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import PredictionResult from 'src/views/dashboard/PredictionResult'
import LoadingModal from 'src/components/LoadingModal'

import { useForm } from 'react-hook-form'
import { checkerString } from '@helper/common'
import { useState } from 'react'

const Prediction = () => {
  const [progress, setProgress] = useState(false)

  const [aspects, setAspects] = useState<any[]>([])
  const [labels, setLabels] = useState<any[]>([])

  const [overall, setOverall] = useState('')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      review_title: '',
      review_desc: ''
    }
  })

  const constructData = async (aspects: any[], labels: any[]) => {
    setAspects(aspects)

    const sentiments = []
    let score = 0
    let overallSentiment = ''

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i]

      switch (label) {
        case 0:
          sentiments.push('Neutral')
          break
        case 1:
          sentiments.push('Positive')
          break
        case -1:
          sentiments.push('Negative')
          break
        default:
          break
      }

      score += parseInt(label)
    }

    score = score / labels.length
    if (score >= -1 && score < -0.5) {
      overallSentiment = 'Negative'
    } else if (score >= -0.5 && score < -0.2) {
      overallSentiment = 'Slightly Negative'
    } else if (score >= -0.2 && score <= 0.2) {
      overallSentiment = 'Neutral'
    } else if (score > 0.2 && score < 0.5) {
      overallSentiment = 'Slightly Positive'
    } else if (score >= 0.5 && score <= 1) {
      overallSentiment = 'Positive'
    } else {
      overallSentiment = ''
    }

    setLabels(sentiments)
    setOverall(overallSentiment)
  }

  const onSubmit = async (data: any) => {
    if (
      checkerString(data.review_title) &&
      checkerString(data.review_desc) &&
      process.env.NEXT_PUBLIC_PREDICT_URL !== undefined
    ) {
      setProgress(true)
      setAspects([])
      setLabels([])

      try {
        const rawResponse = await fetch(process.env.NEXT_PUBLIC_PREDICT_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            review_title: data.review_title,
            review_desc: data.review_desc
          })
        })
        const content = await rawResponse.json()
        await constructData(content[1].aspect_name, content[0].labels)
      } catch (error) {
        console.error(error)
      }

      setProgress(false)
    }
  }

  return (
    <Card>
      <LoadingModal isOpen={progress} onClose={undefined} />
      <CardHeader
        title='Predict Aspects'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container>
          <Grid item xs={12} sm={12} key={'prediction-grid'}>
            <Box key={'prediction-box'} sx={{ display: 'flex', alignItems: 'center' }}>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    fullWidth
                    autoFocus
                    id='review_title'
                    label='Review Title'
                    sx={{ marginBottom: 4 }}
                    {...register('review_title')}
                  />
                  <TextField
                    fullWidth
                    autoFocus
                    id='review_desc'
                    label='Review Description'
                    sx={{ marginBottom: 4 }}
                    {...register('review_desc')}
                  />
                  <Box
                    sx={{
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  />
                  <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginBottom: 7 }}>
                    Predict
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>

          {aspects.length > 0 && labels.length > 0 && (
            <Grid item xs={12} sm={12} key={'prediction-result'}>
              <PredictionResult aspects={aspects} labels={labels} overall={overall} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Prediction
