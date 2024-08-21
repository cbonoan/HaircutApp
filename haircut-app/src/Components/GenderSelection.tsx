import Dropdown from "react-bootstrap/Dropdown";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { changeGenderType } from "../store/slices/FeatureTypeSelection";
import '../Styles/FeatureTypeSelection.scss';

const genders = [
    "Male",
    "Female",
    "Non-binary",   
];

const GenderSelection = () => {
    const gender = useAppSelector((state) => state.featureType.gender);
    const dispatch = useAppDispatch();

    return  (
        <div className="feature-type-container">
            <span>I identify as</span>
            <Dropdown>
                <Dropdown.Toggle variant='secondary'>
                {gender}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {genders.map((gender, idx) => (
                    <Dropdown.Item key={idx} onClick={() => dispatch(changeGenderType(gender))}>
                    {gender}
                    </Dropdown.Item>
                ))}
                </Dropdown.Menu>

            </Dropdown>
        </div>
    )
}

export default GenderSelection;