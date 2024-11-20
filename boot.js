module.exports = app => {
    const PORT = 2000

    app.listen(2000, ()=> {
        console.log(`Server on, access the url http://localhost:${PORT}/usuario`)
    })
}