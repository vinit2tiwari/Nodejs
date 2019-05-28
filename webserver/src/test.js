// 'use strict';


// //code to read input on hackerrank 
// process.stdin.resume();
// process.stdin.setEncoding('utf-8');

// let input = '';
// let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//     input += inputStdin;
// });

// process.stdin.on('end', function() {
//     input = input.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));

//     main();
// });

// function readLine() {
//     return input[currentLine++];
// }

// function main(){
//     var count = readLine();
//     console.log(count);

//     var i=0;
//     var original = [];
//     var final = [];
//     for(i;i<count;i++){
//         original.push(readLine());
//         final.push(readLine());
//     }

//     var inputString = readLine();
//     console.log(inputString);
//     console.log(original);
//     console.log(final);
// }

// var inputString = 'toe or top';
// var original = [ 't' ];
// var final = [ 'sh' ];


// function processInput(inputString , original,final){

//     var startString = inputString;

//     for(var i=0;i<original.length;i++){
//         var index = inputString.indexOf(original[i]);
//         if(index!= -1){
//             var ldata = inputString.substr(index, original[i].length);
//             var ndata = final[i];
//             inputString = inputString.replace(ldata, ndata);
//             console.log(inputString );
//             return processInput(inputString,original ,final);
//         }
//     }

//     if(startString === inputString){
//         return startString;
//     }
//     return processInput(inputString,original ,final);
// }

// var result = processInput(inputString,original, final);

// console.log(result);


function getNumbers(start ,end){
    var result = [];
    if(start>end){
        return result;
    }else{
        var lnearestSqr = Math.floor(Math.sqrt(start));
        var lnearestCbr = Math.floor(Math.cbrt(start));
        if(Math.pow(lnearestCbr,4)<start && Math.pow(lnearestCbr,5)>end){
            lnearestCbr = lnearestCbr+1;
        }

        if(lnearestSqr*lnearestSqr === start || Math.pow(lnearestCbr,3) == start){
            result.push(lnearestSqr*lnearestSqr);
        }

        var count = 0;
        var lsqrdata  = -1;
        var lcbdata = -1;
        while(lsqrdata<=end  || lcbdata <= end){
            lsqrdata = lnearestSqr*lnearestSqr + count*count;
            if(canAdd(result,start,end,lsqrdata)){
                result.push(lsqrdata);

                if(canAdd(result,start,end,lnearestSqr*lnearestSqr + count*count*count)){
                    result.push(lnearestSqr*lnearestSqr + count*count*count);
                }
            }

            lcbdata = Math.pow(lnearestCbr,3) + Math.pow(count,2);
            if(canAdd(result,start,end,lcbdata)){
                result.push(lcbdata);

               
                if(canAdd(result,start,end,Math.pow(lnearestCbr,3) + Math.pow(count,3))){
                    result.push(Math.pow(lnearestCbr,3) + Math.pow(count,3));
                }
            }
            console.log(lsqrdata);
            
            count++;
        }

        return result;
    }
}

function canAdd(result,start,end,data){
    if(data>=start && data<=end && result.indexOf(data)== -1){
        return true;
    }else{
        return false;
    }
}

var data = getNumbers(25,30);
console.log(data.length);