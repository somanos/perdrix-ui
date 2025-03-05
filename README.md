# liceman
# Getting started
## Update server code from branch code-review
* https://gitlab.drumee.in/drumee/server/-/tree/code-review

## Setup Electron devlopment mode
This step is not mandatory, but if you use Electron from production mode you won't be able to be reachable by conference or chat

## You will have to work on your LOCAL computer
* Start Electron and login into your Drumee Dev environment
* Open the link https://drumee.io/_/#/desk/wm/open/nid=6d66e64c6d66e65c&hub_id=6bb30fde6bb30fe7&kind=window_website&filetype=hub
* Use a right-click on your folder, then select "See Local Version"
* Get the file path from the local folder and use it as shell environment variable, i.e :
* export LICEMAN_BUILD_DIR=/your/local/path/
* It's recommanded to save this variable in your shell rc file
## Clone from gitlab
* On your LOCAL dev env
* git clone git@gitlab.drumee.in:drumee/reseller.git
* cd reseller
* npm i
* npm run dev

## Check debug your branch
* Configure your browser to disable cache on dev mode
* load the page https://reseller.drumee.io/[your-dev-ident].html
