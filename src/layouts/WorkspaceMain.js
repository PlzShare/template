import React from 'react';
import '../assets/scss/components/workspacemain.scss';

const BlankPage = () => {
  return (
    <div>
        <div className='folder'>
                <div className='boxtop'></div>
                <div className='boxbody'>
                    <p> 채널 1</p>
                </div>
        </div>
        <div className='folder'>
            <div className='documentbody'>
            <div class='triangle'></div>
                    <p> 문서</p>
             </div>
        </div>
    </div>
  );
};

export default BlankPage;
