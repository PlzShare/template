import React, { Fragment, useEffect } from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
// import ExportWord from '@ckeditor/ckeditor5-export-pdf/src/exportword';
import axios from 'axios'

const DocumentEditor = () => {
    const createEditor = () => {
        DecoupledEditor
        .create( document.querySelector( '.document-editor__editable' ))
        // plugins: [ExportWord],
        // toolbar: ['exportWord'],
        // exportWord: {
        //     tokenUrl: 'https://85443.cke-cs.com/token/dev/b36f0967adc2a9ef93fb86ad31b7ab697af20355d37d2b59002710339dc4',
        //     fileName: 'my-file',
        //     converterOptions: {
        //         format: 'A4'
        //     }
        // }
        // cloudServices: {
        //     '
        // }
        .then( editor => {
            const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
            window['editor'] = editor;
        } )
        .catch( err => {
            console.error( err );
        } );
    }
    useEffect(createEditor, [])

    const save = () => {
        const testUrl = '/workspaces/1/channels/10/documents'
        axios.post(testUrl,{
            title:'test Title',
            contents:window.editor.getData(),
            channelNo: 10
        })
        console.log(window.editor.getData())        
    }

    return (
        <Fragment>
            <button className='btn-primary' onClick={save}>저장</button>
            <div className="document-editor">
                <div className="document-editor__toolbar"></div>
                <div className="document-editor__editable-container">
                    <div className="document-editor__editable">
                        <p>The initial editor data.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DocumentEditor;