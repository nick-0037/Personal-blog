# Personal blog

This is personal blog project that includes an admin panel managing articles. The application allows you to add, edit, and delete articles through a form-based management system.
https://roadmap.sh/projects/personal-blog

## features

- Add Articles: Create new articles by entering a title, content, and date.
- Edit Articles: Update the details of existing articles.
- Delete Articles: Quickly remove articles with a confirmation prompt.

## Technologies Used
- Back-end: Node.js and Express
- Templating Engine: EJS for dynamic view rendering
- Styling: CSS for customizing views, with both global and view-specific styles (e.g., add, edit, admin pages).

## Installation 

1. Clone the repository, navigate to the project directory, and install dependecies:
  ```bash
  git clone https://github.com/your-username/personal-blog-admin.git
  cd personal-blog
  npm install
  ```

2. Run to application:
  ```bash
  npm start // localhost:3000
  ```

## Usage 

- Add an Article: To add a new article, navigate to the /admin page and click on the "Add" button. You will be redirected to a form where you can fill out the details for the new article.
- Edit an Article: To edit an existing article, go to the /admin page and find the article you want to update. Click the "Edit" button next to the article. This will redirect you to a form where you can modify the title, date, or content. Once you have made the necessary changes, click "Update" to save your edits.
- Delete an Article: Navigate to the /admin page where you will see a list of articles. Click the "Delete" button next to the article you wish to remove. This will permanently delete the selected article.
