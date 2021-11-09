import { useEffect, useState } from 'react'
import { projectStorage } from '../firebase/firebaseConfig'
import { uuid } from 'uuidv4';

const useStorage = (file, filename) => {
  const [progress, setProgress] = useState(0)  
  const [error, setError] = useState(null)  
  const [url, setUrl] = useState(null)
  useEffect(()=>{
    if(!file){
       return
    }
    const storageRef = projectStorage.ref(filename)
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred/snap.totalBytes * 100)
      setProgress(percentage)
    }, (err) =>{
      setError(err)
    },
    async () => {
      const url = await storageRef.getDownloadURL()
      setUrl(url)
    })
  }, [file])

  return ( { progress, url, error } );
}
 
export default useStorage;