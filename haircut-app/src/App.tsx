import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/esm/Alert';
import Spinner from 'react-bootstrap/esm/Spinner';
import './App.scss';
import FaceTypeSelection from './Components/FaceTypeSelection';
import GenderSelection from './Components/GenderSelection';
import HairTypeSelection from './Components/HairTypeSelection';
import HaircutRecommendation from './Components/HaircutRecommendation';
import './Styles/commons.scss';
import { useAppSelector } from './hooks/useAppSelector';
import useHaircutRequest, { THairRecommendation } from './hooks/useHaircutRequest';

function App() {
  const {
    isLoading,
    submitError,
    handleGetHairstyles,
    response,
  } = useHaircutRequest();

  const featureType = useAppSelector((state) =>  state.featureType);

  return (
    <>
      <div className='text-center mt-5 mb-3'>
        <h1>
          Need a new hairstyle? 
          <br/>
          Let me help you out!
        </h1>
      </div>
      {submitError && (
        <Alert className='m-3' variant='warning'>Select an option for both face shape and hair type!</Alert>
      )}

      <GenderSelection />
      <FaceTypeSelection />
      <HairTypeSelection />

      {!isLoading ? (
        <Button 
          onClick={() => handleGetHairstyles(featureType)} 
          className='mt-3 mb-5'
          variant='light'
          disabled={isLoading}  
        >
          {response ? (
            "Need more ideas? I gothca."
          ) : (
            "Generate Hairstyles!"
          )}
        </Button>
      ) : (
        <Spinner animation='border'/>
      )}

      {!!response && Object.keys(response).map((key) => (
        <HaircutRecommendation key={key} details={response[key as THairRecommendation]}/>
      ))}
    </>
  )
}

export default App
