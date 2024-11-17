import type { NextApiRequest, NextApiResponse } from 'next'

import {
  fetchArrayPages,
} from '~/utils/expiredImage'

const ApiArrayPages = async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.statusCode = 400
    res.end()

    return
  }
  try {
    const results = await fetchArrayPages()
    if (!results || results.length === 0) {
      throw new Error("pages not found.")
    }
    res.write(JSON.stringify(results))
    res.statusCode = 200
    res.end()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiArrayPages