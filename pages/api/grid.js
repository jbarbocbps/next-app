import mockData from 'constants/mock-grid-data.json';

export default function handler(req, res) {
  try {
    res.status(200).json(mockData);
  } catch (ex) {
    res.status(500).json({ error: 'Error 500' });
  }
}
