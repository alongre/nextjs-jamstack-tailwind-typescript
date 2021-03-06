import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from './todo';
import { table, getMinifyRecords } from './utils/airtable';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { description } = req.body;
		const createdRecords = await table.create([
			{
				fields: { description },
			},
		]);

		const record: Todo = {
			id: createdRecords[0].id,
			fields: createdRecords[0].fields,
		};
		res.statusCode = 200;
		res.json(record);
	} catch (err) {
		console.log(err);
		res.statusCode = 500;
		res.json({ msg: 'Something went wrong' });
	}
};
