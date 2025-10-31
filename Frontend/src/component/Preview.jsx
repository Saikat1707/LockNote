import React, { useEffect, useState } from 'react'
import "../css/component/Preview.css"
import { useAppContext } from '../ContextProvider'
import { fileDetails, updateFileContent } from '../BackendData'
import { toast } from 'react-toastify'


const Preview = () => {
  const { fileId } = useAppContext()
  const [fileData, setFileData] = useState({})
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log(fileId)
      if (!fileId){
        setErrorMessage("Open a File First")
        return
      }else setErrorMessage("")
      console.log("Fetching data for fileId:", fileId)
      const data = await fileDetails(fileId)
      console.log("Here is the file ",data?.data)
      if (data?.data) setFileData(data.data)
    }
    fetchData()
  }, [fileId])

  const handleSave = async ()=>{
    if(errorMessage){
      setErrorMessage("Notes Can not be saved")
      return
    }
    console.log(fileData)
    console.log(fileData?.fileContent)
    console.log(fileData?._id)
    try {
      const file = await updateFileContent(fileData?._id,fileData?.fileContent)
      if(!file) console.log("file not found")
      toast.success("Note Saved")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='PreviewMain'>
      <div className="previewHeading">
        <p>Preview</p>
        <button onClick={handleSave}>Save</button>
      </div>
      {errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <div className="previewTextArea">
            <textarea
              name="preview"
              id="preview"
              value={fileData?.fileContent || ""}
              onChange={(e) =>
                setFileData(prev => ({ ...prev, fileContent: e.target.value }))
              }
            ></textarea>
          </div>
        )}

    </div>
  )
}

export default Preview
