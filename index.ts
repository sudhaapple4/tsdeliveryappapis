import express from 'express';
import bodyParser from 'body-parser';
import { AdminRoute,VendorRoute } from './routes';
import App from './services/ExpressApp';
import dbConnection from './services/Database';
import { PORT } from './config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const StartServer = async () => {

    const app = express();

    await dbConnection()

    await App(app);

    app.listen(PORT, () => {
        console.log(`Listening to port 8000 ${PORT}`);
    })
}

StartServer();