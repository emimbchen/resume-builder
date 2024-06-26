import { useFetcher } from "@remix-run/react";
import { ResumeData } from "resume-parser";
export default function Index() {
    let { submit, isUploading, data } = useFileUpload();
    const resumeData = data as ResumeData;
    if(resumeData){
        console.log(JSON.parse(resumeData?.jsonData))
    }
    let { name, email, phone, technology, experience, skills, education, objective, summary, languages } = resumeData ? JSON.parse(resumeData?.jsonData) : {};
  return (
    <div>
      <h1>Upload Your Resume</h1>
      <input type="file" name="resume" onChange={(event) => submit(event.currentTarget.files)}
 />
         {isUploading ? <p>Parsing Resume...</p> : <p>Edit your resume, or upload a new resume</p>}


      {resumeData && (
        <div>
          <h2>Extracted Data</h2>
          name: {name}
          <br/>
          <br/>

          email: {email}
          <br/>
          <br/>

          phone: {phone}
          <br/>
          <br/>

          objective: { objective || summary}
          <br/>
          <br/>

          technology: { technology }
          <br/>
          <br/>

          skills: { skills }
          <br/>
          <br/>

          experience: { experience }
          <br/>
          <br/>

          languages: { languages }
          <br/>
          <br/>
          education: { education }

        </div>
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
        // This line is important, this will create an Object URL, which is a `blob:` URL string
        // We'll need this to render the image in the browser as it's being uploaded
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