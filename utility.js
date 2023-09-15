const RandomValues = (window) => {
  window.randInt = function (a, b) {
    if (a === void 0) return Math.round(Math.random());
    else if (b === void 0) return Math.floor(Math.random() * a);
    else return Math.floor(Math.random() * (b - a + 1) + a);
  };

  window.randIntExcept = function (a, b, c) {
    let value = c;
    while (value === c) {
      if (a === void 0) value = Math.round(Math.random());
      else if (b === void 0) value = Math.floor(Math.random() * a);
      else value = Math.floor(Math.random() * (b - a + 1) + a);
    }
    return value;
  };

  window.randFloat = function (a, b) {
    if (a === void 0) return Math.random();
    else if (b === void 0) return Math.random() * a;
    else return Math.random() * (b - a) + a;
  };
  window.rand = function (a, b) {
    return Array.isArray(a)
      ? a[Math.floor(Math.random() * a.length)]
      : window.randInt(a, b);
  };
};

const DistanceBetweenPoints = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

function setVh(window) {
  const vh = window.innerHeight * 0.0098;
  document.getElementsByTagName("html")[0].style.setProperty("--vh", `${vh}px`);
}

export { RandomValues, DistanceBetweenPoints, setVh };
