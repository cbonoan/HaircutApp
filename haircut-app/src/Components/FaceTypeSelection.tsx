import Dropdown from "react-bootstrap/Dropdown";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { changeFaceType } from "../store/slices/FeatureTypeSelection";
import '../Styles/FeatureTypeSelection.scss';

const faceShapes = [
    "Diamond", 
    "Heart", 
    "Oblong", 
    "Oval", 
    "Round", 
    "Square", 
    "Triangular"
];

const FaceTypeSelection = () => {
    const faceShape = useAppSelector((state) => state.featureType.faceType);
    const dispatch = useAppDispatch();

    return  (
        <div className="feature-type-container">
            <span>My face shape is</span>
            <Dropdown>
                <Dropdown.Toggle variant='secondary'>
                {faceShape}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {faceShapes.map((faceShape, idx) => (
                    <Dropdown.Item key={idx} onClick={() => dispatch(changeFaceType(faceShape))}>
                    {faceShape}
                    </Dropdown.Item>
                ))}
                </Dropdown.Menu>

            </Dropdown>
        </div>
    )
}

export default FaceTypeSelection;