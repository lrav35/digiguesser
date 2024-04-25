import express from 'express';
import helmet from 'helmet';
import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, '../public')));

app.use(helmet(
    {
        contentSecurityPolicy: {
            directives: {
                imgSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"]
            }
        }
    }

));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(dirname, '../index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
