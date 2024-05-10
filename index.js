// index.js
import app from './app.js';
import db from './database.js';

const PORT = process.env.PORT || 4000;

db.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.log('Error connecting to the database:', error);
});
