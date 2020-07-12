function clone(a) {
  return JSON.parse(JSON.stringify(a));
}

function merge(paramA, paramB) {
  const a = clone(paramA);
  const b = clone(paramB);
  const ret = [];

  while (a.length > 0 && b.length > 0) {
    const min = Math.min(a[0], b[0]);
    ret.push(min);
    if (a[0] < b[0]) {
      a.splice(0, 1);
    } else {
      b.splice(0, 1);
    }
  }
  if (a.length > 0) {
    ret.splice(ret.length, 0, ...a);
  }
  if (b.length > 0) {
    ret.splice(ret.length, 0, ...b);
  }
  return ret;
}

function mergeSort(left, right, arr) {
  if (right === left) {
    return [arr[left]];
  }

  const mid = Math.floor((left + right) / 2);
  const a = mergeSort(left, mid, arr);
  const b = mergeSort(mid + 1, right, arr);
  const ret = merge(a, b);
  addToHtml(left, ret);
  return ret;
}

let globalArr = [];

function randomArr() {
  const ret = [];
  for (let i = 0; i < 10; i++) {
    ret.push(Math.floor(Math.random() * 100));
  }
  return ret;
}

function main() {
  const arr = randomArr();

  globalArr = clone(arr);
  addToHtml(-1, []);

  const ret = mergeSort(0, arr.length - 1, arr);
  console.log(ret);
}

main();

function addToHtml(left, partition) {
  const c = clone(globalArr);
  c.splice(left, partition.length, ...partition);
  globalArr = c;

  console.log(left, " ", partition.length);
  let elem = `<div class="list-num">`;
  let idx = 0;
  c.forEach((a) => {
    if (idx >= left && idx <= left + partition.length) {
      elem += `<div class="num color">${a}</div>`;
    } else {
      elem += `<div class="num">${a}</div>`;
    }
    idx++;
  });
  elem += `</div>`;

  document.querySelector("body").innerHTML += elem;
}
