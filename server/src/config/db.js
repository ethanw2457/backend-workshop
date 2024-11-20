import mongoose from 'mongoose'
// handles the actual connections and calls
const mongoConnect = () =>
  new Promise((res, rej) => {
    const mongoURI = process.env.MONGO_URI

    if (!mongoURI) {
      console.log('missing DATABASE_URL env')
      return
    }

    mongoose.connect(mongoURI).catch((err) => {
      console.error(err)
      rej(err)
    })

    const db = mongoose.connection
    db.once('open', () => {
      console.log('connected to mongodb')
      res()
    })
  })

export default mongoConnect
