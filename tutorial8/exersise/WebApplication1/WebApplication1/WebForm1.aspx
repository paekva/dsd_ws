<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication1.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server" >
        <asp:TextBox ID="Name" runat="server" />
        <asp:Button runat="server" onclick="HandleNewName" Text="Send data" />
        <hr />
        <asp:Label runat="server" id="LastName" />
        <hr />
        <asp:BulletedList  runat="server" id="NameList" ></asp:BulletedList>
    </form>
</body>
</html>
