var req = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem('token')
  }
}

module.exports = req;