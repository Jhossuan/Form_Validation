import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
