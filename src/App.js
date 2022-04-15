import logo from './logo.svg';
import './App.css';
import './components/search-box/search-box.style.css';
import CardList from './components/card-list/card-list-component';
import { Component } from 'react';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {

 constructor() {
   super()
 
   this.state = {
    monsters:[],
    searchField:'',
    };
   }

   componentDidMount(){
     fetch('https://jsonplaceholder.typicode.com/users')
     .then((response) => response.json())
     .then((users)=> this.setState( () => {
       return { monsters:users};
     },
     ()=> {
       console.log(this.state);
     }
     
     ));
   }

   onSearchChange = (event)=> {console.log(event.target.value);
    const searchField =  event.target.value.toLocaleLowerCase();
    this.setState(()=> {
    return { searchField};
    });
    
    }
 
   

  render() {
    const {monsters , searchField} = this.state;
    const {onSearchChange} = this;
    const filteredNonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
     });
  return (
    <div className="App">
    <h1 className='app-title'>Monster Rolodex</h1>
    <SearchBox className='search-box' onChangeHandler ={onSearchChange} placeholder="Search Box" />
    
    <CardList monsters={filteredNonsters} />
    </div>
  );
}
}



export default App;
