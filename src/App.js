import React, { useState } from 'react';
import './App.css'



// header component 
function Header(){
  return (
    <div className="header">
      <p>My Todo List</p>
      <p>React</p>
    </div>
  );
}

// InputBox

function InputBox({setLists, lists}){
  // Title + content
  
  const[list, setList] = useState('')
  const onChangeHandler = (event) => {
    const {name, value} = event.target;  //헷갈리는 부분..   
    
    setList({...list, [name]: value})   //{title: '', content: ''} : ...list  name 이라는 input이 가진 value값. 꼭, name일 필요는 없음. 참고: object가 요소를 가지고 오는 방법.
    //const newList = {
      // ...list,
      //content: 'value',
    // }
  }

  const addListHandler = (event) => {
    event.preventDefault();  //submit 버튼을 누를때마다 refresh되는것을 방지. 
    if (list === "") {
      return;
    }

    setLists((currentArray) => [...currentArray, list])
    setList('') // input 초기화.

  }
  
  return(
    <form onSubmit={addListHandler} className='form'>
      <label>
        제목
        <input className='input-box' onChange={onChangeHandler} type='text' name='title' value={list.title}/>
      </label>
      <label>
        내용
        <input className='input-box' onChange={onChangeHandler} type='text'name='body' value={list.body}/>
      </label>
      <button className='submit-btn'>
        추가하기
      </button>
    </form>
  )
}

// Channel > List

function Channel({lists, setLists}){

  const onDeleteHandler = (listId)  => {
    const newLists = lists.filter((list) => {
      return list.id !== listId
    })

    setLists(newLists)
  }

  const onEditHandler = (listId) => {
    const newLists = lists.map((list) => {
      if(list.id === listId){
        return {
          ...list,
          isDone: !list.isDon
        };
      } else {
        return { ...list }
      }
    })

    setLists(newLists);
  }
  
  return(
    <div>
      <h1 className='txt-title'>🎅🏼 To-Do List</h1>
      <div>
        {lists.map((list)=> {
          if (!list.isDone) {  //아직 안끝났다면? 
            return (
              <List
                list ={list}
                key ={list.id}
                onDeleteHandler={onDeleteHandler}
                onEditHandler={onEditHandler}
              />
            )
          } else {
            return null;
          }
        })}
      </div>
      <h2 className='txt-title'>🧤 Done</h2>
      <div>
        {lists.map((list) => {
          if (list.isDone) {
            return (
              <List
                list ={list}
                key ={list.id}
                onDeleteHandler={onDeleteHandler}
                onEditHandler={onEditHandler}
              />
            )
          } else {
            return null;
          }
        })}
      </div>
    </div>
  )
}

//Square Box

function List({list,onDeleteHandler, onEditHandler}){
  return(
    <div className="squareBox">
      <div className='squareBox-title'>
        <h3>{list.title}</h3>
        <h4>{list.body}</h4>
      </div>
      <div className='btns'>
        <button className='edit-btn' onClick={() => onEditHandler(list.id)}>
        {list.isDone ? "취소" : "완료"} 
        </button>
        <button className='delete-btn' onClick={() => onDeleteHandler(list.id)}>삭제하기</button>

      </div>
    </div>
  )
}

const Layout = (props) => {
  return <div className="wrapper">{props.children}</div>;
};



const App = () => {
  const [lists, setLists] = useState([
    {id:1, title:'건강하기', body:'챙겨먹기', isDone: false}
  ]);

  return (
    <Layout>
    {" "}
    <div>
      {/* header */}
      <Header/>
      {/* inputBox */}
      <InputBox lists={lists} setLists={setLists}/>
      {/* Channel */}
    
      <div>
        <Channel lists={lists} setLists={setLists}/>
      </div>
    </div>
    </Layout>
  );
};


export default App;