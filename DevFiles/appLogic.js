/*---+++---JAVASCRIPT---+++---*/
//on load
function getMonitorWidth(){
    return screen.width
}

function getMonitorHeight(){
    return screen.height
}

function loadApplication(){
    resizeAppWindow(515, 345, 0, 0);

    /*---+++---EXCLUDED PART start EXCLUDED PART---+++---*/
        /*This code builds the single file HTML-Application
        when the dev-version is started. It hence exluded 
        from the build version.*/

        jsFile = "appLogic.js"
        vsbFile = "appLogiv.vbs"
        cssFile = "GUI_style.css"
        buildFile = "MyApp.hta"
        buildDirectory = "../Build/"

        function getGUI_html(filePath){
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var ForReading = 1;
            var codeFile = fso.OpenTextFile(filePath, ForReading);
            var codeAsString = codeFile.ReadAll();
            codeFile.close()
            return codeAsString
        }

        function embedJavaScript(codeAsString){

            return codeAsString;
        }

        function embedVBScript(codeAsString){
            return codeAsString;

        }

        function embedCSS(codeAsString){
            return codeAsString;

        }


        function deleteExcludedParts(codeAsString){
            return codeAsString;

        }


        function saveHTA_Build(varFilePath, text){
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var ForWriting = 2;
            var textFile = fso.OpenTextFile(varFilePath, ForWriting, true);
            textFile.write(text);
            textFile.close();

        }





    /*---+++---EXCLUDED PART start EXCLUDED PART---+++---*/


}

