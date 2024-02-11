"use client"

import Trade from 'commons/models/trade';
import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

type WSMessage = {
    type: string;
    text: string;
    trade?: Trade;
}

function Toast() {

    const WSS_URL = `${process.env.WSS_URL}`;
    const [url, setUrl] = useState<string>(`${WSS_URL}?token=`);
    const [notification, setNotification] = useState<WSMessage>({} as WSMessage);

    useEffect(() => {
        setUrl(`${WSS_URL}?token=${localStorage.getItem("token")}`);
        if (!notification.text) return;
        //TODO: exibir o toast
    },[notification.text, notification.type, notification.trade]);

    const { lastJsonMessage } = useWebSocket(url, {
        onOpen: () => console.log(`WSS Connected`),
        onMessage: () => {
            console.log(lastJsonMessage);
            const data = lastJsonMessage as WSMessage;
            if (data && data.trade)
                setNotification(data);
        },
        onError: (evt) => {
            console.log(evt);
            setNotification({type: "error", text: JSON.stringify(evt) });
        },
        shouldReconnect: () => true,
        reconnectInterval: 3000
    })

    return (
        <>
            
        </>
    )
}

export default Toast;