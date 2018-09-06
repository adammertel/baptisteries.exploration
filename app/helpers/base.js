// @flow

var Base = {
  sum: (a: number, b: number): number => a + b,
  load: (url: string, parse: boolean) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    // xhr.withCredentials = true;
    xhr.setRequestHeader(
      'Access-Control-Allow-Origin',
      'http://adam:8080'
    )

    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET')
    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    )

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return parse
            ? JSON.parse(xhr.responseText)
            : xhr.responseText
        } else {
          // console.log(xhr.statusText);
          return {}
        }
      } else {
        return {}
      }
    }

    xhr.send()
  }
}

export default Base
