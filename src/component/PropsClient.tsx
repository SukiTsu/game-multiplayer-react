import { useEffect, useRef, useState } from 'react';


interface player {
    pseudo:string
    ready:boolean
}

interface PropsClient {
    players : typeof useState<player[]>;
    socketRef: typeof useRef<WebSocket | null>;
}

export default PropsClient