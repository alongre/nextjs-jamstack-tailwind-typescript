import { NextApiRequest, NextApiResponse } from 'next';
import { table, getMinifyRecords } from './utils/airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = getMinifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
