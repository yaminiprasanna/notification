import React from 'react';
import logo from './logo.svg';
import './App.css';
import NotificationForm from './components/NotificationForm';
import Dropdown from './components/Dropdown';
import Table from './components/Table'
// import Search from './components/Search'
import  {toast} from 'react-toastify/dist/ReactToastify.css';
import { useToasts } from 'react-toast-notifications'
import Toaster from './components/Toaster'


function App() {
 
  return (
     <div className="App">  
     <Table/>
     {/* <Search/> */}
    
     
    </div>
  );
}

export default App;
