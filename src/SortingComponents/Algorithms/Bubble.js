export const bubbleSort=(array)=>{
        let len = array.length-1;
        let animation=[]
        let sorted=[]
        let isSorted=false
        let counter=0

        while(isSorted!==true) {
            //is sorted is true whenever there there is no swap after one cycle
            isSorted=true
            for (let j = 0; j < len-counter; j++) { 
                //---pushing coparision value array to animation object after each comparision
                let animationobject={}
                animationobject.comparision=[j,j+1]

                //----swap logic----
                if (array[j] > array[j + 1]) {
                    //if thr
                    isSorted=false
                    //---pushing the swap array to animation object
                    animationobject.swap=[j,j+1]
                    let tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }

                //--in case if there is no swap, to tackle the error we are simply setting up the swap between same number 
    
                else{
                    animationobject.swap=[j+1,j+1]
                }
                //---pushinng the animation object to animation array
                animation.push(animationobject)
            }
            //-----since the last value is sorted after one cycle we are pushing the index it to sorted array
            sorted.push(len-counter)
            //right most is sorted to skip that iteration 
            counter+=1
 
        }
        return [animation,sorted];
};
