import React, { Component } from 'react';
import './Styling/Buttons.css'

export default class Buttons extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isrunning:false
        }
    }
    //recieving state props from parent and updating the state value
    componentWillReceiveProps(props) {
        this.setState({ isrunning: props.isrunning })
      }
    
    render() {
        //recieving all the props sent by parent
       let {isrunning}=this.state
       let {InsertionHandler,bubleSortHandler,selectionSortHandler,resetArrayHandler,mergeSortHandler,quickSortHandler}=this.props


       let color=isrunning?'red':'green '
       let cursor=!isrunning?'pointer':'auto'
        return (
            <>
            {/* range input element for ArraySize */}
            <span>Array Size:</span><input step="1" onChange={this.props.action} style={{cursor:cursor}} disabled={isrunning ? "disabled" : null} min="5" max="150" id="changesize" defaultValue="150" type="range"></input>
            
            <span>Delay</span><input step="1" id="speed" defaultValue="5" onChange={this.props.speed} style={{cursor:cursor}} disabled={isrunning ? "disabled" : null} type="range" min="1" max="100"></input>

            {/* calling the handler function based on the is running value
            isrunning becomes true after each onClick,if it is true onclick acts as null(ternery) */}
            <button style={{backgroundColor:color,cursor:cursor}} id="reset-btn" onClick={!isrunning?()=>{
                 return resetArrayHandler()}:null}>GENERATE NEW ARRAY</button>

             <button style={{backgroundColor:color,cursor:cursor}} id="bubblesort-btn" onClick={!isrunning?()=>{this.setState({isrunning:true})
                 return bubleSortHandler()}:null}>BUBBLE SORT</button>  

            <button style={{backgroundColor:color,cursor:cursor}} id="selectionsort-btn" onClick={!isrunning?()=>{this.setState({isrunning:true})
                 return selectionSortHandler()}:null}>SELECTION SORT</button>

            <button style={{backgroundColor:color,cursor:cursor}} id="insertionsort-btn" onClick={!isrunning?()=>{this.setState({isrunning:true})
                 return InsertionHandler()}:null}>INSETION SORT</button>

            <button style={{backgroundColor:color,cursor:cursor}} id="mergesort-btn" onClick={!isrunning?()=>{this.setState({isrunning:true})
                 return mergeSortHandler()}:null}>MERGE SORT</button> 

            <button style={{backgroundColor:color,cursor:cursor}} id="mergesort-btn" onClick={!isrunning?()=>{this.setState({isrunning:true}) 
                return quickSortHandler()}:null}>QUICK SORT</button> 
            
            </>
        )
    }
}
