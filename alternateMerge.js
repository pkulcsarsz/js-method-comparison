const array1Length = 200
const array2Length = 500
const numberOfTests = 1000

const array1 = Array.from({ length: array1Length }, () =>
  Math.floor(Math.random() * 10000)
)
const array2 = Array.from({ length: array2Length }, () =>
  Math.floor(Math.random() * 10000)
)

const testFunction = (method) => {
  for (let i = 0; i < numberOfTests; i++) {
    method(array1, array2)
  }
}

const method1 = (arr1, arr2) => {
  return (arr1.length > arr2.length ? arr1 : arr2)
    .map((_, i) => [arr1[i], arr2[i]])
    .flat()
    .filter(Boolean)
}

const method2 = ([x, ...xs], ys = []) =>
  x === undefined ? ys : [x, ...method2(ys, xs)]

const method3 = (array1, array2) => {
  let result = [],
    i,
    l = Math.min(array1.length, array2.length)

  for (i = 0; i < l; i++) {
    result.push(array1[i], array2[i])
  }
  result.push(...array1.slice(l), ...array2.slice(l))

  return result
}

const method4 = (a1, a2) => {
  const l = Math.min(a1.length, a2.length)

  return [].concat(
    ...Array.from({ length: l }, (_, i) => [a1[i], a2[i]]),
    a1.slice(l),
    a2.slice(l)
  )
}

const method5 = (...arrays) => {
  const braided = []
  for (let i = 0; i < Math.max(...arrays.map((a) => a.length)); i++) {
    arrays.forEach((array) => {
      if (array[i] !== undefined) braided.push(array[i])
    })
  }
  return braided
}

const method6 = (x,y) => [...x,...y].reduce((l,c,i)=>(i<x.length&&l.push(x[i]),i<y.length&&l.push(y[i]),l),[])

const method7 = (a,b) => (a.length > b.length ? a : b)
.reduce((acc, cur, i) => a[i] && b[i] ? [...acc, a[i], b[i]] : [...acc, cur], []);

const splicer = (array, element, index) => {
    array.splice(index * 2, 0, element);
    return array;
}

const method8 = (array1, array2) => {
    return array1.reduce(splicer, array2.slice());
}

console.time('method1')
testFunction(method1)
console.timeEnd('method1')

console.time('method2')
testFunction(method2)
console.timeEnd('method2')

console.time('method3')
testFunction(method3)
console.timeEnd('method3')

console.time('method4')
testFunction(method4)
console.timeEnd('method4')

console.time('method5')
testFunction(method5)
console.timeEnd('method5')

console.time('method6')
testFunction(method6)
console.timeEnd('method6')

console.time('method7')
testFunction(method7)
console.timeEnd('method7')

console.time('method8')
testFunction(method8)
console.timeEnd('method8')
