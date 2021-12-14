import React, { Fragment, useEffect, useRef, useState } from 'react';
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
            editor.editing.document.on('change:data', (e, data, a3) =>{
                console.dir(e)
                console.dir(data)
                console.dir(a3)
            })
            console.log('등록!!!!')
        }
        
        window['editor'] = editor;
    }
    console.log('=======================================================================')
    useEffect(() => {
        if(window.editor) window.editor.destroy()
        createEditor()
    }, [])


    return (
        <Fragment>
            <div className="document-editor">
                <input id='document-title' type='text' placeholder='문서 제목' style={{fontWeight:'bold', fontSize:'16px', height: '8vh'}}></input>
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