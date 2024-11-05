
import express from 'express'; // Importing  the Express framework, which is used to build web applications and APIs in Node.js. 
import cors from 'cors';// not sure if i need this
import bodyParser from 'body-parser';// Used to parse incoming request bodies before your handlers so you can access the data in req.bod
import { PrismaClient } from '@prisma/client';  // Importing Prisma client to connect to the database
 // Importing the todo routes from the todoRoutes.js file
import todoRoutes from './routes/todoRoutes';
import path from 'path';
/* Now I wil initializes an Express application and set up a Prisma client for database interaction . 
DB context in C sharp */
const app = express();  // immutable instance of the Express application (object)
const prisma = new PrismaClient();  // Initializes a new Prisma Client instance for interacting with the database.
const PORT = process.env.PORT || 3000;  // my port for the server to listen on 
app.use(express.json()); // parse JSON stuff 
app.use(cors()); 
app.use('/api', todoRoutes);

// the view was not showing, this should work 
app.use(express.static(path.join(__dirname, '../Theview')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Theview/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
