import Dropdown from "react-bootstrap/Dropdown";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { changeHairType } from "../store/slices/FeatureTypeSelection";
import '../Styles/FeatureTypeSelection.scss';

const hairTypes = [
    "1A",
    "1B",
    "1C",
    "2A",
    "2B",
    "2C",
    "3A",
    "3B",
    "3C",   
];

const HairTypeSelection = () => {
    const hairType = useAppSelector((state) => state.featureType.hairType);
    const dispatch = useAppDispatch();

    return  (
        <div className="feature-type-container">
            <span>My hair type is</span>
            <Dropdown>
                <Dropdown.Toggle variant='secondary'>
                {hairType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {hairTypes.map((hairType, idx) => (
                    <Dropdown.Item key={idx} onClick={() => dispatch(changeHairType(hairType))}>
                    {hairType}
                    </Dropdown.Item>
                ))}
                </Dropdown.Menu>

            </Dropdown>
        </div>
    )
}

export default HairTypeSelection;