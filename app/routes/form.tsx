import { useFetcher } from "@remix-run/react";
import { ResumeData } from "resume-parser";
import {getSession, commitSession} from "../utils/resume-session";

export default async function Index(request) {
  let { submit, isUploading, data, resume} = useFileUpload();
     // Fetch session data if `data` is not available
  const fetchSessionData = async () => {
    return await getSession(request.headers.get("Cookie"));
  };

  // Conditionally set resumeData based on whether `data` is available
  const resumeData = data || (await fetchSessionData());

  return (
    <div>
      <h1>Upload Your Resume</h1>
      <input type="file" name="resume" onChange={(event) => submit(event.currentTarget.files)}/>
         {isUploading ? <p>Parsing Resume...</p> : <p>Edit your resume, or upload a new resume</p>}
        {resumeData && (
            <form className="flex flex-col">
                {resumeData && getAllProps(JSON.parse(resumeData?.jsonData))}
                <button type="submit" className="button button--primary mr-auto mt-3">Update</button>
            </form>
        )}
    </div>
  );
}

function useFileUpload() {
    let { submit, data, state, formData } = useFetcher();
    let isUploading = state !== "idle";
  
    let uploadingFiles = formData
      ?.getAll("resume")
      ?.filter((value: unknown): value is File => value instanceof File)
      .map((file) => {
        let name = file.name;
        let url = URL.createObjectURL(file);
        return { name, url };
      });
  
    let resume = uploadingFiles ?? [];
  
    return {
      submit(files: FileList | null) {
        if (!files) return;
        let formData = new FormData();
        for (let file of files) formData.append("file", file);
        submit(formData, { method: "POST", encType: "multipart/form-data", action: "/upload" });
      },
      data,
      isUploading,
      resume,
    };
  }

  function handleExtractedData(data: ResumeData) {
    // convert comma separated lists to arrays
    // save to session storage
  }

  function getAllProps(obj : any) {  
     return Object.keys(obj).map(key => {
        return (
            <label htmlFor={key} key={key} className="flex flex-col">
                <span className="capitalize">{key}</span>
                {key === "name" || key === "email" || key === "phone" ? 
                (                <input key={key} type="text" name={key} defaultValue={obj[key]} />
                ) : (
                    <textarea key={key} name={key} defaultValue={obj[key]} />
                )
                }

            </label>
          );
      });  
  }