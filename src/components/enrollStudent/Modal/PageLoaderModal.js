import {useState, useEffect} from 'react'
import {Button} from '@mui/material'

function PageLoaderModal({setSelectedTechnology, technologyList, setSelectedModule, moduleList}){
    const [modalOpen, setModalOpen] = useState(true)

    return <>{modalOpen && <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-80 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4 text-center">Select a Technology and Module</h2>
      <div className="mb-4">
        <p className="mb-1">Technology</p>
        <select
          className="border rounded-md px-3 py-2 w-full"
          onChange={(e) => { setSelectedTechnology(e.target.value) }}
        >
          <option>Select A Technology</option>
          {technologyList.map((ele) => (
            <option key={ele.id} value={ele.value}>
              {ele.option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <p className="mb-1">Module</p>
        <select
          className="border rounded-md px-3 py-2 w-full"
          onChange={(e) => { setSelectedModule(e.target.value) }}
        >
          <option>Select A Module</option>
          {moduleList.map((ele) => (
            <option key={ele.id} value={ele.value}>
              {ele.option}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={() => setModalOpen(false)} variant="contained">Submit</Button>
    </div>
  </div>}</>
}

export default PageLoaderModal