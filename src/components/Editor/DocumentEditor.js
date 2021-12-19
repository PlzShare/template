import React, { Fragment, useEffect, useRef, useState } from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
import axios from 'axios'

const DocumentEditor = ({initDocumentData, callBackOnChange}) => {

    if(initDocumentData && window.editor){
    } 
    
    const createEditor = async () => {
        const editor = await DecoupledEditor.create( document.querySelector( '.document-editor__editable' ))
        const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
        toolbarContainer.appendChild( editor.ui.view.toolbar.element );        
        
        window['editor'] = editor;
        
        editor.model.document.on('change:data', (e, m) => {
            console.dir(e)
            console.dir(m)
        })

        // if(callBackOnChange){
        //     editor.model.document.on('change:data', () => {
        //         callBackOnChange();
        //     })
        // }
    }


    useEffect(() => {
        if(initDocumentData){
            window.editor.setData(initDocumentData.contents)
            document.getElementById('document-title').value = initDocumentData.title
        }
    },[initDocumentData])


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