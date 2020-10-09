import React,{Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationForm from './NotificationForm';
import Table from './Table';
import { blueGrey } from '@material-ui/core/colors';


class Dropdown extends Component {
  constructor(props){
    super()
  };
  state = {
    categories: [],
    selectedCategory:'',
    validationError:''
}
 
 
  
  componentDidMount() {
    fetch(
      "http://sg-srv-kas:2021/admin/api/v1/CategoryMaster/GetAll"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let categoriesFromApi = data.map(category => {
          return { value:category.CategoryName , display: category.CategoryName };
        });
        this.setState({
          categories: [
            {
              value: "",
              display:
                " "
            }
          ].concat(categoriesFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
     
      <div classs="custom-select">
        <label>category:<span className='required'>*</span></label>
        
        <select  className='drop'   style={{backgroundColor:blueGrey}}
       
          
          onChange={e =>
            this.setState({
              selectedCategory: e.target.value,
            
              validationError:
                e.target.value === ""
                  ? "Category Required"
                  : ""
            })
          }
          value={this.state.selectedCategory}
        >

          {this.state.categories.map(category => (
            <option className='intro'
               key={category.value}
              value={category.value}
            >
              {category.display}
             
            </option>
          ))}
           
        </select>
       
       
        <div style={{fontSize:'10',color:'red'}}>{this.state.CategoryError}</div>
      </div>
    );
  }
}
export default Dropdown