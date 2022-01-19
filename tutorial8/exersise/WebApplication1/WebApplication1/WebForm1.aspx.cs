using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        const string FILE_NAME = "C:/Users/Paekva/Documents/Projects/dsd_ws/tutorial8/exersise/WebApplication1/names.txt";

        protected void Page_Load(object sender, EventArgs e)
        {
            var namesData = ReadFromFile(FILE_NAME);
            NameList.Items.Clear();

            foreach (var name in namesData)
            {
                NameList.Items.Add(new ListItem(name));
            }
        }

        protected void HandleNewName(object sender, EventArgs e)
        {
            WriteToFile(Name.Text);
            LastName.Text = Name.Text;
        }

        protected void WriteToFile(string name)
        {
            try
            {
                if (!File.Exists(FILE_NAME))
                {
                    using (StreamWriter sw = File.CreateText(FILE_NAME))
                    {
                        sw.Write("");
                    }
                }

                using (StreamWriter sw = File.AppendText(FILE_NAME))
                {
                    sw.WriteLine(name);
                }
            } catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        protected string[] ReadFromFile(String path)
        {
            try
            {
                if (!File.Exists(path))
                {
                    return null;
                }

                return File.ReadAllLines(path);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return null;
        }
    }
}