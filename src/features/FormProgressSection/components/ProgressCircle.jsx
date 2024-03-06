

export default function ProgressCircle({index, currentStep, isSubmitted}) {
    return (
        <div className={"progress-circle" +
            (isSubmitted ? ' fill-circle' : 
                (index < currentStep ? ' accent-circle': '')) +
            
            (currentStep == index ? ' highlight-circle' : '')}
            ></div>
    )
}