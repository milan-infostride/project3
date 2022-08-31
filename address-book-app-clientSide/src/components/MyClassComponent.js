import { Component } from "react";

class MyClassComponent extends Component{
    constructor(){
        super();
        this.state = {
            names: [],
            count: 0,
            anotherValue: 0
        }
    }
    componentDidMount(){
        console.log('componentDidMount')

        let mynames = ['abc','xyz','wrf']
        this.setState({names:mynames,count:mynames.length});
    }
    shouldComponentUpdate(prevProp,prevState){
        console.log('shouldUpdate run')
        console.log(prevState);
        if(this.state.count==0)
            return true;
        if(prevState.anotherValue!=this.state.anotherValue)
            return true;
        return false;
    }
    addName(name){
        let names = this.state.names;
        let count = this.state.count;
        count++;
        names.push(name)
        this.setState({
            names: names,
            count: count
        })
    }
    incAnotherValue(){
        let anv = this.state.anotherValue;
        anv++;
        this.setState({
            anotherValue: anv
        })
    }
    render(){
        return (
            <div>
                names = {this.state.names.join(' and ')}<br />
                count = {this.state.count}<br />

                <button onClick={this.addName.bind(this,'ssd')}>Add Name</button>
                <br />
                another value = {this.state.anotherValue}<br /><br />
                <button onClick={this.incAnotherValue.bind(this)}>inc another value</button>
            </div>

        )
    }
    componentDidUpdate(prevProp,prevState){
        console.log('another value incremented');
    }
}
export default MyClassComponent;