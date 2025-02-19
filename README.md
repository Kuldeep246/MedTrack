# MedTrack Documentation
## 1. Project Overview
MedTrack is a Next.js application designed to help users manage and summarize their medical records. It provides a unified platform to store medical history, and leverages AI to generate summaries for easy access and understanding.
**Key Features:**
*   **User Authentication:** Secure sign-in and sign-up using NextAuth.js with Google Provider.
*   **Health Record Management:** Allows users to create, update, and delete medical entries.
*   **AI-Powered Summarization:** Utilizes Google's Gemini AI model to summarize medical records.
*   **Health Profile:** Users can store their health profile information, including allergies, blood type, and medical history.
*   **Dashboard:** Provides an overview of health records.
*   **Profile Page:** Displays user's health profile and summary.
**Supported Platforms/Requirements:**
*   Node.js (version specified in `package.json`)
*   npm or yarn (package manager)
*   Next.js
*   PostgreSQL database
*   Google Cloud API Key (for Gemini AI)
### Dependencies
The project relies on the following key dependencies:
*   **Next.js:** React framework for building web applications.
*   **Prisma:** ORM for database access.
*   **NextAuth.js:** Authentication library.
*   **Google Generative AI:** Google's AI model for text summarization.
*   **Tailwind CSS:** CSS framework for styling.
*   **Radix UI:** Set of unstyled, accessible UI primitives.
*   **Framer Motion:** Animation library.
*   **Lucide React:** Icon library.
## 2. Usage
### Adding a New Health Record
1.  Navigate to the `/dashboard` page.
2.  Click the "Add New File" button.
3.  Fill in the title and details of the health record in the dialog.
4.  Click the "Submit" button.
### Viewing Health Records
1.  Navigate to the `/dashboard` page.
2.  Click the "View" button on the card corresponding to the health record you want to view.
### Updating Health Profile
1.  Navigate to the `/profile` page.
2.  Click the "Upload" icon next to the "Health Profile" heading.
3.  Fill in the health profile information in the dialog.
4.  Click the "Submit" button.
### Generating a Summary
1.  Navigate to the `/profile` page.
2.  Click the refresh icon next to the "Summary" heading.
3.  The AI-generated summary will be displayed.

## 3. API Documentation
### Endpoints
*   **`/api/auth/[...nextauth]`**
    *   **Purpose:** Handles authentication using NextAuth.js.
    *   **Methods:** `GET`, `POST`
    *   **Authentication:** Requires a valid session.
*   **`/api/entries`**
    *   **Purpose:** Manages medical entries.
    *   **Methods:**
        *   `GET`: Retrieves all entries for the current user.
            *   **Response:**
                *   **Status:** `200 OK`
                *   **Body:** JSON array of entry objects.
                *   **Example:**
                    ```json
                    [
                      {
                        "id": "entry1",
                        "title": "Doctor's Visit",
                        "content": "Follow-up appointment",
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-01T00:00:00.000Z",
                        "userId": "user1"
                      }
                    ]
                            *   `DELETE`: Deletes a specific entry.
            *   **Query Parameters:**
                *   `id`: The ID of the entry to delete.
            *   **Response:**
                *   **Status:** `200 OK`
                *   **Body:** JSON object with a success message and the deleted entry.
                *   **Example:**
                    ```json
                    {
                      "message": "Entry deleted successfully",
                      "entry": {
                        "id": "entry1",
                        "title": "Doctor's Visit",
                        "content": "Follow-up appointment",
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-01T00:00:00.000Z",
                        "userId": "user1"
                      }
                    }
                            *   `PUT`: Updates a specific entry.
            *   **Request Body:**
                *   `id`: The ID of the entry to update.
                *   `data`: An object containing the fields to update (e.g., `title`, `content`).
            *   **Response:**
                *   **Status:** `200 OK`
                *   **Body:** JSON object with a success message and the updated entry.
                *   **Example:**
                    ```json
                    {
                      "message": "Entry updated successfully",
                      "entry": {
                        "id": "entry1",
                        "title": "Updated Doctor's Visit",
                        "content": "Updated follow-up appointment",
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-02T00:00:00.000Z",
                        "userId": "user1"
                      }
                    }
                        *   **Authentication:** Requires a valid session.
*   **`/api/gemini`**
    *   **Purpose:** Generates a summary of the user's medical records using Google's Gemini AI model.
    *   **Method:** `GET`
    *   **Response:**
        *   **Status:** `200 OK`
        *   **Body:** JSON object containing the summary.
        *   **Example:**
            ```json
            {
              "summary": "Summary of medical records."
            }
                *   **Authentication:** Requires a valid session.
*   **`/api/profile`**
    *   **Purpose:** Manages the user's health profile.
    *   **Methods:**
        *   `GET`: Retrieves the health profile for the current user.
            *   **Response:**
                *   **Status:** `200 OK`
                *   **Body:** JSON object containing the health profile data.
                *   **Example:**
                    ```json
                    {
                      "id": "profile1",
                      "height": 175,
                      "weight": 70,
                      "dob": "1990-01-01T00:00:00.000Z",
                      "allergies": "Pollen",
                      "bloodType": "O+",
                      "bloodSugarLevel": 90,
                      "medicalHistory": "No major issues",
                      "hasInsurance": true,
                      "userId": "user1"
                    }
                            *   `POST`: Creates or updates the health profile for the current user.
            *   **Request Body:** JSON object containing the health profile data.
            *   **Response:**
                *   **Status:** `201 Created`
                *   **Body:** JSON object containing the created/updated health profile data.
    *   **Authentication:** Requires a valid session.
*   **`/api/submit`**
    *   **Purpose:** Creates a new medical entry.
    *   **Method:** `POST`
    *   **Request Body:** JSON object containing the entry data (`title`, `content`).
    *   **Response:**
        *   **Status:** `201 Created`
        *   **Body:** JSON object containing the created entry.
    *   **Authentication:** Requires a valid session.
*   **`/api/summary`**
    *   **Purpose:** Retrieves the user's medical summary.
    *   **Method:** `GET`
    *   **Response:**
        *   **Status:** `200 OK`
        *   **Body:** JSON object containing the summary.
    *   **Authentication:** Requires a valid session.
*   **`/api/user`**
    *   **Purpose:** Retrieves user information.
    *   **Method:** `GET`
    *   **Response:**
        *   **Status:** `200 OK`
        *   **Body:** JSON object containing user id and name.
    *   **Authentication:** Requires a valid session.
### Example API Requests
*   **Get Entries:**
    ```bash
    curl -X GET http://localhost:3000/api/entries
    
