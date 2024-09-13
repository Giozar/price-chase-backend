import app from './app/app'

app.listen(process.env.PORT);

console.log('Corriendo en el puerto', process.env.PORT);