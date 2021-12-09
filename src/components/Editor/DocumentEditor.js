import React, { useEffect } from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

const DocumentEditor = () => {

    const createEditor = () => {
        DecoupledEditor
        .create( document.querySelector( '.document-editor__editable' ))
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


    return (
        <div className="document-editor">
            <div className="document-editor__toolbar"></div>
            <div className="document-editor__editable-container">
                <div className="document-editor__editable">
                    <p>The initial editor data.</p>
                </div>
            </div>
        </div>
    );
};

export default DocumentEditor;