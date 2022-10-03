var a = [1, 6, 3, 8, 5, 6, 7]
console.log(a)

a.map((v, i) => 
   a[i] = a[i] * 2
)
console.log(a)