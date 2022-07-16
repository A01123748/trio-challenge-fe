import './App.css';
import syncButton from './syncButton.png';
import { useState } from 'react';
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN;

console.log(process.env.NODE_ENV, REACT_APP_BACKEND_URL, REACT_APP_API_TOKEN);

function App() {
  const [contacts, setContacts] = useState(0);
  const [sync, setSync] = useState(false);
  const [cursor, setCursor] = useState('pointer');
  const onClick = async () => {
    if(sync === false){
      document.body.style.cursor='wait';
      setCursor('wait');
      // Make API call and update contacs number
      const syncResponse = await axios.get(REACT_APP_BACKEND_URL, {headers: {Authorization: `Bearer ${REACT_APP_API_TOKEN}`}});
      if(syncResponse?.data){
        const {data} = syncResponse;
        setContacts(data.new_members + data.updated_members);
        setSync(true);
        document.body.style.cursor='default';
        setCursor('default');
        setTimeout(() => {
          setSync(false);
          setContacts(0);
          setCursor('pointer');
        },5000);
      }
      else{
        document.body.style.cursor='default';
        setCursor('pointer');
      }
    }
  };

  return (
    <div className="App">
      <div className="App-body">
        <img style={{animation: sync ? `spin 0.5s forwards` : ``, cursor}} className="sync-button" src={syncButton} text="sync" onClick={onClick} alt="sync-button"/>
        <p>{sync ? `${contacts} contacts were synced!` : "Sync Contacts" }</p>
      </div>
    </div>
  );
}

export default App;
