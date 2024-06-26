// Backend: app/routes/upload.ts
import fs from "fs/promises";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
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
    let formData = await unstable_parseMultipartFormData(
        request,
        unstable_composeUploadHandlers(
          unstable_createFileUploadHandler({
            // Store the images in the public/img folder
            directory: "./public/resumes",
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
            const filePath = `./public/resumes/${file.name}`;
            const newFileFolder = `./public/resumes/`;
            const newFilePath= `./public/resumes/${file.name}.json`;

            createDirectoryIfNotExists(newFileFolder);
            // Parse the resume file
            await parseResumeFile(filePath, newFileFolder); // Assuming parseResumeFile saves or logs parsed data
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

const createDirectoryIfNotExists = async (dirPath) => {
    try {
      await fs.mkdir(dirPath, { recursive: true }); // Create directory recursively
      console.log(`Directory '${dirPath}' created successfully.`);
    } catch (error) {
      console.error(`Error creating directory '${dirPath}':`, error);
    }
  };
