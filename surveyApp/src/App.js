import './App.css';
import { StyledMainCard } from './Components/MainCard-style';
import { useState } from "react";
import { StyledLoading } from './Components/Loader-style'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [userID, setUserID] = useState('0')
  let mockURL = "http://localhost:8000/questions"

  window.addEventListener('message', function(event) {
    if (event.data.source === "survey-parent" ) {
      setUserID(event.data.value)
      setIsLoading(false);
    }
  }, false);

  console.log('App: ', isLoading, userID)
  return (
      
      <div className='main-div'>
        {isLoading && <StyledLoading></StyledLoading>}
        {!isLoading && <StyledMainCard url={mockURL} userID={ userID }></StyledMainCard>}
      </div>
  );
}

export default App;
