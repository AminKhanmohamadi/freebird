# 🕊️ FreeBird
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
## Free OpenSource Cloud Storage 
An open source cloud storage space such as Google Drive and Mega.

![Alt text](https://raw.githubusercontent.com/kiahamedi/FreeBird/main/Screenshot_account.jpeg "Optional title")

![Alt text](https://raw.githubusercontent.com/kiahamedi/FreeBird/main/Screenshot_upload.jpeg "Optional title")

## ✨ Features

- 💾 Unlimited storage space 
- 📁 Comprehensive file operations (create folders, upload files)
- 🕙 Support Recent files
- 🖥️ Shared files with another user
- 🔒 Shared files with secure  link
- 🏗️ Support Starred option
- ✅ Support actions multi files
- 🗑️ Support Trash option
- 👤 Special Profile for any users
- 🔄 Connections with Ajax and JWT

## 🛠️ Installation

1. Clone this repository:
   ```
   git clone https://github.com/kiahamedi/FreeBird.git
   cd FreeBird
   ```

2. Set up the virtual environment for code execution:
   Engineer will create a virtual environment to run code the first time it executes a piece of code.
   This is just for you if you want to run the main script in a virtual environment rather than in your default one.
   ```
   python -m venv code_execution_env
   source code_execution_env/bin/activate  # On Windows, use: code_execution_env\Scripts\activate
   pip install -r requirements.txt
   deactivate
   ```

3. Build Database:
   ```
   python manage.py migrate
   ```


## 🚀 Usage

Run the manage.py to start the FreeBird interface:

```
python manage.py runserver
```
```
Django version 5.0.6, using settings 'config.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

and go `http://127.0.0.1:8000/`


