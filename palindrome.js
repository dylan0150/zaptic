/*
 * n = the number of palindromes
 * x = the current sum of all palindromes
 * v = the current palindrom
*/

var start = Date.now()

if ( process.argv.length < 3 || isNaN(process.argv[2]) ) {
    console.log("USAGE: node palindrome.js [count]")
    return;
} else {
    var max = process.argv[2]
    genPD_bruteForce(max)
}

function isPD(n) {
    return n.toString() == n.toString().split('').reverse().join('')
}

function genPD_bruteForce(max) {

    var v = 0
    var n = 0
    var x = 0
    var c = 0

    while ( x < max ) {
        if ( isPD(v) ) {
            x += v
            n++
            if ( isPD(x) ) {
                c++
                console.log(`Answer ${c} found for values N:${n}, X:${x}, V:${v}`)
            }
        }
        v++
    }

    var end = Date.now()
    var t = end - start
    console.log(`Reached N:${n}, X:${x}, V:${v} without finding another answer, time taken ${timeFormat(t)}`)
}

function timeFormat(t) {

    var ms = t % 1000
    t -= ms
    t /= 1000
    if ( t == 0 ) { return `${ms}ms` }

    var s = t % 60
    t -= s
    t /= 60
    if ( t == 0 ) { return `${s}.${ms}s` }

    var m = t % 60
    t -= m
    t /= 60
    if ( t == 0 ) { return `${m}m, ${s}.${ms}s` }

    var h = t % 24
    t -= h
    t /= 24
    if ( t == 0 ) { return `${h}h, ${m}m, ${s}.${ms}s` }
    
    return `${t}d, ${h}h, ${m}m, ${s}.${ms}s`
}