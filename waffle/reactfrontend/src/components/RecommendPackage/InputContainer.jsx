import React, {Component} from 'react';
import InputComponent from './InputComponent';

class InputContainer extends Component{
    constructor(props){
        super();
        this.state = {
            inputItmes: [
                {
                    id:0,
                    title:"",
                    one:"",
                    two:""      
                }
            ],
            inputAddId:1
        }
    }
    AddInput = () =>{
        const {inputItems, inputAddId} = this.state;
        const input = {
            id: inputAddId,
            title:"",
            one:"",
            two:"" 
        };

        this.setState({
            inputItems: inputItems.concat({
                ...input
            }),
            inputAddId: inputAddId + 1
        })
    };

    InputDelete = (id) => {
        const {inputItems} = this.state;

        this.setState(
            {
                inputItems: []
            },
            () => {
                this.setState({
                    inputItems: inputItems.filter((item) => item.id !== id)
                });
            }
        )
    };

    onChange = (e, id) => {
        const {inputItems} = this.state;

        const data = {
            [e.target.name]: e.target.value
        };

        this.setState({
            inputItems: inputItems.map((item) =>
            item.id === id ? {...item} : item)
        });
    };

    confirm = () => {
        const {inputItems} = this.state;

        console.log(inputItems)
    };

    render(){
        const {inputItems, inputAddId} = this.state;
   
  return (
    <div>
        <InputComponent
            inputItems={inputItems}
            addInput={this.AddInput}
            InputDelete={this.InputDelete}
            onChange={this.onChange}
            confirm={this.confirm}
        />
    </div>
    )
  }
}
export default InputContainer;