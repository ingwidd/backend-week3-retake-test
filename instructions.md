### ⚠️ Important Security Notice (StackBlitz Users)

If you are working on this task using StackBlitz, remember to delete your firebase.js file before submitting your code.

#### Why?

Your Firebase configuration contains sensitive credentials. When working on StackBlitz, these files can be publicly exposed, which may lead to security risks such as unauthorized access to your Firebase project.

### Before submission:

- Remove firebase.js

For in-person (IRL) classes, it is recommended to download the project and run it locally for better security.

### Replace Images in Firebase Storage 📸

#### Task:

Create a React component that allows users to upload a new image, replacing the existing one in Firebase Storage and display the updated image.

#### Instructions:

1. **Create a React Component:**

   - Display the current image from Firebase Storage.
   - Provide a file input to select a new image.
   - When a new image is selected, upload it to Firebase Storage, replacing the existing image.
   - Retrieve and display the updated image on the page.

2. **Firebase Setup:**

   - Ensure Firebase Storage is configured and initialized in the React project.
   - Ensure replacing an image works correctly and the display updates.

3. **Expected Interactions:**

   - **Display Current Image:**

     - The current image is shown on the page.

   - **Upload New Image:**
     - User selects a new image.
     - The new image replaces the previous one in Firebase Storage.
     - The updated image is displayed on the page.

**Files to Work On:** `Image.jsx` (React component for displaying and updating the profile picture)

4. **Testing the Component:**

   - Verify that the image displays correctly.
   - Verify that selecting a new image replaces the old image in Firebase Storage.
   - Verify that the displayed image updates to the new one.
   - Ensure invalid uploads are handled gracefully.

5. **Reference:**

   - React Form: https://www.w3schools.com/react/react_forms_submit.asp
   - Firebase Storage Upload Files: https://firebase.google.com/docs/storage/web/upload-files#upload_files
   - Firebase Storage Download Files: https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
