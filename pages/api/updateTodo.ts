import { NextApiRequest, NextApiResponse } from 'next';
import { table, getMinifyRecords } from './utils/airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, fields } = req.body;
    const updateRecords = await table.update([
      {
        id,
        fields,
      },
    ]);

    console.log({ updateRecords });

    res.statusCode = 200;
    res.json(getMinifyRecords(updateRecords));
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
};
