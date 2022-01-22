using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SearchApplication.Models
{
    public class Names
    {
        public List<string> NameList { get; set; }
        public List<string> SearchedNameList { get; set; }
        public string SearchValue { get; set; }

        public Names(string filePath) {
            try
            {
                if (!File.Exists(filePath)) {
                    NameList = new List<string>();
                    return;
                }

                string[] readText = File.ReadAllLines(filePath);
                foreach (string s in readText)
                {
                    NameList.Add(s);
                }
            } catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void PerformSearch(string search)
        {
            SearchedNameList = NameList.Where(name => name.Contains(search)).ToList();
            SearchValue = search;
        }
    }
}