import { useState } from "react"


const useFormInput = (validatorFunction,init='')=>{
    const [inputValue,setInputValue] = useState(init);
    const [isValid,setIsValid] = useState(false);
    const [isTouched,setIsTouched] = useState(false);
    const [hasError,setHasError] = useState(false);
    const [helperText,setHelperText] = useState('');

    const inputValueBlur = (event)=>{
        setIsTouched(true);
        let {valid,helperData} = validatorFunction(event.target.value)
        setIsValid(valid);
        setHasError(!valid);
        setHelperText(helperData);
    }
    const inputValueChanged = (event)=>{
        setInputValue(event.target.value);
        let {valid,helperData} = validatorFunction(event.target.value)
        setIsValid(valid);
        setHasError(!valid);
        setHelperText(helperData);
    }
    const reset=()=>{
        setInputValue(init);
        setIsValid(false);
        setIsTouched(false);
        setHasError(false);
    }
    return {
        inputValue,
        isValid,
        isTouched,
        hasError,
        helperText,
        inputValueBlur,
        inputValueChanged,
        reset
    }
    
}

export default useFormInput