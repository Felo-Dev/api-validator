// index.js
import app from './app.js';
import db from './database.js';

const PORT = process.env.PORT || 4000;

db.then(() => {
    app.listen(PORT, () => {
        console.log(`El servidor esta corriendo en el puerto ${PORT}`);
    });
}).catch(error => {
    console.log('Error connecting to the database:', error);
});
