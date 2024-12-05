const { Client } = require('pg'); // Install 'pg' dependency

module.exports = async (req, res) => {
  const client = new Client({
    connectionString: 'postgresql://username:password@host:port/dbname',
  });
  await client.connect();

  if (req.method === 'GET') {
    const result = await client.query('SELECT * FROM cases');
    await client.end();
    return res.status(200).json(result.rows);
  }

  res.status(405).send('Method Not Allowed');
};
