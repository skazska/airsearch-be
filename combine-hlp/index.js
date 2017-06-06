/**
 * Created by ska on 6/6/17.
 */
'use strict';

function productArrays (arr1, arr2, add) {
    let result = [];
    if (typeof add !== 'function') add = (elt1, elt2) => { return [elt1, elt2]; };
    arr1.forEach(elt1 => {
        arr2.forEach(elt2 => {
            result.push(add(elt1, elt2));
        });
    });
    return result;
}

function combine (...args) {
    let result = [[]];
    args.map(arg => {
        if (arg.hasOwnProperty('length') && typeof arg.forEach === 'function') {
            return arg;
        } else {
            return [arg];
        }
    }).forEach(arg => {
        result = productArrays(result, arg, (arr, elt) => { return arr.concat(elt); } );
    });
    return result;
}

function combineApply (fn, thisArg, ...args) {
    return combine.apply(this, args).map(callArgs => {
       return fn.apply(thisArg, callArgs);
    });
}

module.exports = {
    productArrays: productArrays,
    combine: combine,
    combineApply: combineApply
};