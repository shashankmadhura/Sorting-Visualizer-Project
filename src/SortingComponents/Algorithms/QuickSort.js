export const QuickSort=(array)=>{
    if(array.length<=1){
        return
    }
    //animation array
    let animations=[]
    QuickSortHelper(array,0,array.length-1,animations)
    //the function will return animation array
    return animations
}

const QuickSortHelper=(array,startIdx,endIdx,animations)=>{
    //base case 
    if(startIdx>=endIdx){
        return
    }
    let pivotIdx=startIdx
    let leftIdx=startIdx+1
    let rightIdx=endIdx


    while(leftIdx<=rightIdx){
        //pushing the comparision value twice to deal with the color change to the animation array
            animations.push([leftIdx,rightIdx,pivotIdx])
            animations.push([leftIdx,rightIdx,pivotIdx])

        if(array[leftIdx]>array[pivotIdx] && array[rightIdx]<array[pivotIdx]){
            //push the swap index to animations array
            animations.push([leftIdx,rightIdx])
            swap(array,leftIdx,rightIdx)
        }
        else{
            //if there is no swap simply push the same value
            animations.push([leftIdx,leftIdx])
        }
        
        //pointer increment condition
        if(array[leftIdx]<=array[pivotIdx]){
            leftIdx++
        }

        if(array[rightIdx]>=array[pivotIdx]){
            rightIdx--
        }
    }

    //pushing comaprision array(twice) with pivot index and swap arry once to the animation array
    animations.push([pivotIdx,rightIdx,pivotIdx])
    animations.push([pivotIdx,rightIdx,pivotIdx])  
    animations.push([pivotIdx,rightIdx])  
    //swapping pivot and right index    
    swap(array,pivotIdx,rightIdx)

    //finding which sub array is smaller
    let leftUSubarrayisSmaller=((rightIdx-1)-startIdx)<(endIdx-(rightIdx+1))

    if(leftUSubarrayisSmaller){
        QuickSortHelper(array,startIdx,rightIdx-1,animations)
        QuickSortHelper(array,rightIdx+1,endIdx,animations)
    }
    else{
        QuickSortHelper(array,rightIdx+1,endIdx,animations) 
        QuickSortHelper(array,startIdx,rightIdx-1,animations)             
    }

}


//swap logic
const swap=(array,i,j)=>{
    let temp=array[i]
    array[i]=array[j]
    array[j]=temp
}