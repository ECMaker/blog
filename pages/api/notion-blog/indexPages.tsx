import type { NextApiRequest, NextApiResponse } from 'next'

import {
  fetchPages,
} from '~/utils/expiredImage'

const ApiIndexPages = async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.statusCode = 400
    res.end()

    return
  }

  try {
    const { results } = await fetchPages({})
    if (!results) {
      throw new Error("pages not found.")
    }
    const slicedResults = results.slice(0, 5);
    res.write(JSON.stringify(slicedResults))
    res.statusCode = 200
    res.end()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiIndexPages