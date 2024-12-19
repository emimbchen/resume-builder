// Backend: app/routes/upload.ts
import fs from "fs/promises";
import type { ActionFunction } from "react-router";
import {parseResumeFile} from 'resume-parser';

import {
    json,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData,
    unstable_createFileUploadHandler,
    unstable_composeUploadHandlers,
  } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
    const tempFolder = `./public/`;

    let formData = await unstable_parseMultipartFormData(
        request,
        unstable_composeUploadHandlers(
          unstable_createFileUploadHandler({
            directory: tempFolder,
            avoidFileConflicts: false,
            file({ filename }) {
              return filename;
            },
            maxPartSize: 10 * 1024 * 1024,
          }),
          unstable_createMemoryUploadHandler(),
        ),
      );
      let file = formData.get("file");

      try {
        if (!file) {
          return json({ error: "No file uploaded" }, { status: 400 });
        }
        const filePath = `${tempFolder}${file.name}`;
        const newFilePath= `${tempFolder}${file.name}.json`;
        // Parse the resume file
        await parseResumeFile(filePath, tempFolder); // Assuming parseResumeFile saves or logs parsed data
        const jsonData = await fs.readFile(newFilePath, 'utf-8');
        // Example: Delete the uploaded file after processing
        await fs.unlink(filePath);
        await fs.unlink(newFilePath); // Assuming parsed data is saved in another file

        // Respond with parsed resume data
        return json({ jsonData });

      } catch (error) {
        console.error('Error processing file:', error);
        return json({ error: "Error processing file: " + error }, { status: 500 });
      }
      
    
};