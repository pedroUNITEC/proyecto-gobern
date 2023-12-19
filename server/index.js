const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/fetch-data', async (req, res) => {
    try {
        const response = await axios.get('https://npr3s.com/control/projects/gti-1319/issues.xml', {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-Redmine-API-Key': '3141e26b74ff2bcdcd1df91632cdbefb126be450'
            },
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Axios error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submit-issue', async (req, res) => {
    try {
        const response = await axios.post('https://npr3s.com/control/projects/gti-1319/issues.xml',
            req.body,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-Redmine-API-Key': '3141e26b74ff2bcdcd1df91632cdbefb126be450'
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Axios error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
