import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Channel = ({match}) => {
    const [channelList, setChannelList] = useState([])
    
    console.dir(channelList)
    
    const fetchList = async () => {
        const testUrl = `workspaces/2/channels/${match.params.no}/documents`
        const response = await axios.get(testUrl)
        setChannelList(response.data.data)
    }

    useEffect(() => {
        fetchList()
    }, [])
    
    return (
        <div>
            asd
        </div>
    );
};

export default Channel;