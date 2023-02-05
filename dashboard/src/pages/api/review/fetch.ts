import { currentSession } from '@helper/sessionServer'
import type { NextApiRequest, NextApiResponse } from 'next/types'
import { Review } from 'types/review'
import { loadData } from '@helper/review'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await currentSession(req, res, null)

  if (session !== undefined && session !== null) {
    const data: Review[] = await loadData()

    res.status(200).send({ status: true, error: null, msg: data })
    res.end()
  } else {
    res.status(200).send({ status: false, error: 'Unauthenticated request', msg: '' })
    res.end()
  }
}

export default handler
