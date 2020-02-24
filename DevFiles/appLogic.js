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

        htmlFile = "buildAndTest.hta"
        jsFile = "appLogic.js"
        vbsFile = "appLogic.vbs"
        cssFile = "GUI_style.css"
        buildFile = "MyApp.hta"
        buildDirectory = "../Build/"

        //note that the string are split so that their are not interpreted as 
        //actuall placeholders when the code reads and adjusts itself.
        placeHolderEnd_JS = "/*---+++---PLACEHOLDER" + " end " + "JAVASCRIPT---+++---*/";
        placeHolderEnd_VBS = "'*---+++---PLACEHOLDER" + " end " + "VBSCRIPT---+++---*";
        placeHolderEnd_CSS = "/*---+++---PLACEHOLDER" + " end " + "CSS-FORMATING---+++---*/";
        excludeStart_JS = "/*---+++---EXCLUDED PART" + " start " + "EXCLUDED PART---+++---*/";
        excludeEnd_JS = "/*---+++---EXCLUDED PART" + " end " + "EXCLUDED PART---+++---*/";
        excludeStart_HTML = "<!---+++---EXCLUDED PART" + " start " + "EXCLUDED PART---+++--->";
        excludeEnd_HTML = "<!---+++---EXCLUDED PART" + " end " + "EXCLUDED PART---+++--->"

        //try building a single file HTML-Application
        //try{
            //get the HTML code
            htmlGUI = getCodeAsText(htmlFile)
            //add embeded Javascript code
            jsCode = getCodeAsText(jsFile);
            htmlGUI_JS = insertStringAt(placeHolderEnd_JS, htmlGUI, jsCode);
            //add embeded VBScript code
            vbsCode = getCodeAsText(vbsFile);
            htmlGUI_JS_VBS = insertStringAt(placeHolderEnd_VBS, htmlGUI_JS, vbsCode);
            //add embeded CSS code
            cssCode = getCodeAsText(cssFile);
            htmlGUI_JS_VBS_CSS = insertStringAt(placeHolderEnd_CSS, htmlGUI_JS_VBS, cssCode);
            //add exclude code marked to be omitted
            htmlGUI_JS_VBS_CSS_excluded_JS_parts = deleteExcludedParts(htmlGUI_JS_VBS_CSS, excludeStart_JS, excludeEnd_JS)
            htmlGUI_JS_VBS_CSS_excluded_JS_HTML_parts = deleteExcludedParts(htmlGUI_JS_VBS_CSS_excluded_JS_parts, excludeStart_HTML, excludeEnd_HTML)
            //adjust any remaining references to external files
            htmlGUI_JS_VBS_CSS_excluded_JS_HTML_parts = htmlGUI_JS_VBS_CSS_excluded_JS_HTML_parts.replace("src=\"myPicture.png\"","src=\"../DevFiles/myPicture.png\"")
            //save the single file HTML-Application
            saveFile(buildDirectory+buildFile, htmlGUI_JS_VBS_CSS_excluded_JS_HTML_parts)

        //} catch(e){
        //    alert("Error while building HTA-file: "+ e)
        //}

        function getCodeAsText(filePath){
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var ForReading = 1;
            var codeFile = fso.OpenTextFile(filePath, ForReading);
            var codeAsString = codeFile.ReadAll();
            codeFile.close();
            return codeAsString;
        }

        function insertStringAt(atString, mainString, insertString){
            var index = mainString.indexOf(atString);
            var stringOne = mainString.slice(0,index -1);
            var stringTwo = insertString;
            var stringThree = mainString.slice(index, mainString.length);
            var adjustedString = stringOne + stringTwo + stringThree; 
            return adjustedString;
        }

        function deleteExcludedParts(string, start, end){
            var indexStart = string.indexOf(start);
            var indexEnd = string.indexOf(end) + end.length;
            var stringOne = string.slice(0, indexStart -1);
            var stringTwo = string.slice(indexEnd, string.length);
            var adjustedString = stringOne + stringTwo;
            return adjustedString;
        }

        function saveFile(filePath, codeAsString){
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var ForWriting = 2;
            var buildFile = fso.OpenTextFile(filePath, ForWriting, true);
            buildFile.write(codeAsString);
            buildFile.close();
        }

    /*---+++---EXCLUDED PART end EXCLUDED PART---+++---*/
}

