import React from 'react'

const InputComponent = ({inputItems,addInput,InputDelete,onChange,confirm}) => {
  return (
    <div>
    {inputItems && inputItems.map((item, index) => {
        return(
            <div>
            <div>{item.id}</div>
            <input
                name="one"
                type="text"
                defaultValue={item.one}
                onChange={(e) => onChange(e, item.id)}
                />
            <input
                name="two"
                type="text"
                defaultValue={item.two}
                onChange={(e) => onChange(e, item.id)}
                />
            {index === 0 && inputItems.length < 10 && (
                <button onClick={() => addInput()}> + </button>
            )}
            {index > 0 && inputItems[index - 1] ? (
                <button onClick={() => InputDelete(item.id)}> - </button>
            ) : (
                ""
            )}
            </div>  
        );
    })}
    <button onClick={()=> confirm()}></button>
    </div>
  );
};

export default InputComponent