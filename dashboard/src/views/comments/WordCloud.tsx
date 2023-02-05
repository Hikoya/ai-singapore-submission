// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { TagCloud } from 'react-tagcloud'

const WordCloud = ({ title, data }: { title: string; data: any }) => {
  return (
    <Card>
      <CardHeader
        title={title}
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
          <Grid item xs={12} sm={12} key={title}>
            <Box key={title} sx={{ display: 'flex', alignItems: 'center' }}>
              <TagCloud minSize={20} maxSize={45} tags={data} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WordCloud
