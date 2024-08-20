import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './App.scss';
import FaceTypeSelection from './Components/FaceTypeSelection';
import HairTypeSelection from './Components/HairTypeSelection';
import './Styles/commons.scss';
import { useAppSelector } from './hooks/useAppSelector';

function App() {
  const featureType = useAppSelector((state) =>  state.featureType);
  const [submitError, setSubmitError] = useState(false);

  const handleGetHairstyles = () => {
    if (featureType.faceType === 'Select One' || featureType.hairType === 'Select One') {
      setSubmitError(true);
    } else {
      setSubmitError(false);
      console.log(featureType);

      axios.get('/api/test')
      .then((res) => console.log(res));
    }
  }

  return (
    <>
      {submitError && (
        <Alert variant='warning'>Select an option for both face shape and hair type!</Alert>
      )}
      <FaceTypeSelection />
      <HairTypeSelection />

      <Button onClick={handleGetHairstyles}>Generate Hairstyles!</Button>
    </>
  )
}

export default App
