import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import './App.css';
import SocketIO from 'socket.io-client';

const socket = SocketIO('http://localhost:3001', {
    transports: ['websocket'],
});

function App() {

    const [text, setText] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on('push_data', (response) => {
            data.push(response.url);
            setData([...data]);
        });

    }, []);


    const sendData = () => {
        if (text != '')
        {
            socket.emit('send_data', {
                url : text
            });
            data.push(text);
            setData([...data]);
        }else{
            alert('Lütfen link giriniz.');
        }
    };

    return (
        <div>
            <div style={{marginTop:10,justifyContent:"center",display:"flex",alignItems:"center"}}>
                <input value={text} placeholder={'paylaşmak istediğiniz link'} style={{padding: 10, width: 300, borderRadius: 5, border: '1px solid #a5a5a5'}} type={text}
                       onChange={(event) => setText(event.target.value)}/>
                <button style={{padding: 10, border: '1px solid #ddd', borderRadius: 5, marginLeft: 5}}
                        onClick={sendData}>Gönder
                </button>
            </div>
            <div className="link-container">
                {data.map((item) =>(
                    <div className="link-item"><a href={item} target={"_blank"}>{item}</a> </div>
                ))}
            </div>
        </div>
    );
}

export default App;
