# What Could I Do More/Better?

## 1. API Key Management
- The Unsplash API key should never be stored directly in the repository in plain text.  
  It should be kept in system environment variables for better security.

## 2. API Request Optimization
- The Unsplash API has a request limit that can be reached quickly by scrolling fast.  
  A mechanism to throttle requests (e.g., limiting requests to one every 6 seconds) could be implemented.

## 3. Styling Improvements
- The current styling could be enhanced:
    - Better responsive design: Currently, the app displays 4 images per row on larger screens and 2 images per row on smaller screens.
    - While TailwindCSS was used for convenience, SCSS might offer better readability and maintainability for more complex projects.

## 4. State Management
- React Context was used instead of Redux, as Redux would be overkill for such a small project.  
  However:
    - React Context lacks local storage persistence across page refreshes.
    - To justify implementing persistence, image caching would also need to be added.

## 5. Error Handling
- API error responses could be mapped to more human-friendly messages, providing better control over the user experience.

## 6. Internationalization (i18n)
- All text could be incorporated into an i18n translation mechanism.  
  This would make translations to other languages faster and more error-free.

## 7. End-to-End (E2E) Testing
- Implementing E2E tests would be highly beneficial, as they mimic user interactions more comprehensively than unit tests.

## 8. Library Usage
- While I wrote a simple API request handler, the Unsplash-provided library ([unsplash-js](https://github.com/unsplash/unsplash-js)) could be utilized for better maintainability.  
  However, since only one request was needed, sticking with a custom solution made sense for this project.

