import { currentSession } from '@helper/sessionServer'
import type { NextApiRequest, NextApiResponse } from 'next/types'
import { prisma } from '@helper/db'
import { promises as fs } from 'fs'
import { Review } from 'types/review'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await currentSession(req, res, null)

  if (session !== undefined && session !== null) {
    const jsonDirectory = process.cwd()
    const fileContents = await fs.readFile(jsonDirectory + '/reviews.json', 'utf8')

    const fileJson: Review[] = JSON.parse(fileContents)
    for (let i = 0; i < fileJson.length; i++) {
      const rev: Review = fileJson[i]

      await prisma.review.upsert({
        where: { review_title: rev.review_title },
        update: {},
        create: {
          review_title: rev.review_title?.toString(),
          review_desc: rev.review_desc?.toString(),
          visit_date: rev.visit_date?.toString(),
          review_rating: rev.review_rating?.toString()
        }
      })
    }

    res.status(200).send({ status: true, error: null, msg: '' })
    res.end()
  } else {
    res.status(200).send({ status: false, error: 'Unauthenticated request', msg: '' })
    res.end()
  }
}

export default handler
