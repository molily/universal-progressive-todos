import levelup from 'levelup';

export default class Database {

  constructor(filename) {
    this.db = levelup(filename, {
      valueEncoding: 'json'
    });
  }

  getAll(callback) {
    const records = [];
    this.db.createReadStream()
    .on('data', (data) => {
      records.push({ ...data.value, id: data.key });
    })
    .on('error', (err) => {
      callback(err);
    })
    .on('end', () => {
      callback(null, records);
    });
  }

  get(key, callback) {
    this.db.get(key, (err, value) => {
      callback(err);
    });
  }

  put(key, value, callback) {
    this.db.put(key, value, (err) => {
      if (callback) {
        callback(err);
      }
    });
  }

  delete(key, callback) {
    this.db.del(key, (err) => {
      if (callback) {
        callback(err);
      }
    });
  }

}
