import { prisma } from '@helper/db'
import { Review } from 'types/review'

export const loadData = async () => {
  const data: Review[] = await prisma.review.findMany()

  return data
}
