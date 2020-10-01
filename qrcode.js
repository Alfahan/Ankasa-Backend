const QRCode = require('qrcode')

const dataobj = {
    1: 1,
    2: 2
}

const data = JSON.stringify(dataobj)

QRCode.toString('Hello world',{type:'terminal'}, function (err, url) {
    console.log(url)
  })

  QRCode.toDataURL(data)
  .then(url => {
    console.log(url)
  })
  .catch(err => {
    console.error(err)
  })