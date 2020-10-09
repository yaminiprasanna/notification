import React,{Component} from 'react'
// import axios from 'axios'
import {MdClear} from 'react-icons/md'; 
import {AiOutlineSave} from 'react-icons/ai'; 
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from './Dropdown';
import { ValidatorComponent } from 'react-form-validator-core';
// import Alert from 'react-bootstrap-Alert/';
import Alert from 'react-bootstrap/Alert';
import  {toast} from 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toaster from './Toaster'


class NotificationForm extends Component{
  constructor(props){
    super(props);
   this. state={
     name:'React',
      CategoryName:'',
      NotificationCode:'',
      NotificationCodeError:'',
      CategoryError: "",
      text:'update',
      show:true,
      showToaster:false
   
};

this.hideComponent = this.hideComponent.bind(this);
};

hideComponent(){
  
    this.setState({showToaster: !this.state.showToaster})
} 

validate=()=>{
  let NotificationCodeError=""
  if(this.props.code === ""){
     NotificationCodeError='Notification Type Required'
  }
  if(NotificationCodeError){
    this.setState({NotificationCodeError})
    return false;
  }
   return true;
}

validate1=()=>{
  let CategoryError=""
  if(this.props.selectedCategory === ""){
     CategoryError='Category Required'
  }
  if(CategoryError){
    this.setState({ CategoryError})
     return false;
  }
  return true;
}



//  alertshow=()=>{
//   let show=true;
//   if(show){
//     return(
//   <Alert  variant="success">
//         <Alert.Heading> Success</Alert.Heading>
//         <p>
//          Record Added Successfully
//         </p>
//         <hr />
       
//       </Alert>
//     )
//   }

// }

  handleNameChange=event=>{
   this.props.changeName(event.target.value);
  
  }
  handleCodeChange =event=>{
     this.props.changeCode(event.target.value);
  }
  handleDescChange=event=>{
    this.props.changeDescription(event.target.value);
  }
 
  
  handleSubmit = event => {
    
    event.preventDefault();
   

    let inputData=JSON.stringify({Id:null,CategoryMasterId:6,CategoryName:this.props.name,
                                  NotificationCode:this.props.code,
                                  NotificationDescription:this.props.description
    });
    console.log(inputData);

    let updateData=JSON.stringify({Id:19,CategoryMasterId:1,CategoryName:this.props.name,
      NotificationCode:this.props.code,
      NotificationDescription:this.props.description
});

    fetch('http://sg-srv-kas:2021/admin/api/v1/NotificationType/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        // We convert the React state to JSON and send it as the POST body
        body:inputData
      }).then(function(response) {
        console.log(response.json());
       
        // return response.json();
       
        const notify = () => toast.success("Record added Successfully");
       
        this.hideComponent();
       
     
        
      });

      fetch('http://sg-srv-kas:2021/admin/api/v1/NotificationType/Update ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        // We convert the React state to JSON and send it as the POST body
        body:updateData
      }).then(function(response) {
        console.log(response.json());
        // return response.json();
            });

      const isValid=this.validate();
      const isValid1=this.validate1();

      if(isValid && isValid1){
        console.log(this.state)
        console.log(this.state)
        
      }
     
     
      
  }
  clearForm = () => { 
   this.props.changeName('');
   this.props.changeCode('');
   this.props.changeDescription('');
    this.validate('');
  }

  render(){
    const { showToaster } = this.state;
    console.log(this.props);
     
       return(
      <form>
      <div className='icons'>
      <label className='drop'> 
           
      <Dropdown name="CategoryName"  value={this.props.name}  onChange={this.handleNameChange} 
        />
        <div style={{fontSize:'10',color:'red'}}>{this.state.CategoryError}</div>
        </label>
     
        <label for="code" className='lbl1'>Notification Type:<span class="required">* </span>      
          <input type="text"  name="NotificationCode"  value={this.props.code}  onChange={this.handleCodeChange}/>
         {this.state.NotificationCodeError? (<div style={{fontSize:'10',color:'red'}}>{this.state.NotificationCodeError}</div>):null}
          </label>
          <label for="description" class='lbl2'>NotificationDescription:
          
          <input type="text"  name="NotificationDescription"  value={this.props.description}  onChange={this.handleDescChange}/>
          </label>
          <div class="col-lg-12" className='btn-grp'>
          
          <button type="button" className="btn1"onClick={()=>this.handleSubmit}><AiOutlineSave/>save{this.props.buttonText}  </button>
          <button type="  button" name="clear" onClick={this.clearForm}><MdClear/>Clear</button>
          </div>
          </div>
          </form>
        
    )
  }
}



export default NotificationForm
