import axios from "axios";
import { useState } from "react";

interface IHaircutDetails {
    haircutInstructions: string;
    haircutName: string;
    haircutStyling: string;
    hairLength: string;
}

interface IHairRecommendation {
    longHairRecommendation: IHaircutDetails
    mediumHairRecommendation: IHaircutDetails
    shortHairRecommendation: IHaircutDetails
}

export type THairRecommendation = keyof IHairRecommendation;

interface IFeatureType {
    gender: string;
    faceType: string;
    hairType: string;
  }
  
type TFeatureType = keyof IFeatureType;

const useHaircutRequest = () => {
    const [response, setResponse] = useState<IHairRecommendation | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleGetHairstyles = async (featureType: IFeatureType) => {
        setIsLoading(true);

        const unselectedFeatures = Object.keys(featureType).filter((key) => {
          return featureType[key as TFeatureType] === 'Select One';
        });

        if (unselectedFeatures.length != 0) {
            setSubmitError(true);
        } else {
            setSubmitError(false);
            
            await axios.post('/api/get-hair-recs', {
                ...featureType
            })
            .then((res) => {
                const configuredResponse = Object.keys(res.data).reduce((prev, key) => {
                    const currentHairDetail = res.data[key as THairRecommendation]

                    let newHairDetail;
                    if (key.indexOf('longHair') == 0) {
                        newHairDetail = {
                            ...currentHairDetail,
                            hairLength: "Long Hair"
                        }
                    } else if (key.indexOf('mediumHair') == 0) {
                        newHairDetail = {
                            ...currentHairDetail,
                            hairLength: "Medium Hair"
                        }
                    } else {
                        newHairDetail = {
                            ...currentHairDetail,
                            hairLength: "Short Hair"
                        }
                    }

                    return {
                        ...prev,
                        [key]: {
                            ...newHairDetail
                        }
                    }
                }, {} as IHairRecommendation) 

                setResponse(configuredResponse);
                console.log(configuredResponse)
          })
          .catch((error) => console.error(error));
        }

        setIsLoading(false);
      }

    return {
        isLoading,
        submitError,
        handleGetHairstyles,
        response,
    }
}

export default useHaircutRequest;
