var Base = {
  sum: (a: number, b: number): number => a + b,

  doRequest: (url: string, next: Function, parse: boolean = true) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    // xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          parse
            ? next(JSON.parse(xhr.responseText))
            : next(xhr.responseText);
        } else {
          next({});




        }
      } else {
        next({});
      }
    };
    xhr.send();
  },
};

export default Base;



