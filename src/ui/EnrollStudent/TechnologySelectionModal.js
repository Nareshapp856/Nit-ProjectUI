import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector"

function TechnologySelectionModal(){
    const submitHandler = () => {
        
    }

    return <div className="w-[20rem] h-[10rem] bg-red-400 z-10">
            <h1>Please A Select Technology and Module</h1>
            <div>
                <TechnologySelector />
            </div>
            <button onClick={submitHandler}>Submit</button>
        </div>
}

export default TechnologySelectionModal