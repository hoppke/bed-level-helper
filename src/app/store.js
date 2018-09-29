export class Store {
  constructor() {
    // let storedObject = window.localStorage.getItem('bedSamples')
    // let bedSamples = storedObject && JSON.parse(storedObject)
    let bedSamples = null

    if (bedSamples) {
      this._store = bedSamples
      this._idCounter = this._store[this._store.length - 1].id + 1
    } else {
      this._store = []
      this._idCounter = 1
    }
  }

  get count() {
    return this._store.length
  }

  insert(entry) {
    entry.id = this._idCounter
    this._store.push(entry)
    this._idCounter++
    // window.localStorage.setItem('bedSamples', JSON.stringify(this._store))
  }

  get latest() {
    if (this._store.length > 0) {
      return this._store[this._store.length - 1]
    }
  }
}
