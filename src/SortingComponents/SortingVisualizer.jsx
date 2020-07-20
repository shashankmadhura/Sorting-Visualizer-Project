import React, { Component } from 'react';
import './Styling/SortingVisualizer.css';
import { bubbleSort } from './Algorithms/Bubble.js';
import {selectionSort} from './Algorithms/Selection.js';
import {insertionSort} from './Algorithms/InsertionSort.js';
import {mergeSort} from './Algorithms/MergeSort';
import {QuickSort} from './Algorithms/QuickSort';
import Buttons from './Buttons'

//-----change size of array here

 class SortingVisualizer extends Component {
    constructor(props) {
        super(props)
   
        this.state = {
             array:[],
             //isrunning  state to pass to the child element Buttons
             //is running corresponds to whether the animation is running or not
             isrunning:false,
             width:5,
             ARRAY_SIZE:150,
             SPEED:5,
        }
    }

//-------reset the array before rendering it--------
    componentWillMount(){
        this.resetArray()
    }


//--------------reset array function pushes 150 random values to the array between the range 5,600--------
    resetArray=()=>{
        const array=[]
        let {ARRAY_SIZE}=this.state
        for(let i=0;i<=ARRAY_SIZE;i++){
            array.push(getRandomInt(5,600));
        }

        //width of bar
        let width
        if(ARRAY_SIZE>=125 && ARRAY_SIZE<=150){
            width=8
        }
        else if(ARRAY_SIZE>=100 && ARRAY_SIZE<125){
            width=10
        }
        else if(ARRAY_SIZE>=50 && ARRAY_SIZE<100){
            width=12
        }
        else if(ARRAY_SIZE>=25 && ARRAY_SIZE<50){
            width=16
        }
        else if(ARRAY_SIZE>=15 && ARRAY_SIZE<25){
            width=20
        }
        else {
            width=30
        }

        this.setState({
            array:array,
            width:width
        })
      
        let arrayBars=document.getElementsByClassName('array-bar');
        //--reset the color of bars to blue each time when reset is called--
        for(let i=0;i<arrayBars.length;i++){
            arrayBars[i].style.backgroundColor='blue'
        }
        }

//---------------------------------------------------BUBBLE SORT-----------------------------------------------------------

    //-----------bubble sort function which recieves the animation from the Bubble.js-----------
    bubleSort=()=>{
        //setting current sort label
        document.getElementById("currentsortinglabel").innerHTML="BUBBLE SORT..."

        //--setting up the speed of sorting
        //const SPEED=1
        const {SPEED}=this.state

    
        //--recieves animation array of objects which consist of array of compared value and array of swapped values
        //eg: animation=[{ comparision:[a,b], swapped:[a:b] }]
        //--recieves sorted numbers array more preciesly the values which are sorted on right side
        //eg: sorted=[149,148.......] bar numbers
        let recieved=bubbleSort(this.state.array)
        let animation=recieved[0]
        let sorted=recieved[1]

        //--declaring a new animation array inorder to deal with color change
        let newAnimation=[]
        let k=0

        /*--Here we are traversing through animation array and pushing the animation.comparision twice 
        one to turn the bars to red color and another to turn it to blue color back
        and animation.swap array once
        and whenever there is a swap we are swapping the heights*/
        for(const anim of animation){
            newAnimation.push(anim.comparision)
            newAnimation.push(anim.comparision)
            newAnimation.push(anim.swap)
        }

        /*1--traversing through the newAnimation array
        2---and distructuring array values as bar1index and bar2index 
        3--4--5--grabbing the arraybars from DOM, setting up the style attribute for both the array bars*/
        for(let i=0;i<newAnimation.length;i++){
            const [bar1index, bar2index]=newAnimation[i];
            let arrayBars=document.getElementsByClassName('array-bar');
            let bar1style=arrayBars[bar1index].style;
            let bar2style=arrayBars[bar2index].style;

            /*---setting up the color change variable and color change becomes true [0,1,2..],
            -> 0%3!=2 TRUE
            -> 1%3!=2 TRUE
            -> 2%3!=2 FALSE
            ->That means there is a color change for first two values(array) that is from red to blue
             */
            let is_colorchange=i%3!==2;
            if (is_colorchange){
                //-- for 0 index 0%3==0 means red(blue to red) both the bars
                //-- for 1 index 1%3==0(FALSE) turn the same bars to blue back 
                let color=i%3===0 ? 'red' : 'blue';

                //--changiing the color of both the bars from blue to red ,red to blue back
                setTimeout(()=>{
                    bar1style.backgroundColor=color;
                    bar2style.backgroundColor=color;
                 },(i+15)*SPEED)
            }

            //--if no color change then we need to swap the heights of bar--
            else {

                setTimeout(()=> {    
                    //--color the sorted bars to green by using sorted array
                    //--if one full cycle is completed then weneed to set it to green     
                    if(bar2index===sorted[k]){
                        k++
                        arrayBars[bar2index].style.backgroundColor='green';
                    }

                    //--swap the heights of bars
                    let tempheight=bar2style.height
                    bar2style.height=bar1style.height
                    bar1style.height=tempheight
                    
                    //--coloring the left most bar which remains after sorting to green
                    // if(k===sorted.length){
                    //     arrayBars[bar2index-1].style.backgroundColor='green';
                    // }

                    //after completion of sorting coloring all unsorted bar to green 
                    if(i===(newAnimation.length-1)){
                        let bar=document.getElementsByClassName('array-bar')
                        for(let i=bar2index;i>=0;i--){
                            setTimeout(()=>{
                                bar[i].style.backgroundColor='green'
                            },(i+15)*SPEED)
                        }

                    }

                    //setting isrunning to false inorder to enable the events on button click  after 2s            
                    if(i===newAnimation.length-1){
                        setTimeout(()=>{
                            //removing sorting label
                            document.getElementById("currentsortinglabel").innerHTML=""
                            this.setState({isrunning:false})
                        },2000)
                    }

                },(i+15)*SPEED) 
                
            }
        }
    }



//------------------------------------------------SELECTION SORT--------------------------------------------------
    //---selection sort function which recieves animation object arrray and swapped value array
    //---animation=[{findminimum,minimum}]
    selectionSort=()=>{
        //setting current sort label
        document.getElementById("currentsortinglabel").innerHTML="SELECTION SORT..."

        //---change the speed of sorting here
        //const SPEED=2
        const {SPEED}=this.state

        let recieved_array=selectionSort(this.state.array)
        let animation=recieved_array[0]
        let swap=recieved_array[1]
        
    //---creating a newAnimation array inorder to deal with the color change
    //--k is used to identify the one full cycle (swapping operation after one cycle)
    //--minimum array is to keep track of minimum value 
        let newAnimation=[]
        let minimum=[]
        let k=0

    //--traversing through animation array and pushing finding minimum value twice inorder to deal with the color change(red to blue)
    //--pushing the minimum value to minimum array
        for(let anim of animation){
            newAnimation.push(anim.findminimum)
            newAnimation.push(anim.findminimum)
            //pushing minimum values twice
            minimum.push(anim.minimum)
            minimum.push(anim.minimum)
    }
    //pushing the last value once again inorder to tackle the error(index out f range)
    //cz we ar comparing two value in the loop
    minimum.push(minimum[minimum.length-1])

    //--trversing through the newAnimation array and grabbing the value which corresponds to bar1 index
        for(let i=0;i<newAnimation.length;i++){
            const bar1index=newAnimation[i]
            const minimunbarindex=minimum[i]

            //--grabbing the arrayBars from DOM and setting up the style
            let arrayBars=document.getElementsByClassName('array-bar');
            let bar1style=arrayBars[bar1index].style
            let minimumbarstyle=arrayBars[minimunbarindex].style

            //--setting up the first index bar to yellow 
            let firstbar=arrayBars[0].style.backgroundColor='yellow'

            //--is_colorchange become false ,at the end of each cycle it becomes false and jump into swap section(else block)
            let is_colorchange=bar1index!==arrayBars.length-1;


            if (is_colorchange){

                //for zero th index of newAnimation set the color to red
                //for repeating value(we pushed findminimum twice) set  it back to blue
                let color=i%2===0 ? 'red' : 'blue';
                //if both the index are same then no need to change the color to blue
                let minbarcolor=minimum[i]===minimum[i+1]? 'black':'blue'

                //--set the color either to red or blue based on the condition
                //setting the minbar color and first index to YELLOW
                setTimeout(()=>{                  
                    bar1style.backgroundColor=color;
                    minimumbarstyle.backgroundColor=minbarcolor
                    arrayBars[k].style.backgroundColor='yellow'

                 },(i+15)*SPEED)
            }


            else{
                //--to skip the repeating value in the array (we pushed twice),to skip multiple swap at once, we are ignoring even index
                if(i%2===0){
                    continue
                }
                setTimeout(()=>{
                    //--grabbing the swap index value from swap array
                    let [swapbar1,swapbar2]=swap[k]
                    k++
                    //--setting the color of first index to yellow after each swap cycle
                    arrayBars[k].style.backgroundColor='yellow'

                    //--swap logic
                    let swapbar1style=arrayBars[swapbar1].style
                    let swapbar2style=arrayBars[swapbar2].style
                    let tempheight=swapbar2style.height
                    swapbar2style.height=swapbar1style.height
                    swapbar1style.height=tempheight
                    //turning minimumbar back to blue
                    minimumbarstyle.backgroundColor='blue'
                    swapbar1style.backgroundColor='green'


                    //--after each cycle setting the sorted bar color to green
                    if(k===swap.length-1){
                        swapbar2style.backgroundColor='green'
                        //for the final bar to covert it to green
                        arrayBars[k].style.backgroundColor='green'
                    }

                    //setting isrunning to false inorder to enable the events on button click  after 2s            
                    if(i===newAnimation.length-1){
                        setTimeout(()=>{
                            //removing sorting label
                            document.getElementById("currentsortinglabel").innerHTML=""
                            this.setState({isrunning:false})
                        },2000)
                    }
                },(i+15)*SPEED)
                
            }
        }
}

//----------------------------------------------INSERTION SORT----------------------------------------
    insertionSort=()=>{

        //setting current sort label
        document.getElementById("currentsortinglabel").innerHTML="INSERTION SORT..."        


        //set SPEED of ANIMATION HERE
        //const SPEED=2
        const {SPEED}=this.state

        // recieved animation array
        let animation=insertionSort(this.state.array)
        //sorted to false to color the graph to green wheneve it becomes true
        let sorted=false

    //new animation array inorder to deal with the color change     
        let newAnimation=[]
        for(let anim of  animation){
            //pushing comparision array twice to deal with color change from red to blue
            newAnimation.push(anim.comparision)
            newAnimation.push(anim.comparision)
            newAnimation.push(anim.swap)
        }

        //iterating through newAnimation and setting up the arrayBar style
        for(let i=0;i<newAnimation.length;i++){
            let [bar1,bar2]=newAnimation[i]
            let arrayBars=document.getElementsByClassName("array-bar")
            let arrayBar1Style=arrayBars[bar1].style
            let arrayBar2Style=arrayBars[bar2].style

            //for index 0,1 there is a color change from red to blue
            let is_colorchange=i%3!==2

            if(is_colorchange){
                //for 0 setting color to red and for 1 setting color to blue
               let  color=(i%3)===0?'red':'blue';

            setTimeout(()=>{
                arrayBar1Style.backgroundColor=color
                arrayBar2Style.backgroundColor=color
            },(i+10)*SPEED)
            }

            //for third value there is no color change ,there is a swap
            else{
                setTimeout(()=>{
                    //swapping the height
                    let temp=arrayBar1Style.height
                    arrayBar1Style.height=arrayBar2Style.height
                    arrayBar2Style.height=temp
                    //when the loop is completed , setting sorted to true
                    sorted=(i===newAnimation.length-1)?true:false

                    //whenever the array is sortred change the color of entire array back to green
                    if (sorted===true){
                        for(let i=0;i<this.state.array.length;i++){
                            let arrayBars=document.getElementsByClassName('array-bar')
                            let arrayBarstyle=arrayBars[i].style
                            setTimeout(()=>{
                                arrayBarstyle.backgroundColor='green'
                            },i*10)
                        }
                    }

                 //setting isrunning to false inorder to enable the events on button click
                    if(i===newAnimation.length-1){
                        setTimeout(()=>{
                            //removing sorting label
                            document.getElementById("currentsortinglabel").innerHTML=""
                            this.setState({isrunning:false})
                           },2000)

                    }

                },(i+10)*SPEED)

        }


    }

}

//-------------------------------------------------MERGE SORT---------------------------------------------------------------

mergeSort=()=>{

    //setting current sort label
    document.getElementById("currentsortinglabel").innerHTML="MERGE SORT..."  

    //SET SPEED OF ANIMATION HERE(ms)
    // let SPEED=5
    const {SPEED}=this.state

    //calling mergeSort and got animat
    let animation=mergeSort(this.state.array)


    //we are pushing comparison array twice to change color from red to blue
    //and swap(overwrite) value once to the array
    let newAnimation=[]
    for(let anim of animation){
        newAnimation.push(anim.comparision)
        newAnimation.push(anim.comparision)
        newAnimation.push(anim.swap)
    }

    //trversing through the newAnimation and grabbing the bar index
    for(let i=0;i<newAnimation.length;i++){
         const [bar1Index,bar2Index]=newAnimation[i]
         let arrayBars=document.getElementsByClassName('array-bar')

        //for first two values there is a color change from red to blue
         let is_colorchange=(i%3)!==2

        //changing the color of comparision bar in dom from red to blue
         if(is_colorchange){
             let color=(i%3)===0?'red':'blue'
             let bar1Style=arrayBars[bar1Index].style
             let bar2Style=arrayBars[bar2Index].style

            setTimeout(()=>{
                bar1Style.backgroundColor=color
                bar2Style.backgroundColor=color
            },(i+15)*SPEED)
         }

         else{

            setTimeout(()=>{
                //grabbing the overwriting bar index 
               const [bar1Index,newHeight]=newAnimation[i]
               //overwritting the height
                let barstyle=arrayBars[bar1Index].style
                barstyle.height=`${newHeight}px`

                //after sorting is completed coloring the bar to green
                if (i===(newAnimation.length-1)){
                    for(let i=0;i<this.state.array.length;i++){
                        let arrayBars=document.getElementsByClassName('array-bar')
                        let arrayBarstyle=arrayBars[i].style
                        setTimeout(()=>{
                            arrayBarstyle.backgroundColor='green'
                        },i*10)
                    }
                }

                //setting isrunning to false inorder to enable the events on button click  after 2s            
                if(i===newAnimation.length-1){
                    setTimeout(()=>{
                        //removing sorting label
                        document.getElementById("currentsortinglabel").innerHTML=""
                        this.setState({isrunning:false})
                       },2000)
                }

            },(i+15)*SPEED)

             



         }
    }

}

//-----------------------------------------QUICK SORT-----------------------------------------------------------------
quickSort=()=>{
    
    //setting current sort label
    document.getElementById("currentsortinglabel").innerHTML="QUICK SORT..."  

    //qucick sort function will return animations
    let animation=QuickSort(this.state.array)

    //destructuring SPEED from state
    const {SPEED}=this.state

    //traversing through the animations 
    for(let i=0;i<animation.length;i++){

        //for the first two comparision array we have color change
        let isColorchange=(i%3)!==2

        //
        if(isColorchange){
            let [bar1Index,bar2Index,pivotIndex]=animation[i]
            //grabbing the index specified bar fro DOM and set the style
            let bar1Style=document.getElementsByClassName("array-bar")[bar1Index].style
            let bar2Style=document.getElementsByClassName("array-bar")[bar2Index].style
            let pivotstyle=document.getElementsByClassName("array-bar")[pivotIndex].style

            //color transition from red to blue
            let color=(i%3===0)?'red':'blue'
            
            setTimeout(()=>{
                //pivot index value remains yellow
                pivotstyle.backgroundColor='yellow'
                bar1Style.backgroundColor=color
                bar2Style.backgroundColor=color
            },(i+15)*SPEED)

        }

        else{
            //if there is no color change we need to swap
            let [bar1Index,bar2Index]=animation[i]
            let bar1Style=document.getElementsByClassName("array-bar")[bar1Index].style
            let bar2Style=document.getElementsByClassName("array-bar")[bar2Index].style

            setTimeout(()=>{
                //swapping heights
                let temp=bar1Style.height
                bar1Style.height=bar2Style.height
                bar2Style.height=temp

                //after sorting is completed coloring the bar to green
                if (i===(animation.length-1)){
                    for(let i=0;i<this.state.array.length;i++){
                        let arrayBars=document.getElementsByClassName('array-bar')
                        let arrayBarstyle=arrayBars[i].style
                        setTimeout(()=>{
                            arrayBarstyle.backgroundColor='green'
                        },i*10)
                    }
                }

                //setting isrunning to false inorder to enable the events on button click  after 2s            
                if(i===animation.length-1){
                    setTimeout(()=>{
                        //removing sorting label
                        document.getElementById("currentsortinglabel").innerHTML=""
                        this.setState({isrunning:false})
                        },2000)
                }

            },(i+15)*SPEED)


    }

    }
    
}




//------------------------on change handler of child component for changing the size of array which is passed as props---------
onchangeHandler=(e)=>{
    this.setState({ARRAY_SIZE:e.target.value})
    this.resetArray()
}

//-------------------on change handler for speed of animation-------------------------
speedHandler=(e)=>{
    this.setState({SPEED:e.target.value})
}


//-------------------------------------------------RENDER FUNCTION-----------------------------------------------------------
    render() {

        const {array,width}=this.state;
        return (
            <>
            <div className="body-container">
               
                {array.map((value,idx)=>{
                    return(
                    <div  className="array-bar"style={{height:`${value}px`,width:`${width}px`}} key={idx}>
  
                    </div>)
                })}
            </div>
                {/* passing the isrunning state and all the click handler to the buttons component as props to handle with disable button*/}
            <div id="toolbar">
                <Buttons isrunning={this.state.isrunning} InsertionHandler={this.insertionSort}
                          bubleSortHandler={this.bubleSort}
                          selectionSortHandler={this.selectionSort}
                          resetArrayHandler={this.resetArray}
                          mergeSortHandler={this.mergeSort}
                          quickSortHandler={this.quickSort}
                          action={this.onchangeHandler}
                          speed={this.speedHandler}>

                </Buttons><span id="currentsortinglabel">  </span>     
                </div>       
            </>

        )
    }
}




//-----------------------GENERATE RANDOM INTEGER FUNCTION--------------
//-----------(REF:STACK OVERFLOW)---------
 function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default SortingVisualizer
