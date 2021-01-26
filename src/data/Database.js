import levelup from 'levelup';
import leveldown from 'leveldown';
import encode from 'encoding-down';

const promisify = (func, context, ...args) => new Promise((resolve, reject) => {
  const callback = (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  };
  const argsWithCallback = [...args, callback];
  func.apply(context, argsWithCallback);
});

export default class Database {
  constructor(filename) {
    this.db = levelup(
      encode(leveldown(filename), {
        valueEncoding: 'json',
      }),
    );
  }

  getAll() {
    const records = [];
    return new Promise((resolve, reject) => {
      this.db
        .createReadStream()
        .on('data', (data) => {
          records.push({ ...data.value, id: data.key });
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(records);
        });
    });
  }

  get(key) {
    return promisify(this.db.get, this.db, key);
  }

  put(key, value) {
    return promisify(this.db.put, this.db, key, value);
  }

  delete(key) {
    return promisify(this.db.del, this.db, key);
  }
}
