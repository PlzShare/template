import ReactQuill from 'react-quill'
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'

const QuillEditor = () => {
    const [data, setData] = useState({text:''})
    
    const handleChange = (e, d, f) => {
        console.log('===========e==============')
        console.dir(e)
        console.log('===========d==============')
        console.dir(d)
        console.log('===========f==============')
        console.dir(f)
    }
    
    return (
        <div>
            <ReactQuill value={data}
                    onChange={handleChange}/>
        </div>
    );
};

export default QuillEditor;