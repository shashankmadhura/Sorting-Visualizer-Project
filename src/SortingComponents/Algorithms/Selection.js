export const selectionSort=(array)=>{
    //---animation array and swap array inorder to deal with the animation
    let animation=[]
    let swap=[]

    //---sorting algo
    for(let i=0;i<array.length;i++){
        let minpos=i
        for(let j=i+1;j<array.length;j++){
            //animation object to keep track of findingminimumprocess

            let animationobject={} 
            animationobject.findminimum=j  

            if(array[j]<array[minpos]){
                minpos=j

                //---grabbing the minimum value
                animationobject.minimum=minpos
            }

            else{
                animationobject.minimum=minpos               
            }
            //--pushing animationobject into animation array
            animation.push(animationobject)
        }
        //--pushing the swap values to swap array
        //--swap logic
        swap.push([i,minpos])
        let temp=array[i];
        array[i]=array[minpos]
        array[minpos]=temp 
        
    }
    return [animation,swap]
}