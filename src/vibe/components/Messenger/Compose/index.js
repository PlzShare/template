import React, {useRef} from 'react';
import './Compose.css';

export default function Compose(props) {
  const refForm = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();    
    try{
        const message = Array.from(e.target, (input) => {
            // simple validation
            if(input.value === '') {
                throw `validation ${input.placeholder} is empty`;
            }

            return {n: input.name, v: input.value};
        })
        .filter(({n}) => n !== '')
        .reduce((res, {n, v}) => { 
            res[n] = v;
            return res;
        }, {});
        
        // 보내고 나서 텍스트창 전부 리셋
        refForm.current.reset();
        props.callbackMessage.add(message);
    } catch (err) {
        console.error(err);
    }
  };

    return (
      <form
        ref={refForm}
        onSubmit={handleSubmit} 
        className="compose" >
          <input
            type={ 'text' }
            name={ 'message' }          
            placeholder={ '메세지 입력' } 
            className="compose-input"
          />

          {
            props.rightItems
          }

      </form>
    );
}