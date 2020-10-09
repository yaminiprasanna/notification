import React, { useEffect,useState } from 'react'
// import axios from 'axios'
import paginationFactory from 'react-bootstrap-table2-paginator';
// import * as ReactbootStrap from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'; 
import NotificationForm from './NotificationForm' 
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {AiFillEdit} from 'react-icons/ai'; 
import {AiOutlineSearch} from 'react-icons/ai'; 
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { fontSize } from '@material-ui/system';




function Table(props){
    const[notifications,setNotifications]=useState([]);
    const [hasError, setErrors] = useState(false);
    const [categoryName, setActiveCategoryName]= useState("");
    const [notificationCode, setActiveNotificationCode]= useState("")
    const [ notificationDescription, setActiveNotificationDescription]= useState("")
    const [buttonText, setButtonText] = useState("update");
    
    const changeText = (text) => setButtonText(text);

    
    async function fetchData(){
        const res=await fetch('http://sg-srv-kas:2021/admin/api/v1/NotificationType/GetAll');
        //  console.log(res.json());
        res.json()
        .then(res=> {console.log(res);setNotifications(res)})
        .catch(err=>setErrors(err));    
          
   
    }

    
    
    
    const editButton = (cell, row, rowIndex, formatExtraData) => {
       
      return (
        // <Button
        //   onClick={() => {
        //     this.onFollowChanged(row);
        //   }}    
        // >

        //   Follow
        // </Button>
       
        <div className="icons">
        <button className='btn-primary'onClick={()=>{
           console.log('name',row['name'])
           console.log(row.NotificationCode)
           console.log(row.CategoryMaster.NotificationCode)
          setActiveCategoryName(row.CategoryMaster.CategoryName);
          setActiveNotificationCode(row.NotificationCode);
          setActiveNotificationDescription(row.NotificationDescription)
          changeText("newText")
               
          }
         
        }><AiFillEdit/></button></div>
      );
    };
  
    
    const columns=[
        {
            dataField:'CategoryMaster.CategoryName',
            text:'CategoryName',
            sort:true,
            filter: textFilter({
                placeholder: 'Search'
            })  
        },
        {
            dataField:'NotificationCode',
            text:'NotificationCode',
            sort:true,
            filter: textFilter({
                placeholder: 'Search'
            })                
        },
        {
            dataField:'NotificationDescription',
            text:'NotificationDescription',
            sort:true,
            filter: textFilter({
                placeholder: 'Search'
            })  
        },
        {
            dataField:'Edit',
            text:'Edit',
            formatter:editButton

        }
    ];

   
    const options = {  
        page: 2,   
        sizePerPageList: [ {  
          text: '5', value: 5  
        }, {  
          text: '10', value: 10  
        }, {
           text: 'All',value:notifications.length
        }
        ],   
        sizePerPage: 5,   
        pageStartIndex: 0,   
        paginationSize: 5,    
        prePage: 'Prev',   
        nextPage: 'Next',   
        firstPage: 'First',   
        lastPage: 'Last',   
        paginationPosition: 'bottom'    
      };  
      
        useEffect(() =>{
          fetchData();
},[]);

  


    return(    
        <div>
      <div className="Title">
        <header >
        <h3>Notification Type</h3>
        </header>
        </div>
        <NotificationForm 
           name={categoryName} changeName={setActiveCategoryName}
           code={notificationCode} changeCode={setActiveNotificationCode}
           description={notificationDescription} changeDescription={setActiveNotificationDescription}

           /> 
           <div><br></br></div>
           <div className="Title1">
        <header >
        
        </header>
        </div>

     

         <div className="container" > 
         
        {/* <div class="col-sm-12 btn btn-info">    
                Notification Type
                          </div>   

                          */}


                         <div  style={{ marginTop: 5 }}>  
    
                    <BootstrapTable
                    //  striped  
                    //     hover 
                        keyField="Id"
                        data={notifications}
                        columns={columns}
                        pagination={paginationFactory(options)}
                        filter={filterFactory() }                 
                        >
                     </BootstrapTable> 
                
        </div>
        </div>
        </div>
    )
}

export default Table