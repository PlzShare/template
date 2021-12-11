import React, { Fragment, useEffect, useState } from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
// import ExportWord from '@ckeditor/ckeditor5-export-pdf/src/exportword';
import axios from 'axios'

const DocumentEditor = ({initDocumentData, callBackOnChange}) => {
    initDocumentData && window.editor && window.editor.setData(initDocumentData.contents)
  

    const createEditor = async () => {
        const editor = await DecoupledEditor.create( document.querySelector( '.document-editor__editable' ))
        console.log(editor)
        const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
        
        console.log(callBackOnChange)
        if(callBackOnChange){
            editor.model.document.on('change:data', (e) =>{
                console.dir(e)
            })
        }
        
        window['editor'] = editor;
        
        // DecoupledEditor.create( document.querySelector( '.document-editor__editable' ))
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
        // .then( editor => {
        //     const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
        //     toolbarContainer.appendChild( editor.ui.view.toolbar.element );
        //     window['editor'] = editor;
        // } )
        // .catch( err => {
        //         console.error( err );
        //     } );
        console.log('crated editor')
    }
    console.log('=======================================================================')
    useEffect(() => {
        createEditor()
    }, [])


    return (
        <Fragment>
            <div className="document-editor">
                <div className="document-editor__toolbar"></div>
                <div className="document-editor__editable-container">
                    <div className="document-editor__editable">
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DocumentEditor;