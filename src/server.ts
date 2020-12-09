import app from './App'
app.listen(80, (err) => {
    if (err) return console.log(err)
    return console.log('Server is running in port: ', 80);
})