export const insertionSort=(array)=>{
    //animation array
    let animation=[]

for(let i=0;i<array.length;i++){
    let animationobject={}
    let j=i

    //if there is no swap only comparision we are pushing the object of comparision to animation array
    //thi is not the part of insertion sort algo
    if(j>0 && array[j]>=array[j-1]){
        animationobject.comparision=[j,j-1]
        animationobject.swap=[j,j]
        animation.push(animationobject)
    }

    //swpping if true
    while(j>0 && array[j]<array[j-1]){
        //push the comparision value and swap value
        animationobject={}
        animationobject.comparision=[j,j-1]
        animationobject.swap=[j,j-1]
        //swap logic
        let temp=array[j-1]
        array[j-1]=array[j]
        array[j]=temp
        animation.push(animationobject)
        j-=1
        
    }
}
return animation
}