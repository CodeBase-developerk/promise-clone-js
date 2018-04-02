class PromiseClone {
  constructor(callback) {
    this.count = 1
    this.resolved = false
    this.rejected = false
    callback(data => {
      if (this.count === 1) {
        this.data = data
        this.count++
        this.resolved = true
      }
    }, err => {
      if (this.count === 1) {
        this.err = err
        this.count++
        this.rejected = true
      }
    })
  }
  then(then_callback) {
    if (this.resolved) {
      then_callback(this.data)
    }
    return {
      catch: catch_callback => {
        if (this.rejected) {
          catch_callback(this.err)
        }
      }
    }
  }
}
new PromiseClone((resolve, reject) => {
  reject('no data found')
  resolve({
    id: 001,
    name: 'Sohail Khan',
    age: 16
  })
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
