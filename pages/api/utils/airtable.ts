import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '../todo';
// import {  Table, Record} from 'airtable'
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyRecord = (record): Todo => {
	if (!record.fields.completed) {
		record.fields.completed = false;
	}
	return {
		id: record.id,
		fields: record.fields,
	};
};

const getMinifyRecords = (records: any[]): Todo[] => {
	return records.map(minifyRecord);
};

export { table, getMinifyRecords, minifyRecord };
