import "./Upload.css"
import { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import 'flowbite';
import 'flowbite/dist/flowbite.js';


function UploadPage() {
    const [count, setCount] = useState(0)
  
    //<LandingPage/>

    const uploadDivRef = useRef<HTMLButtonElement>(null);
  

    function clicked(event : any) {
      event.preventDefault()

      const fileInput = document.getElementById('file') as HTMLInputElement;
      const titleInput = document.getElementById('title') as HTMLInputElement;
      const descInput = document.getElementById('desc') as HTMLInputElement;

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const userFile: File = fileInput.files[0];  
        const [title, description] = [titleInput.value, descInput.value];

    
        const formData = new FormData();
        formData.append('user_file', userFile);
        formData.append('user_title', title);
        formData.append('user_description', description);
          
        //data.form.user_title , data.form.user_file, data.form.user_description
        try {

            //PROBLEM WITH TOKEN PLEASE FIX LATER

            fetch('https://httpbin.org/post', {
              method: "POST",
              body: formData,
            })
            .then(res => res.json())
            .then(data => {
              //const headerData = JSON.stringify(data);
              //const headerFriendlyStr = Buffer.from(headerData, 'utf8').toString('base64');

              fetch(`/api/createNewPost/?Title=${data.form.user_title}&Desc=${data.form.user_description}&Img=${data.files.user_file}`)
                  .then((response) => {
                      if (!response.ok) {
                          throw new Error("Network response was not ok");
                      }
                      return response.json();
                  })
                  .then((d) => {
                        console.log(d)
                    })
                  .catch((error) => {
                        alert("Error occurred while creating user:" + error);
                    });
            })
            .catch(e => console.log(e))
          }
            catch (e) {
              console.log(e);
            }

        } else {
          console.log('Please select a file before uploading.');
        }
    }

  
    useEffect(() => {
      
    }, []);

    return (
      <div className="background p-0 m-0 pt-32">
        <div className="m-auto bg-gray-600 rounded-xl lg:w-[40vw] h-[70vh] md:w-[50vw] shadow-2xl">
          <form action="POST"  onSubmit={clicked}>
            <input type="file" id="file" accept=".png, .jpg" />
            <input type="text" id="title"></input>
            <input type="text" id="desc"></input>
            <button ref={uploadDivRef} type="submit">Upload File</button>
          </form>
        </div>
      </div>
    )
  }


export default UploadPage;