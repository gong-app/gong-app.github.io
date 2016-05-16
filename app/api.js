/**
 * API client
 */
export default class API {

  constructor(id) {
    this.URL = 'http://localhost'
    if (id)
      this.id = id;
  }

  setId(id) {
    this.id = id;
  }

  getHomies() {
    return new Promise((resolve, reject) => {
      fetch(`${this.URL}/${this.id}/homies`)
        .then(res => res.json())
        .catch(e => handleError(e, true));
    });
  }

  getHomiesDetails() {}

  gong(homies) {
    console.log(homies);
  }

  addHomie() {}

  login(data) {
    return new Promise((resolve, reject) => {
      fetch(`${this.URL}/login`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 'ok') {
            resolve();
          } else {
            reject(res.status)
          }
        });
    });
  }

  register() {}
}

function handleError(e, alertUser) {
  console.log(e);
  if (alertUser) {
    alert('Error loading ya homies. Sorry fam.');
  }
}
