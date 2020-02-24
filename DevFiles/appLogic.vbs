'*---+++---VBSCRIPT---+++---*
'on load
sub resizeAppWindow(height, width, xPoint, yPoint)
    window.resizeTo width, height
    window.moveTo xPoint, yPoint
end sub

'on browser start
sub resizeWebBrowser(WebBrowser, height, width, xPoint, yPoint)
    WebBrowser.Visible = 1
    WebBrowser.width = width
    WebBrowser.height = height
    WebBrowser.left = xPoint
    WebBrowser.top = yPoint
end sub

'when the submit button is clicked
sub fillInOnlineForm()
    Dim WebBrowser: Set WebBrowser = CreateObject("InternetExplorer.Application")
    call resizeWebBrowser(WebBrowser, getMonitorHeight()-35, getMonitorWidth()-350, 350, 0)
    call goToForm(WebBrowser)
    Do While WebBrowser.Busy
        'wait                                        
    loop
    call fillInForm(WebBrowser)
    Do While WebBrowser.Busy
        'wait
    loop
end sub

sub goToForm(WebBrowser)
    WebBrowser.navigate "https://www.w3schools.com/html/html_forms.asp"
end sub

Sub fillInForm(WebBrowser)
    Dim firstName: firstName = document.getelementbyid("first_name").value
    dim lastName: lastName = document.getelementbyid("last_name").value
    WebBrowser.Document.getelementbyid("fname").value = firstName
    WebBrowser.Document.getelementbyid("lname").value = lastName
    dim inputElements: set inputElements = WebBrowser.Document.getelementsByTagName("input")
    for each elem in inputElements
        if elem.value = "Submit" then
            elem.click
            exit for
        end if
    next
End Sub