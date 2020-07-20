export const mergeSort=(array)=>{
    const animation=[]

    if(array.length<=1){
        return
    }
    let axiliaryArray=array.slice()
    mergeSortHelper(array,0,array.length-1,axiliaryArray,animation)
    return animation
}

const mergeSortHelper=(mainArray,startIdx,endIdx,axiliaryArray,animation)=>{
    if(startIdx===endIdx){
        return
    }
    let midIdx=Math.floor((startIdx+endIdx)/2)
    mergeSortHelper(axiliaryArray,startIdx,midIdx,mainArray,animation)
    mergeSortHelper(axiliaryArray,midIdx+1,endIdx,mainArray,animation)
    doMerge(mainArray,startIdx,midIdx,endIdx,axiliaryArray,animation)

}

const doMerge=(mainArray,startIdx,midIdx,endIdx,axiliaryArray,animation)=>{
     let k=startIdx
     let i=startIdx
     let j=midIdx+1

     while(i<=midIdx  && j<=endIdx){
         const animationobject={}
         //pushing comparision and swap values to animation object

         animationobject.comparision=[i,j]

         if(axiliaryArray[i]<=axiliaryArray[j]){
             //push overwritting values
             animationobject.swap=[k,axiliaryArray[i]]

             mainArray[k]=axiliaryArray[i]
             i++
         }
         else{

             mainArray[k]=axiliaryArray[j]
             //push overwritting values
             animationobject.swap=[k,axiliaryArray[j]]
             j++
         }
         animation.push(animationobject)
         k++
     }

     //remaining values on first half
     while(i<=midIdx){
        //push overwritting values and comparision values
         animation.push({comparision:[i,i],
                        swap:[k,axiliaryArray[i]]
                    })
         mainArray[k]=axiliaryArray[i]
         i++
         k++
     }

     //remaining value in second half
     while(j<=endIdx){
               //push overwritting values and comparision values
        animation.push({comparision:[j,j],
                        swap:[k,axiliaryArray[j]]})
        mainArray[k]=axiliaryArray[j]
        j++
        k++
    }


}