import { NextApiRequest, NextApiResponse } from 'next';
import { table, getMinifyRecords } from './utils/airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    const record = await table.destroy([id]);

    res.statusCode = 200;
    res.json(getMinifyRecords(record));
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
