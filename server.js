const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '18a8f30c06cd494d84011ef552743949',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

// console.log(__dirname, path)

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post('/api/student', (req, res) => {
    const {name} = req.body
    name = name.trim()
    
    students.push(name)
    rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}!`))