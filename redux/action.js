export const LOGIN = 'LOGIN'
export const LOADING = 'LOADING'
export const LOGIN_ERR = 'LOGIN_ERR'
export const SET_TODO_REQ = 'SET_TODO_REQ'
export const SET_TODO = 'SET_TODO'
export const SET_TODO_ERR = 'SET_TODO_ERR'
export const GET_TODOS_REQ = 'GET_TODOS_REQ'
export const GET_TODOS = 'GET_TODOS'
export const GET_TODOS_ERR = 'GET_TODOS_ERR'
export const GET_TASK_REQ = 'GET_TASK_REQ'
export const GET_TASK = 'GET_TASK'
export const GET_TASK_ERR = 'GET_TASK_ERR'
export const DONE_REQ = 'DONE_REQ'
export const DONE = 'DONE'
export const DONE_ERR = 'DONE_ERR'
export const GET_DONE_REQ = 'GET_DONE_REQ'
export const GET_DONE = 'GET_DONE'
export const GET_DONE_ERR = 'GET_DONE_ERR'
export const GET_DONE_SCREEN_REQ = 'GET_DONE_SCREEN_REQ'
export const GET_DONE_SCREEN = 'GET_DONE_SCREEN'
export const GET_DONE_SCREEN_ERR = 'GET_DONE_SCREEN_ERR'
export const NO_DONE_REQ = 'NO_DONE_REQ'
export const NO_DONE = 'NO_DONE'
export const NO_DONE_ERR = 'NO_DONE_ERR'
export const NODONE_REQ = 'NODONE_REQ'
export const NODONE = 'NODONE'
export const NODONE_ERR = 'NODONE_ERR'

import { AsyncStorage } from 'react-native';

export const GetTodoAction = () =>async dispatch => {
    dispatch({type:GET_TODOS_REQ});
    try{        
        let noDone,todos;
        if(await AsyncStorage.getItem('todo')===null){
            todos=[]
        }else{
            todos = JSON.parse(await AsyncStorage.getItem("todo"));
        }

        const todoActive = todos.filter(todo=>new Date(todo.date)-new Date()>=0)
        const notActive = todos.filter(todo => new Date(todo.date)- new Date()<0)

        if(await AsyncStorage.getItem('nodone')===null){
            noDone = []
        }else{
            noDone = JSON.parse(await AsyncStorage.getItem('nodone'))
        }
        const filtered = [...noDone, ...notActive]
        await AsyncStorage.setItem('todo', JSON.stringify(todoActive))
        await AsyncStorage.setItem('nodone', JSON.stringify(filtered));
        dispatch({type:GET_TODOS, payload: todoActive})
        dispatch(noDoneAction());

    }catch(err){
        dispatch({type: GET_TODOS_ERR, payload: err})
    }
}

export const getTaskAction = (id) =>async dispatch => {
    dispatch({type:GET_TASK_REQ});
    try{        
        const todos = JSON.parse(await AsyncStorage.getItem("todo"));
        const todo = todos.find(element => element.id === id)
        dispatch({type:GET_TASK, payload: todo})

    }catch(err){
        dispatch({type: GET_TASK_ERR, payload: err})
    }
}
export const LoginAction = (name, navigation) =>async dispatch => {
    dispatch({type:LOADING});
    try{        
        await AsyncStorage.setItem('name',name);
        dispatch({type:LOGIN})
        navigation.navigate('Start')

    }catch(err){
        dispatch({type: LOGIN_ERR, payload: err})
    }
}

export const TodoAction = (todo, navigation) => async dispatch =>{
    dispatch({type:SET_TODO_REQ});
    try{
        let todos ;

        if (await AsyncStorage.getItem("todo") === null) {
            todos = [];
        } else {
            todos = JSON.parse(await AsyncStorage.getItem("todo"));
        }
        if(todo){

            todos.push(todo);
        }
        await AsyncStorage.setItem("todo", JSON.stringify(todos));

        dispatch({type:SET_TODO, payload: todos});

        dispatch(GetTodoAction())

        navigation.navigate('Home')
    }catch(err){
        dispatch({type:SET_TODO_ERR})
    }
}

export const doneAction = (id, navigation) =>async dispatch => {
    
    dispatch({type:DONE_ERR});
    try{        
        const todos = JSON.parse(await AsyncStorage.getItem('todo'));
        const filterTodo = todos.filter(todo=>todo.id!==id);
        
        const doneTodo = todos.filter(todo=>todo.id===id)

        doneTodo[0].date = new Date()

        await AsyncStorage.setItem('todo', JSON.stringify(filterTodo))

        let done;
        if(await AsyncStorage.getItem('done')===null){
            done = []
            
        }else{
            done = JSON.parse(await AsyncStorage.getItem('done'))
        }
        done = [...done,...doneTodo]
        await AsyncStorage.setItem('done',JSON.stringify(done))

        dispatch({type:DONE})
        navigation.navigate('Home')
        dispatch(GetTodoAction())
        dispatch(getDoneAction())

    }catch(err){
        dispatch({type: DONE_ERR, payload: err})
    }
}

export const getDoneAction = () =>async dispatch => {

    dispatch({type:GET_DONE_REQ});
    try{        
        let done;
        if(await AsyncStorage.getItem("done")===null){
            done=[]
        }else{
            done = JSON.parse(await AsyncStorage.getItem("done"));
        }
        dispatch({type:GET_DONE, payload: done})

    }catch(err){
        dispatch({type: GET_DONE_ERR, payload: err})
        console.log(err);
    }
}

export const getDoneScreenAction = (id) =>async dispatch => {
    dispatch({type:GET_DONE_SCREEN_REQ});
    try{        
        const dones = JSON.parse(await AsyncStorage.getItem("done"));
        const done = dones.find(element => element.id === id)
        dispatch({type:GET_DONE_SCREEN, payload: done})

    }catch(err){
        dispatch({type: GET_DONE_SCREEN_ERR, payload: err})
    }
}
export const noDoneAction = () =>async dispatch => {
    dispatch({type:NO_DONE_REQ});
    try{        
        let nodones;
        if(await AsyncStorage.getItem("nodone")===null){
            nodones=[]
        }else{
            nodones = JSON.parse(await AsyncStorage.getItem("nodone"))
        }
        dispatch({type:NO_DONE, payload: nodones})

    }catch(err){
        dispatch({type: NO_DONE_ERR, payload: err})
    }
}

export const getNodoneAction = (id) =>async dispatch => {
    dispatch({type:NODONE_REQ});
    try{        
        const nodones = JSON.parse(await AsyncStorage.getItem("nodone"));
        const nodone = nodones.find(element => element.id === id)
        dispatch({type:NODONE, payload: nodone})

    }catch(err){
        dispatch({type: NODONE_ERR, payload: err})
    }
}